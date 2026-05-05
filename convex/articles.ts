import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { publishedOnly: v.boolean() },
  returns: v.array(
    v.object({
      _id: v.id("articles"),
      title: v.string(),
      body: v.string(),
      authorName: v.string(),
      published: v.boolean(),
      publishedAt: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
  ),
  handler: async (ctx, { publishedOnly }) => {
    if (publishedOnly) {
      const articles = await ctx.db
        .query("articles")
        .withIndex("by_published_and_publishedAt", (q) => q.eq("published", true))
        .order("desc")
        .take(100);
      return articles.map((a) => ({
        _id: a._id,
        title: a.title,
        body: a.body,
        authorName: a.authorName,
        published: a.published,
        publishedAt: a.publishedAt,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      }));
    }
    const articles = await ctx.db
      .query("articles")
      .order("desc")
      .take(100);
    return articles.map((a) => ({
      _id: a._id,
      title: a.title,
      body: a.body,
      authorName: a.authorName,
      published: a.published,
      publishedAt: a.publishedAt,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));
  },
});

export const get = query({
  args: { id: v.id("articles") },
  returns: v.union(
    v.object({
      _id: v.id("articles"),
      title: v.string(),
      body: v.string(),
      authorName: v.string(),
      published: v.boolean(),
      publishedAt: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }),
    v.null()
  ),
  handler: async (ctx, { id }) => {
    const article = await ctx.db.get(id);
    if (!article) return null;
    return {
      _id: article._id,
      title: article.title,
      body: article.body,
      authorName: article.authorName,
      published: article.published,
      publishedAt: article.publishedAt,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    authorId: v.id("adminAccounts"),
    authorName: v.string(),
    published: v.boolean(),
  },
  returns: v.id("articles"),
  handler: async (ctx, { title, body, authorId, authorName, published }) => {
    const now = Date.now();
    return await ctx.db.insert("articles", {
      title,
      body,
      authorId,
      authorName,
      published,
      publishedAt: published ? now : undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("articles"),
    title: v.string(),
    body: v.string(),
    published: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, { id, title, body, published }) => {
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Article not found");

    const now = Date.now();
    await ctx.db.patch(id, {
      title,
      body,
      published,
      publishedAt: published && !existing.publishedAt ? now : existing.publishedAt,
      updatedAt: now,
    });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("articles") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return null;
  },
});
