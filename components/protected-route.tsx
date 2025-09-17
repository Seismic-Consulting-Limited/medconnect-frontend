"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRoleNavigation } from "@/hooks/use-role-navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string | string[]
  fallbackPath?: string
}

export function ProtectedRoute({ children, requiredRole, fallbackPath }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, getUserRole } = useAuth()
  const { getDashboardPath, isAuthorizedForRoute } = useRoleNavigation()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (isLoading) return

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      const currentPath = window.location.pathname
      router.replace(`/user/auth/login?next=${encodeURIComponent(currentPath)}`)
      return
    }

    // Check role-based authorization
    if (requiredRole && user) {
      const userRole = getUserRole()?.toLowerCase()
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole.map((r) => r.toLowerCase())
        : [requiredRole.toLowerCase()]

      if (!allowedRoles.includes(userRole || "")) {
        // Redirect to appropriate dashboard for user's role
        const correctPath = fallbackPath || getDashboardPath(userRole)
        router.replace(correctPath)
        return
      }
    }

    // Check route authorization
    const currentPath = window.location.pathname
    if (!isAuthorizedForRoute(currentPath)) {
      const userRole = getUserRole()
      const correctPath = fallbackPath || getDashboardPath(userRole)
      router.replace(correctPath)
      return
    }

    setIsChecking(false)
  }, [
    isLoading,
    isAuthenticated,
    user,
    requiredRole,
    fallbackPath,
    router,
    getDashboardPath,
    isAuthorizedForRoute,
    getUserRole,
  ])

  // Show loading while checking authentication and authorization
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
