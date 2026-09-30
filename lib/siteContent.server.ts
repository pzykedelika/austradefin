import "server-only";
import { unstable_cache } from "next/cache";
import { api } from "../convex/_generated/api";
import { convex } from "./convexServer";
import { resolveText } from "./siteContentFields";

export const SITE_CONTENT_TAG = "site-content";

const fetchOverrides = unstable_cache(
  async (): Promise<Record<string, string>> => {
    const rows = await convex.query(api.siteContent.getAll, {});
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  },
  ["site-content"],
  { tags: [SITE_CONTENT_TAG], revalidate: 3600 }
);

// Saved edits keyed by field. If Convex is unreachable the site still renders
// with the built-in wording (a failed fetch is not cached).
export async function getSiteContent(): Promise<Record<string, string>> {
  try {
    return await fetchOverrides();
  } catch (error) {
    console.error("Failed to load site content, using defaults", error);
    return {};
  }
}

export async function getText(): Promise<(key: string) => string> {
  const overrides = await getSiteContent();
  return (key) => resolveText(overrides, key);
}
