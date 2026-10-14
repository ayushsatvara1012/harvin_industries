import { NextResponse, type NextRequest } from "next/server";

// Early redirect only: it checks that a session cookie exists, not that it is
// valid. Real verification happens in `requireOwner` / `assertOwner`.
const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  if (!SESSION_COOKIES.some((name) => request.cookies.has(name))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
