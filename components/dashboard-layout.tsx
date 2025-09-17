"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Bell, HelpCircle, Home, ChevronRight, CircleUserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  profileCompletion?: number
}

export function DashboardLayout({
  children,
  title = "Dashboard",
  subtitle,
  profileCompletion = 75,
}: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If user tries to go back from dashboard, redirect to landing page
      if (window.location.pathname.startsWith("/dashboard")) {
        event.preventDefault()
        router.replace("/")
      }
    }

    // Replace current history entry to prevent back to login
    if (typeof window !== "undefined") {
      window.history.replaceState({ fromDashboard: true }, "", window.location.pathname)
      window.addEventListener("popstate", handlePopState)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("popstate", handlePopState)
      }
    }
  }, [router])

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/user/auth/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
              <Home className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold">MedKonnect</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white px-3 py-1.5">
              <div className="h-6 w-6 rounded-full bg-white/20 grid place-items-center text-xs font-semibold">
                {Math.round(profileCompletion)}%
              </div>
              <span className="text-sm">Profile Complete</span>
              <ChevronRight className="h-4 w-4 opacity-90" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="gap-2" onClick={handleLogout}>
              <CircleUserRound className="h-5 w-5" />
              <span className="hidden sm:inline">Account</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {title && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
