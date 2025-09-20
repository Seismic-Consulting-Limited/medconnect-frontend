// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that never require auth
const PUBLIC_ROUTES = new Set<string>([
  "/",
  "/hospitals",
  "/travel-agents",
  "/user/auth/login",
  "/user/auth/signup",
  "/user/auth/verify",
  "/user/auth/reset",
]);

// Helper: treat patient as client, travel-agent as travel_agent
const aliasRole = (r?: string | null) => {
  const s = (r ?? "").toLowerCase();
  if (s === "patient") return "client";
  if (s === "travel-agent") return "travel_agent";
  return s;
};

const getDashboardPath = (role?: string | null) => {
  const r = aliasRole(role);
  if (r === "hospital") return "/dashboard/hospital";
  if (r === "travel_agent") return "/dashboard/travel-agent";
  return "/dashboard/client"; // default client area
};

const preservePathAndQuery = (req: NextRequest) => {
  const p = req.nextUrl.pathname;
  const q = req.nextUrl.search || "";
  return `${p}${q}`;
};

// Robust JSON decode:
// 1) Try simple atob JSON (ASCII-safe)
// 2) Fallback to base64url + UTF-8 decode for unicode payloads
const decodePayload = (seg: string): any | null => {
  try {
    return JSON.parse(atob(seg));
  } catch {
    try {
      const b64 = seg.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (seg.length % 4)) % 4);
      // UTF-8 decode
      const binStr = atob(b64);
      const bytes = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
      const jsonStr = new TextDecoder("utf-8").decode(bytes);
      return JSON.parse(jsonStr);
    } catch {
      return null;
    }
  }
};

// base64url -> JSON payload
const b64urlJSON = (token?: string): any | null => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  return decodePayload(parts[1]);
};

const expToSeconds = (expRaw: unknown): number | undefined => {
  if (typeof expRaw !== "number") return undefined;
  return expRaw > 1e12 ? Math.floor(expRaw / 1000) : expRaw; // ms -> s if needed
};

const isExpired = (payload: any): boolean => {
  const expS = expToSeconds(payload?.exp);
  if (typeof expS !== "number") return false; // if no exp, don't auto-reject
  const now = Math.floor(Date.now() / 1000);
  const leeway = 30; // seconds of clock skew tolerance
  return expS + leeway < now;
};

// Treat payload as valid if it has any plausible id field
const hasUserId = (p: any) => Boolean(p?.user_id || p?.sub || p?.id || p?.uid);

const isProtected = (pathname: string) => pathname.startsWith("/dashboard");

// NOTE: include everything except API, Next internals, and favicon
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes (and anything under them)
  for (const base of PUBLIC_ROUTES) {
    if (pathname === base || pathname.startsWith(`${base}/`)) {
      return NextResponse.next();
    }
  }

  // Non-dashboard routes proceed
  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  // Read token from cookie or Authorization header
  const cookieToken = request.cookies.get("medconnect_token")?.value;
  const headerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const token = cookieToken || headerToken;

  if (!token) {
    // No token -> bounce to login with redirect back (preserve query too)
    const loginUrl = new URL("/user/auth/login", request.url);
    loginUrl.searchParams.set("redirect", preservePathAndQuery(request));
    return NextResponse.redirect(loginUrl);
  }

  const payload = b64urlJSON(token);
  if (!payload || isExpired(payload) || !hasUserId(payload)) {
    // Invalid/expired -> bounce to login
    const loginUrl = new URL("/user/auth/login", request.url);
    loginUrl.searchParams.set("redirect", preservePathAndQuery(request));
    return NextResponse.redirect(loginUrl);
  }

  const role =
    payload.role ||
    payload.user_type ||
    payload.type ||
    payload.account_type ||
    payload.user?.role ||
    payload.user?.user_type ||
    null;

  // If token has no role, don't force a redirect (prevents loops with role-less tokens)
  if (!role) {
    return NextResponse.next();
  }

  const normalized = aliasRole(role);
  const correctDashboard = getDashboardPath(normalized);

  // If user opens the wrong dashboard for their role, nudge them to the right one
  if (!pathname.startsWith(correctDashboard)) {
    return NextResponse.redirect(new URL(correctDashboard, request.url));
  }

  // All good
  return NextResponse.next();
}
