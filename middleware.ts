import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  "/dashboard/client": ["client", "patient"],
  "/dashboard/hospital": ["hospital"],
  "/dashboard/travel-agent": ["travel_agent", "travel-agent"],
} as const

type UserRole = (typeof PROTECTED_ROUTES)[keyof typeof PROTECTED_ROUTES][number]

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/hospitals",
  "/travel-agents",
  "/user/auth/login",
  "/user/auth/signup",
  "/user/auth/verify",
  "/user/auth/reset",
]

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

function getDashboardPath(role?: string): string {
  switch ((role || "").toLowerCase()) {
    case "hospital":
      return "/dashboard/hospital"
    case "travel_agent":
    case "travel-agent":
      return "/dashboard/travel-agent"
    default:
      return "/dashboard/client"
  }
}

function getUserFromToken(token?: string): { role?: string } | null {
  if (!token) return null

  try {
    // Simple JWT decode (just for role extraction)
    const payload = JSON.parse(atob(token.split(".")[1]))

    const role =
      payload.role ||
      payload.user_type ||
      payload.type ||
      payload.account_type ||
      payload.user?.role ||
      payload.user?.user_type

    return { role }
  } catch (error) {
    return null
  }
}

function isValidToken(token?: string): boolean {
  if (!token) return false

  try {
    // Decode JWT payload
    const payload = JSON.parse(atob(token.split(".")[1]))

    // Check if token has expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      console.log("[v0] MIDDLEWARE: Token expired")
      return false
    }

    // Check if token has required fields
    if (!payload.user_id && !payload.sub && !payload.id) {
      console.log("[v0] MIDDLEWARE: Token missing user identifier")
      return false
    }

    return true
  } catch (error) {
    console.log("[v0] MIDDLEWARE: Token validation error:", error)
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log("[v0] MIDDLEWARE: Processing request for:", pathname)

  // Allow public routes
  if (isPublicRoute(pathname)) {
    console.log("[v0] MIDDLEWARE: Public route, allowing access:", pathname)
    return NextResponse.next()
  }

  // Get token from cookie or header
  const token =
    request.cookies.get("medconnect_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  console.log("[v0] MIDDLEWARE: Token found:", !!token)
  console.log("[v0] MIDDLEWARE: Token value:", token ? `${token.substring(0, 20)}...` : "none")

  const hasValidToken = isValidToken(token)
  console.log("[v0] MIDDLEWARE: Token is valid:", hasValidToken)

  // If no valid token and accessing protected route, redirect to login
  if (!hasValidToken && pathname.startsWith("/dashboard")) {
    console.log("[v0] MIDDLEWARE: No valid token for protected route, redirecting to login")
    const loginUrl = new URL("/user/auth/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    console.log("[v0] MIDDLEWARE: Redirect URL:", loginUrl.toString())
    return NextResponse.redirect(loginUrl)
  }

  // If valid token exists, check role-based access
  if (hasValidToken && pathname.startsWith("/dashboard")) {
    console.log("[v0] MIDDLEWARE: Checking role-based access for dashboard")
    const user = getUserFromToken(token)
    const userRole = user?.role?.toLowerCase()
    console.log("[v0] MIDDLEWARE: User role from token:", userRole)

    // If we can't determine the role from token, allow access to prevent access loops
    if (!userRole) {
      console.log("[v0] MIDDLEWARE: No role found, allowing access to prevent loops")
      return NextResponse.next()
    }

    const correctDashboard = getDashboardPath(userRole)
    console.log("[v0] MIDDLEWARE: Correct dashboard for role:", correctDashboard)
    console.log("[v0] MIDDLEWARE: Current pathname:", pathname)

    if (!pathname.startsWith(correctDashboard)) {
      console.log("[v0] MIDDLEWARE: Wrong dashboard, redirecting from", pathname, "to", correctDashboard)
      return NextResponse.redirect(new URL(correctDashboard, request.url))
    }
  }

  console.log("[v0] MIDDLEWARE: Allowing request to proceed:", pathname)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
