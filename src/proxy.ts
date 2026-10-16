import { NextResponse, type NextRequest } from "next/server";

// Early redirect only: it checks that a session cookie exists, not that it is
// valid. Real verification happens in `requireOwner` / `assertOwner`.
const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"];

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/admin/forgot-password"]);

function isMalformedPath(pathname: string) {
  try {
    decodeURIComponent(pathname);
    return false;
  } catch {
    return true;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A broken percent-escape in a dynamic segment makes Next answer 500, so show the 404 page instead.
  if (isMalformedPath(pathname)) {
    return NextResponse.rewrite(new URL("/page-not-found", request.url), { status: 404 });
  }

  if (!pathname.startsWith("/admin") || PUBLIC_ADMIN_PATHS.has(pathname)) return NextResponse.next();

  if (!SESSION_COOKIES.some((name) => request.cookies.has(name))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/products/:path*"] };
