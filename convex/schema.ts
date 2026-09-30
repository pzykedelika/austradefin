import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clientAccounts: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    active: v.boolean(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  adminAccounts: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    active: v.boolean(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // Single-row settings for the site-wide access gate
  siteSettings: defineTable({
    gateEnabled: v.boolean(),
    updatedAt: v.number(),
  }),

  // Failed-login tracking, keyed by "<role>:<email>"
  loginAttempts: defineTable({
    key: v.string(),
    count: v.number(),
    windowStart: v.number(),
  }).index("by_key", ["key"]),

  articles: defineTable({
    title: v.string(),
    body: v.string(), // HTML from rich text editor
    authorId: v.id("adminAccounts"),
    authorName: v.string(),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_published", ["published"])
    .index("by_published_and_publishedAt", ["published", "publishedAt"]),

  // Editable website wording, keyed by lib/siteContentFields.ts. Written only
  // through the admin-checked /api/site-content route.
  siteContent: defineTable({
    key: v.string(),
    value: v.string(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  flowcharts: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    storageId: v.id("_storage"),
    fileType: v.string(), // "image" | "pdf"
    uploadedById: v.id("adminAccounts"),
    uploadedByName: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
