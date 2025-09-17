"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export function RoleBasedRedirect() {
  const { user, isAuthenticated, isLoading, userRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log(
      "[v0] ROLE_REDIRECT: useEffect triggered - isLoading:",
      isLoading,
      "isAuthenticated:",
      isAuthenticated,
      "user:",
      user,
      "userRole:",
      userRole,
    )

    if (isLoading) {
      console.log("[v0] ROLE_REDIRECT: Still loading, returning early")
      return
    }

    if (isAuthenticated && user) {
      const role = userRole?.toLowerCase() || user.role?.toLowerCase()
      console.log("[v0] ROLE_REDIRECT: User authenticated with role:", role)

      switch (role) {
        case "hospital":
          console.log("[v0] ROLE_REDIRECT: Redirecting to hospital dashboard")
          router.replace("/dashboard/hospital")
          break
        case "travel_agent":
        case "travel-agent":
          console.log("[v0] ROLE_REDIRECT: Redirecting to travel agent dashboard")
          router.replace("/dashboard/travel-agent")
          break
        case "client":
        case "patient":
        default:
          console.log("[v0] ROLE_REDIRECT: Redirecting to client dashboard")
          router.replace("/dashboard/client")
          break
      }
    } else if (!isLoading && !isAuthenticated) {
      console.log("[v0] ROLE_REDIRECT: Not authenticated, redirecting to login")
      router.replace("/user/auth/login")
    }
  }, [user, isAuthenticated, isLoading, userRole, router]) // Added userRole to dependencies

  return null
}
