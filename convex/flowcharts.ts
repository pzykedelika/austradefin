import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("flowcharts"),
      title: v.string(),
      description: v.optional(v.string()),
      fileUrl: v.union(v.string(), v.null()),
      fileType: v.string(),
      uploadedByName: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    const flowcharts = await ctx.db
      .query("flowcharts")
      .order("desc")
      .take(100);

    const results = await Promise.all(
      flowcharts.map(async (fc) => ({
        _id: fc._id,
        title: fc.title,
        description: fc.description,
        fileUrl: await ctx.storage.getUrl(fc.storageId),
        fileType: fc.fileType,
        uploadedByName: fc.uploadedByName,
        createdAt: fc.createdAt,
      }))
    );
    return results;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    storageId: v.id("_storage"),
    fileType: v.string(),
    uploadedById: v.id("adminAccounts"),
    uploadedByName: v.string(),
  },
  returns: v.id("flowcharts"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("flowcharts", {
      title: args.title,
      description: args.description,
      storageId: args.storageId,
      fileType: args.fileType,
      uploadedById: args.uploadedById,
      uploadedByName: args.uploadedByName,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("flowcharts") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    const flowchart = await ctx.db.get(id);
    if (flowchart) {
      await ctx.storage.delete(flowchart.storageId);
      await ctx.db.delete(id);
    }
    return null;
  },
});
