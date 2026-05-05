import { NextResponse } from "next/server";
import { convex } from "../../../../lib/convexServer";
import { api } from "../../../../convex/_generated/api";
import { signAuthToken, type AuthSession, type AuthRole } from "../../../../lib/auth";

const COOKIE_NAME = "auth_token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export async function POST(req: Request) {
  let payload: { email?: string; password?: string; role?: AuthRole } | null = null;
  try {
    payload = await req.json();
  } catch {
    payload = null;
  }

  if (!payload?.email || !payload.password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const { email, password, role } = payload;

  if (role === "admin") {
    const result = await convex.mutation(api.auth.loginAdmin, { email, password });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Invalid email or password." },
        { status: 401 }
      );
    }

    const session: AuthSession = {
      type: "admin",
      id: result.adminId,
      name: result.name,
      email: result.email,
    };

    const token = await signAuthToken(session);
    const response = NextResponse.json(session);
    response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
    return response;
  }

  // Default: client login
  const result = await convex.mutation(api.auth.loginClient, { email, password });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Invalid email or password." },
      { status: 401 }
    );
  }

  const session: AuthSession = {
    type: "client",
    id: result.clientId,
    name: result.name,
    email: result.email,
  };

  const token = await signAuthToken(session);
  const response = NextResponse.json(session);
  response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
  return response;
}
