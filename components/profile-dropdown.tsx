"use client"

import { useState } from "react"
import { ChevronRight, Building2, Settings, LogOut, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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

interface ProfileDropdownProps {
  className?: string
}

export function ProfileDropdown({ className }: ProfileDropdownProps) {
  const { user, logout, userRole, getUserRole } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

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

  const handleProfileManagement = () => {
    if (pathname.includes("/dashboard/hospital")) {
      router.push("/dashboard/hospital/profile")
    } else if (pathname.includes("/dashboard/travel-agent")) {
      router.push("/dashboard/travel-agent/profile")
    } else if (pathname.includes("/dashboard/patient")) {
      router.push("/dashboard/patient/profile")
    } else {
      const currentRole = user?.role || userRole || getUserRole()
      if (currentRole === "hospital") {
        router.push("/dashboard/hospital/profile")
      } else if (currentRole === "travel_agent") {
        router.push("/dashboard/travel-agent/profile")
      } else {
        router.push("/dashboard/patient/profile")
      }
    }
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (email) {
      return email.slice(0, 2).toUpperCase()
    }
    return "U"
  }

  const getProfileLabel = () => {
    if (pathname.includes("/dashboard/hospital") || user?.role === "hospital") {
      return "Manage Hospital Profile"
    } else if (pathname.includes("/dashboard/travel-agent") || user?.role === "travel_agent") {
      return "Manage Agent Profile"
    }
    return "Manage Profile"
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-sm">
                {getInitials(user?.name, user?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-white rounded-full border-2 border-primary/20 flex items-center justify-center">
              <User className="h-2.5 w-2.5 text-primary" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 p-0 bg-white border-0 shadow-2xl rounded-3xl overflow-hidden"
          sideOffset={8}
        >
          <div className="p-4 space-y-3">
            <button
              onClick={handleProfileManagement}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gray-800 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-base">{getProfileLabel()}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>

            <button
              onClick={handleSettings}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 rounded-2xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gray-800 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-base">Settings</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>

            <button
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 rounded-2xl transition-colors group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-red-500 flex items-center justify-center">
                  <LogOut className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-red-600 text-base">{isLoggingOut ? "Logging out..." : "Logout"}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-red-400 group-hover:text-red-600 transition-colors" />
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

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
            <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut} className="bg-red-600 hover:bg-red-700 text-white">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
