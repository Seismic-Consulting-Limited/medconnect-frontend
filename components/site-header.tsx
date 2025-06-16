"use client"

import { useState } from "react"
import Link from "next/link"
import { HeartPulse, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LoginModal } from "@/components/auth/login-modal"
import { SignupModal } from "@/components/auth/signup-modal"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)

  // Use Next.js's usePathname hook to get the current path
  const pathname = usePathname()

  // Function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/#how-it-works") {
      return pathname === "/"
    }
    if (path === "/hospitals" && pathname?.startsWith("/hospital/")) {
      return true
    }
    return pathname?.startsWith(path)
  }

  // Check if we're on the homepage
  const isHomePage = pathname === "/"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm transition-all duration-300">
      <div className="container flex h-24 items-center justify-between px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <HeartPulse className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
            MedKonnect
          </span>
        </Link>

        {/* Desktop Navigation - only show on large screens */}
        <nav className="hidden lg:flex gap-8">
          <Link
            href="/hospitals"
            className={cn(
              "text-base font-medium transition-all duration-300 relative py-2",
              "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
              isActive("/hospitals") ? "after:w-full text-primary font-semibold" : "after:w-0 hover:after:w-full",
            )}
          >
            Find Hospitals
          </Link>
          <Link
            href="/travel-agents"
            className={cn(
              "text-base font-medium transition-all duration-300 relative py-2",
              "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
              isActive("/travel-agents") ? "after:w-full text-primary font-semibold" : "after:w-0 hover:after:w-full",
            )}
          >
            Travel Agents
          </Link>
          <Link
            href="/telemedicine"
            className={cn(
              "text-base font-medium transition-all duration-300 relative py-2",
              "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
              isActive("/telemedicine") ? "after:w-full text-primary font-semibold" : "after:w-0 hover:after:w-full",
            )}
          >
            Telemedicine
          </Link>
          <Link
            href="/partners"
            className={cn(
              "text-base font-medium transition-all duration-300 relative py-2",
              "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
              isActive("/partners") ? "after:w-full text-primary font-semibold" : "after:w-0 hover:after:w-full",
            )}
          >
            For Partners
          </Link>
        </nav>

        {/* Desktop Auth Buttons - only show on large screens */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setLoginModalOpen(true)}
            className="hover:text-primary hover:bg-primary-50 text-base transition-all duration-300 hover:scale-105"
          >
            Log In
          </Button>
          <Button
            id="signup-modal-trigger"
            onClick={() => setSignupModalOpen(true)}
            className="bg-primary hover:bg-primary-700 text-white text-base px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button - show on all screens except large */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden transition-all duration-300 hover:bg-primary-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-24 z-50 bg-white border-b lg:hidden transition-all duration-300 ease-in-out shadow-md",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="container px-4 py-4 flex flex-col gap-4 max-w-7xl mx-auto">
          <Link
            href="/hospitals"
            className={cn(
              "text-sm font-medium p-2 rounded-md transition-all duration-300",
              isActive("/hospitals") ? "bg-primary-50 text-primary font-semibold" : "hover:bg-primary-50",
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Find Hospitals
          </Link>
          <Link
            href="/travel-agents"
            className={cn(
              "text-sm font-medium p-2 rounded-md transition-all duration-300",
              isActive("/travel-agents") ? "bg-primary-50 text-primary font-semibold" : "hover:bg-primary-50",
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Travel Agents
          </Link>
          <Link
            href="/telemedicine"
            className={cn(
              "text-sm font-medium p-2 rounded-md transition-all duration-300",
              isActive("/telemedicine") ? "bg-primary-50 text-primary font-semibold" : "hover:bg-primary-50",
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Telemedicine
          </Link>
          <Link
            href="/partners"
            className={cn(
              "text-sm font-medium p-2 rounded-md transition-all duration-300",
              isActive("/partners") ? "bg-primary-50 text-primary font-semibold" : "hover:bg-primary-50",
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            For Partners
          </Link>
          <div className="flex flex-col gap-2 pt-2 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setLoginModalOpen(true)
                setMobileMenuOpen(false)
              }}
              className="w-full transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Log In
            </Button>
            <Button
              id="signup-modal-trigger-mobile"
              onClick={() => {
                setSignupModalOpen(true)
                setMobileMenuOpen(false)
              }}
              className="w-full bg-primary hover:bg-primary-700 text-white transition-all duration-300 hover:shadow-md"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onOpenSignup={() => {
          setLoginModalOpen(false)
          setSignupModalOpen(true)
        }}
      />
      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onOpenLogin={() => {
          setSignupModalOpen(false)
          setLoginModalOpen(true)
        }}
      />
    </header>
  )
}
