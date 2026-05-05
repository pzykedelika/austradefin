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
