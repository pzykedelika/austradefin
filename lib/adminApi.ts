import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAuthToken } from "./auth";

/** Returns an error response unless the request carries a valid admin session. */
export async function requireAdmin(): Promise<NextResponse | null> {
  const token = cookies().get("auth_token")?.value;
  const session = token ? await verifyAuthToken(token) : null;
  if (!session || session.type !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function adminSecret(): string {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) throw new Error("ADMIN_API_SECRET is not set.");
  return secret;
}

export const MIN_PASSWORD_LENGTH = 8;
