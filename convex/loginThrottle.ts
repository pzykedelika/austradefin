import type { MutationCtx } from "./_generated/server";

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

export async function isLockedOut(ctx: MutationCtx, key: string): Promise<boolean> {
  const row = await ctx.db
    .query("loginAttempts")
    .withIndex("by_key", (q) => q.eq("key", key))
    .unique();
  if (!row) return false;
  return Date.now() - row.windowStart < WINDOW_MS && row.count >= MAX_FAILURES;
}

export async function recordFailure(ctx: MutationCtx, key: string): Promise<void> {
  const now = Date.now();
  const row = await ctx.db
    .query("loginAttempts")
    .withIndex("by_key", (q) => q.eq("key", key))
    .unique();
  if (!row) {
    await ctx.db.insert("loginAttempts", { key, count: 1, windowStart: now });
  } else if (now - row.windowStart >= WINDOW_MS) {
    await ctx.db.patch(row._id, { count: 1, windowStart: now });
  } else {
    await ctx.db.patch(row._id, { count: row.count + 1 });
  }
}

export async function clearFailures(ctx: MutationCtx, key: string): Promise<void> {
  const row = await ctx.db
    .query("loginAttempts")
    .withIndex("by_key", (q) => q.eq("key", key))
    .unique();
  if (row) await ctx.db.delete(row._id);
}

export const LOCKED_OUT_ERROR = "Too many failed attempts. Try again in 15 minutes.";
