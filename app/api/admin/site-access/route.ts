import { NextResponse } from "next/server";
import { convex } from "../../../../lib/convexServer";
import { api } from "../../../../convex/_generated/api";
import { adminSecret, requireAdmin } from "../../../../lib/adminApi";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const enabled = await convex.query(api.access.getGate, { adminSecret: adminSecret() });
  return NextResponse.json({ enabled });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  if (typeof body?.enabled !== "boolean") {
    return NextResponse.json({ error: "enabled must be a boolean." }, { status: 400 });
  }
  await convex.mutation(api.access.setGate, { adminSecret: adminSecret(), enabled: body.enabled });
  return NextResponse.json({ enabled: body.enabled });
}
