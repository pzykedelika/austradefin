import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function secretsMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export const getAll = query({
  args: {},
  returns: v.array(v.object({ key: v.string(), value: v.string() })),
  handler: async (ctx) => {
    const rows = await ctx.db.query("siteContent").take(500);
    return rows.map((r) => ({ key: r.key, value: r.value }));
  },
});

// Callable by anyone who knows the Convex URL, so it is gated by a shared
// secret that only the Next.js server (after checking the admin login) holds.
// A null value removes the override so the site falls back to its default.
export const setMany = mutation({
  args: {
    secret: v.string(),
    entries: v.array(v.object({ key: v.string(), value: v.union(v.string(), v.null()) })),
  },
  returns: v.null(),
  handler: async (ctx, { secret, entries }) => {
    const expected = process.env.SITE_CONTENT_SECRET;
    if (!expected || !secretsMatch(secret, expected)) {
      throw new Error("Not authorized");
    }
    if (entries.length > 200) {
      throw new Error("Too many entries");
    }

    for (const { key, value } of entries) {
      const existing = await ctx.db
        .query("siteContent")
        .withIndex("by_key", (q) => q.eq("key", key))
        .unique();

      if (value === null) {
        if (existing) await ctx.db.delete(existing._id);
      } else if (existing) {
        await ctx.db.patch(existing._id, { value, updatedAt: Date.now() });
      } else {
        await ctx.db.insert("siteContent", { key, value, updatedAt: Date.now() });
      }
    }
    return null;
  },
});
