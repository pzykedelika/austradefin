import { mutation } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

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
    const client = await ctx.db
      .query("clientAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizeEmail(email)))
      .unique();

    if (!client) {
      return { success: false as const, error: "Invalid email or password" };
    }

    if (!client.active) {
      return { success: false as const, error: "Account is inactive" };
    }

    const valid = bcrypt.compareSync(password, client.passwordHash);
    if (!valid) {
      return { success: false as const, error: "Invalid email or password" };
    }

    return {
      success: true as const,
      clientId: client._id,
      name: client.name,
      email: client.email,
    };
  },
});

// Client self-registration
export const signupClient = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
  },
  returns: v.union(
    v.object({
      success: v.literal(true),
      clientId: v.id("clientAccounts"),
    }),
    v.object({
      success: v.literal(false),
      error: v.string(),
    })
  ),
  handler: async (ctx, { name, email, password, phone, company }) => {
    const normalizedEmail = normalizeEmail(email);

    const existing = await ctx.db
      .query("clientAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .unique();

    if (existing) {
      return { success: false as const, error: "An account with this email already exists" };
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
    const admin = await ctx.db
      .query("adminAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizeEmail(email)))
      .unique();

    if (!admin) {
      return { success: false as const, error: "Invalid email or password" };
    }

    if (!admin.active) {
      return { success: false as const, error: "Account is inactive" };
    }

    const valid = bcrypt.compareSync(password, admin.passwordHash);
    if (!valid) {
      return { success: false as const, error: "Invalid email or password" };
    }

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
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  returns: v.union(
    v.object({ success: v.literal(true), adminId: v.id("adminAccounts") }),
    v.object({ success: v.literal(false), error: v.string() })
  ),
  handler: async (ctx, { email, password, name }) => {
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
    email: v.string(),
    newPassword: v.string(),
  },
  returns: v.union(
    v.object({ success: v.literal(true) }),
    v.object({ success: v.literal(false), error: v.string() })
  ),
  handler: async (ctx, { email, newPassword }) => {
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
  handler: async (ctx, { name, email, password, phone, company }) => {
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
