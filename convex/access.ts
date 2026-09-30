import { query, mutation } from "./_generated/server";
import type { QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSecret } from "./adminGuard";

async function readGate(ctx: QueryCtx): Promise<boolean> {
  const row = await ctx.db.query("siteSettings").first();
  return row?.gateEnabled ?? false;
}

// Used by the Next.js middleware on every page request: is the gate on, and
// does the signed-in account (if any) still exist and remain active?
export const check = query({
  args: {
    accountType: v.optional(v.union(v.literal("client"), v.literal("admin"))),
    accountId: v.optional(v.string()),
  },
  returns: v.object({ gateEnabled: v.boolean(), allowed: v.boolean() }),
  handler: async (ctx, { accountType, accountId }) => {
    const gateEnabled = await readGate(ctx);
    if (!gateEnabled) return { gateEnabled, allowed: true };
    if (!accountType || !accountId) return { gateEnabled, allowed: false };

    if (accountType === "client") {
      const id = ctx.db.normalizeId("clientAccounts", accountId);
      const account = id ? await ctx.db.get(id) : null;
      return { gateEnabled, allowed: !!account?.active };
    }
    const id = ctx.db.normalizeId("adminAccounts", accountId);
    const account = id ? await ctx.db.get(id) : null;
    return { gateEnabled, allowed: !!account?.active };
  },
});

export const getGate = query({
  args: { adminSecret: v.string() },
  returns: v.boolean(),
  handler: async (ctx, { adminSecret }) => {
    assertAdminSecret(adminSecret);
    return await readGate(ctx);
  },
});

export const setGate = mutation({
  args: { adminSecret: v.string(), enabled: v.boolean() },
  returns: v.null(),
  handler: async (ctx, { adminSecret, enabled }) => {
    assertAdminSecret(adminSecret);
    const row = await ctx.db.query("siteSettings").first();
    if (row) {
      await ctx.db.patch(row._id, { gateEnabled: enabled, updatedAt: Date.now() });
    } else {
      await ctx.db.insert("siteSettings", { gateEnabled: enabled, updatedAt: Date.now() });
    }
    return null;
  },
});
