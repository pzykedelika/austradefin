import { NextResponse } from "next/server";
import { convex } from "../../../../lib/convexServer";
import { api } from "../../../../convex/_generated/api";
import { adminSecret, requireAdmin, MIN_PASSWORD_LENGTH } from "../../../../lib/adminApi";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const users = await convex.query(api.users.listClients, { adminSecret: adminSecret() });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const company = typeof body?.company === "string" ? body.company.trim() : "";

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const result = await convex.mutation(api.auth.createClientAccount, {
    adminSecret: adminSecret(),
    name,
    email,
    password,
    company: company || undefined,
  });
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }
  return NextResponse.json({ success: true });
}
