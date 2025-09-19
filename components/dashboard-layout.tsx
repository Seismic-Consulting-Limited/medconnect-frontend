"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Bell, HelpCircle, Home, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"
import { authService } from "@/lib/auth"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
  const [actualProfileCompletion, setActualProfileCompletion] = useState(profileCompletion)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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

  useEffect(() => {
    const fetchProfileCompletion = async () => {
      try {
        const token = authService.getToken()
        if (!token) return

        const response = await apiRequest<{ data: { completion_rate: number } }>(
          API_ENDPOINTS.META.PROFILE_COMPLETION_RATE,
          {
            method: HTTP_METHODS.GET,
          },
          {
            auth: true,
            getToken: () => authService.getToken(),
          },
        )

        if (response.data?.completion_rate !== undefined) {
          setActualProfileCompletion(response.data.completion_rate)
        }
      } catch (error) {
        console.error("Failed to fetch profile completion rate:", error)
        // Keep using the fallback value
      }
    }

    fetchProfileCompletion()
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push("/user/auth/login")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoggingOut(false)
      setShowLogoutDialog(false)
    }
  }

  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  return (
    <>
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
                  {Math.round(actualProfileCompletion)}%
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
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogoutClick}>
                <User className="h-5 w-5" />
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

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut} className="bg-red-600 hover:bg-red-700">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
