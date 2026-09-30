import { ConvexError } from "convex/values";

/**
 * Account-management functions are only meant to be called from our Next.js
 * API routes, which verify the admin session cookie first and then pass this
 * shared secret. Set ADMIN_API_SECRET in the Convex deployment env and in
 * .env.local. If it is unset, every guarded call is rejected.
 */
export function assertAdminSecret(provided: string): void {
  const expected = process.env.ADMIN_API_SECRET;
  if (!expected || provided.length !== expected.length) {
    throw new ConvexError("Unauthorized");
  }
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  if (diff !== 0) throw new ConvexError("Unauthorized");
}
