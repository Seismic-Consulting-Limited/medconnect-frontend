"use client"

import { LockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface PremiumContentOverlayProps {
  type: "pricing" | "details" | "contact" | "comparison"
  height?: string
}

export function PremiumContentOverlay({ type, height = "h-60" }: PremiumContentOverlayProps) {
  const router = useRouter()

  const getMessage = () => {
    switch (type) {
      case "pricing":
        return "Sign up to view detailed pricing information"
      case "details":
        return "Create an account to see full hospital details"
      case "contact":
        return "Sign up to contact this hospital directly"
      case "comparison":
        return "Create an account to compare hospitals"
      default:
        return "Sign up to view this content"
    }
  }

  return (
    <div className={`relative ${height} overflow-hidden rounded-md border bg-gray-50`}>
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/60 flex flex-col items-center justify-center p-6 text-center">
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <LockIcon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{getMessage()}</h3>
        <p className="text-sm text-gray-500 mb-4 max-w-xs">
          Join thousands of patients who found quality healthcare through MedConnect.
        </p>
        <div className="flex gap-3">      
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => router.push("/user/auth/signup")}
          >
            Sign Up
          </Button>
          <Button size="sm" variant="outline" onClick={() => router.push("/user/auth/login")}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  )
}
