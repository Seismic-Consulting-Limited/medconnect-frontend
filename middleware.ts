import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./utils/decodetoken";
import { getDashboardPath } from "./utils/authhelpers";

const PUBLIC_ROUTES = new Set([
  "/",
  "/hospitals",
  "/travel-agents",
  "/user/auth/login",
  "/user/auth/signup",
  "/user/auth/verify",
  "/user/auth/reset",
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.has(pathname)) {
    // logged-in users shouldn't access auth pages
    if (token && pathname.startsWith("/user/auth")) {
      try {
        const decoded = decodeToken(token);
        const role = decoded?.role || decoded?.user_type || "patient";
        return NextResponse.redirect(
          new URL(getDashboardPath(role), req.url)
        );
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  const isDashboard = pathname.startsWith("/dashboard");
  if (isDashboard) {
    if (!token) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/user/auth/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = decodeToken(token);
      if (decoded?.exp! && decoded?.exp! * 1000 < Date.now()) {
        const url = req.nextUrl.clone();
        url.pathname = "/user/auth/login";
        url.searchParams.set("expired", "true");
        return NextResponse.redirect(url);
      }

      const role = decoded?.role || decoded?.user_type || "patient";
      const dashboardPath = getDashboardPath(role);

      // protect cross-role access
      if (!pathname.startsWith(dashboardPath)) {
        return NextResponse.redirect(new URL(dashboardPath, req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("🔴 Middleware decode error:", err);
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/user/auth/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
