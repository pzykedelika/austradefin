import { NextResponse, type NextRequest } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api";
import { verifyAuthToken } from "./lib/auth";

// Paths that stay reachable while the site gate is on
const OPEN_PREFIXES = ["/admin", "/client", "/unlock", "/api"];

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (OPEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;
  const session = token ? await verifyAuthToken(token) : null;

  let allowed = false;
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const result = await convex.query(api.access.check, {
      accountType: session?.type,
      accountId: session?.id,
    });
    allowed = result.allowed;
  } catch {
    // If the gate state can't be determined, fail closed
    allowed = false;
  }

  if (allowed) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = pathname === "/" ? "" : `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/|favicon\\.ico|.*\\.(?:png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|txt|xml|pdf)$).*)"],
};
