"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SoftGateProps {
  type: "hospital" | "treatment" | "pricing" | "contact"
  onClose: () => void
}

export function SoftGate({ type, onClose }: SoftGateProps) {
  const router = useRouter()

  // Prevent scrolling when the gate is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const getTitle = () => {
    switch (type) {
      case "hospital":
        return "Create an account to view more hospitals"
      case "treatment":
        return "Sign up to explore treatment details"
      case "pricing":
        return "Create an account to view pricing information"
      case "contact":
        return "Sign up to contact this hospital"
      default:
        return "Create a free account to continue"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "hospital":
        return "Join MedConnect to compare hospitals, save your favorites, and get personalized recommendations."
      case "treatment":
        return "Create a free account to access detailed treatment information, success rates, and patient reviews."
      case "pricing":
        return "Sign up to view detailed pricing, insurance information, and potential cost savings."
      case "contact":
        return "Create an account to contact hospitals directly, schedule consultations, and receive quotes."
      default:
        return "Join thousands of patients who found quality healthcare through MedConnect."
    }
  }

  const handleSignup = () => {
    router.push("/user/auth/signup")
  }

  const handleLogin = () => {
    router.push("/user/auth/login")
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose} aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
        <CardContent className="pt-6 pb-8 px-6">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">{getTitle()}</h2>
            <p className="text-gray-500">{getDescription()}</p>

            <div className="pt-2 space-y-3">
              <Button className="w-full bg-primary hover:bg-primary-700" onClick={handleSignup}>
                Create Free Account
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-500">or</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleLogin}>
                Log In
              </Button>
            </div>

            <p className="text-xs text-gray-500 pt-4">
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
