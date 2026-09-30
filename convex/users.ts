import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { assertAdminSecret } from "./adminGuard";

const BCRYPT_ROUNDS = 12;

export const listClients = query({
  args: { adminSecret: v.string() },
  returns: v.array(
    v.object({
      _id: v.id("clientAccounts"),
      name: v.string(),
      email: v.string(),
      company: v.optional(v.string()),
      active: v.boolean(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx, { adminSecret }) => {
    assertAdminSecret(adminSecret);
    const clients = await ctx.db.query("clientAccounts").order("desc").take(500);
    return clients.map((c) => ({
      _id: c._id,
      name: c.name,
      email: c.email,
      company: c.company,
      active: c.active,
      createdAt: c.createdAt,
    }));
  },
});

export const setClientPassword = mutation({
  args: {
    adminSecret: v.string(),
    clientId: v.id("clientAccounts"),
    newPassword: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, { adminSecret, clientId, newPassword }) => {
    assertAdminSecret(adminSecret);
    await ctx.db.patch(clientId, {
      passwordHash: bcrypt.hashSync(newPassword, BCRYPT_ROUNDS),
    });
    // Let the user try again immediately with the new password
    const email = (await ctx.db.get(clientId))?.email;
    if (email) {
      const attempt = await ctx.db
        .query("loginAttempts")
        .withIndex("by_key", (q) => q.eq("key", `client:${email}`))
        .unique();
      if (attempt) await ctx.db.delete(attempt._id);
    }
    return null;
  },
});

export const setClientActive = mutation({
  args: {
    adminSecret: v.string(),
    clientId: v.id("clientAccounts"),
    active: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, { adminSecret, clientId, active }) => {
    assertAdminSecret(adminSecret);
    await ctx.db.patch(clientId, { active });
    return null;
  },
});
