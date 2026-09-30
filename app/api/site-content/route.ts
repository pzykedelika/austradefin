import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { verifyAuthToken } from "../../../lib/auth";
import { convex } from "../../../lib/convexServer";
import { api } from "../../../convex/_generated/api";
import { SITE_CONTENT_TAG } from "../../../lib/siteContent.server";
import {
  contentDefaults,
  contentKeys,
  MAX_CONTENT_LENGTH,
} from "../../../lib/siteContentFields";

const COOKIE_NAME = "auth_token";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = token ? await verifyAuthToken(token) : null;
  if (!session || session.type !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.SITE_CONTENT_SECRET;
  if (!secret) {
    console.error("SITE_CONTENT_SECRET is not set.");
    return NextResponse.json({ error: "Server is not configured for editing." }, { status: 500 });
  }

  let body: { values?: Record<string, unknown> } | null = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  if (!body?.values || typeof body.values !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const entries: { key: string; value: string | null }[] = [];
  for (const [key, raw] of Object.entries(body.values)) {
    if (!contentKeys.has(key) || typeof raw !== "string") {
      return NextResponse.json({ error: `Invalid field: ${key}` }, { status: 400 });
    }
    if (raw.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }
    // Matching the built-in wording (or blank) clears the override.
    const value = raw.trim() === "" || raw === contentDefaults[key] ? null : raw;
    entries.push({ key, value });
  }

  try {
    await convex.mutation(api.siteContent.setMany, { secret, entries });
  } catch (error) {
    console.error("Failed to save site content", error);
    return NextResponse.json({ error: "Could not save changes." }, { status: 500 });
  }

  revalidateTag(SITE_CONTENT_TAG);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
