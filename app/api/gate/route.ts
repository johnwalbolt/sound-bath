import { NextResponse } from "next/server";

// Verifies the shared password server-side and, on success, sets the `sb_gate`
// cookie the middleware checks. The password itself never reaches the client.
export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const nextRaw = String(form.get("next") ?? "/");
  // Only allow same-site relative paths as the redirect target.
  const next = nextRaw.startsWith("/") ? nextRaw : "/";

  if (password && password === process.env.SITE_PASSWORD) {
    const res = NextResponse.redirect(new URL(next, req.url), 303);
    res.cookies.set("sb_gate", password, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  const url = new URL("/gate", req.url);
  url.searchParams.set("error", "1");
  url.searchParams.set("next", next);
  return NextResponse.redirect(url, 303);
}
