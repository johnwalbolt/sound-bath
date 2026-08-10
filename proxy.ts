import { NextResponse, type NextRequest } from "next/server";

// Lightweight shared-password gate (Next 16 "proxy" convention, formerly
// "middleware"). If SITE_PASSWORD is set, visitors without a matching `sb_gate`
// cookie are redirected to /gate. Correct password (checked server-side in
// /api/gate) sets the cookie. Soft protection for a WIP — not for anything
// sensitive. Locally SITE_PASSWORD is unset, so the gate is disabled.
export function proxy(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next(); // gate disabled if unset

  const { pathname } = req.nextUrl;
  if (pathname === "/gate" || pathname.startsWith("/api/gate")) {
    return NextResponse.next();
  }

  if (req.cookies.get("sb_gate")?.value === password) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/gate";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals and static files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)",
  ],
};
