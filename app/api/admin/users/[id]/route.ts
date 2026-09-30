import { NextResponse } from "next/server";
import { convex } from "../../../../../lib/convexServer";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { adminSecret, requireAdmin, MIN_PASSWORD_LENGTH } from "../../../../../lib/adminApi";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  const clientId = params.id as Id<"clientAccounts">;

  try {
    if (typeof body?.password === "string") {
      if (body.password.length < MIN_PASSWORD_LENGTH) {
        return NextResponse.json(
          { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
          { status: 400 }
        );
      }
      await convex.mutation(api.users.setClientPassword, {
        adminSecret: adminSecret(),
        clientId,
        newPassword: body.password,
      });
    }
    if (typeof body?.active === "boolean") {
      await convex.mutation(api.users.setClientActive, {
        adminSecret: adminSecret(),
        clientId,
        active: body.active,
      });
    }
  } catch {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
