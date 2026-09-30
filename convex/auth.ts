import { mutation } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { assertAdminSecret } from "./adminGuard";
import {
  LOCKED_OUT_ERROR,
  clearFailures,
  isLockedOut,
  recordFailure,
} from "./loginThrottle";

const BCRYPT_ROUNDS = 12;

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, BCRYPT_ROUNDS);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Client login
export const loginClient = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  returns: v.union(
    v.object({
      success: v.literal(true),
      clientId: v.id("clientAccounts"),
      name: v.string(),
      email: v.string(),
    }),
    v.object({
      success: v.literal(false),
      error: v.string(),
    })
  ),
  handler: async (ctx, { email, password }) => {
    const throttleKey = `client:${normalizeEmail(email)}`;
    if (await isLockedOut(ctx, throttleKey)) {
      return { success: false as const, error: LOCKED_OUT_ERROR };
    }

    const client = await ctx.db
      .query("clientAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizeEmail(email)))
      .unique();

    if (!client) {
      await recordFailure(ctx, throttleKey);
      return { success: false as const, error: "Invalid email or password" };
    }

    const valid = bcrypt.compareSync(password, client.passwordHash);
    if (!valid) {
      await recordFailure(ctx, throttleKey);
      return { success: false as const, error: "Invalid email or password" };
    }

    if (!client.active) {
      return { success: false as const, error: "Account is inactive" };
    }

    await clearFailures(ctx, throttleKey);

    return {
      success: true as const,
      clientId: client._id,
      name: client.name,
      email: client.email,
    };
  },
});

// Admin login
export const loginAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  returns: v.union(
    v.object({
      success: v.literal(true),
      adminId: v.id("adminAccounts"),
      name: v.string(),
      email: v.string(),
    }),
    v.object({
      success: v.literal(false),
      error: v.string(),
    })
  ),
  handler: async (ctx, { email, password }) => {
    const throttleKey = `admin:${normalizeEmail(email)}`;
    if (await isLockedOut(ctx, throttleKey)) {
      return { success: false as const, error: LOCKED_OUT_ERROR };
    }

    const admin = await ctx.db
      .query("adminAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizeEmail(email)))
      .unique();

    if (!admin) {
      await recordFailure(ctx, throttleKey);
      return { success: false as const, error: "Invalid email or password" };
    }

    const valid = bcrypt.compareSync(password, admin.passwordHash);
    if (!valid) {
      await recordFailure(ctx, throttleKey);
      return { success: false as const, error: "Invalid email or password" };
    }

    if (!admin.active) {
      return { success: false as const, error: "Account is inactive" };
    }

    await clearFailures(ctx, throttleKey);

    return {
      success: true as const,
      adminId: admin._id,
      name: admin.name,
      email: admin.email,
    };
  },
});

// Create admin account (run once to seed)
export const createAdminAccount = mutation({
  args: {
    adminSecret: v.string(),
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  returns: v.union(
    v.object({ success: v.literal(true), adminId: v.id("adminAccounts") }),
    v.object({ success: v.literal(false), error: v.string() })
  ),
  handler: async (ctx, { adminSecret, email, password, name }) => {
    assertAdminSecret(adminSecret);
    const normalizedEmail = normalizeEmail(email);

    const existing = await ctx.db
      .query("adminAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .unique();

    if (existing) {
      return { success: false as const, error: "Email already exists" };
    }

    const passwordHash = hashPassword(password);

    const adminId = await ctx.db.insert("adminAccounts", {
      email: normalizedEmail,
      passwordHash,
      name,
      active: true,
      createdAt: Date.now(),
    });

    return { success: true as const, adminId };
  },
});

// Reset admin password by email
export const resetAdminPassword = mutation({
  args: {
    adminSecret: v.string(),
    email: v.string(),
    newPassword: v.string(),
  },
  returns: v.union(
    v.object({ success: v.literal(true) }),
    v.object({ success: v.literal(false), error: v.string() })
  ),
  handler: async (ctx, { adminSecret, email, newPassword }) => {
    assertAdminSecret(adminSecret);
    const admin = await ctx.db
      .query("adminAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizeEmail(email)))
      .unique();

    if (!admin) {
      return { success: false as const, error: "Admin not found" };
    }

    await ctx.db.patch(admin._id, { passwordHash: hashPassword(newPassword) });
    return { success: true as const };
  },
});

// Admin creates a client account
export const createClientAccount = mutation({
  args: {
    adminSecret: v.string(),
    name: v.string(),
    email: v.string(),
    password: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
  },
  returns: v.union(
    v.object({ success: v.literal(true), clientId: v.id("clientAccounts") }),
    v.object({ success: v.literal(false), error: v.string() })
  ),
  handler: async (ctx, { adminSecret, name, email, password, phone, company }) => {
    assertAdminSecret(adminSecret);
    const normalizedEmail = normalizeEmail(email);

    const existing = await ctx.db
      .query("clientAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .unique();

    if (existing) {
      return { success: false as const, error: "Email already exists" };
    }

    const passwordHash = hashPassword(password);

    const clientId = await ctx.db.insert("clientAccounts", {
      email: normalizedEmail,
      passwordHash,
      name,
      phone,
      company,
      active: true,
      createdAt: Date.now(),
    });

    return { success: true as const, clientId };
  },
});
