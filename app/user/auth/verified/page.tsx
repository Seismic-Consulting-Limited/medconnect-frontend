"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

type Role = "hospital" | "travel-agent" | "client"

export default function VerifiedInfoPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [role, setRole] = useState<Role>("client")

  // Role can come from query (?role=...) or sessionStorage fallback
  useEffect(() => {
    const r = (params.get("role") || "").toLowerCase().trim()
    if (r === "hospital" || r === "travel-agent" || r === "client") {
      setRole(r)
      return
    }
    if (typeof window !== "undefined") {
      const stored = (sessionStorage.getItem("pending_role") || "").toLowerCase()
      if (stored === "hospital" || stored === "travel-agent" || stored === "client") {
        setRole(stored as Role)
      }
    }
  }, [params])

const copy = useMemo(() => {
  if (role === "hospital") {
    return {
      title: "Email verified!",
      body:
        "Your email has been verified. Please log in to your dashboard and complete your profile to send in your hospital partner application.",
      cta: "Go to Login",
    }
  }
  if (role === "travel-agent") {
    return {
      title: "Email verified!",
      body:
        "Your travel agent account has been verified. Please log in to your dashboard and complete your profile to send in your travel agent partner application.",
      cta: "Go to Login",
    }
  }
  // client
  return {
    title: "Email verified!",
    body: "Your email has been verified successfully. You can now log in to your account.",
    cta: "Sign in",
  }
}, [role])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[520px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
            <CardTitle className="text-2xl font-bold">{copy.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground text-center">{copy.body}</p>
            <Button className="w-full h-12 text-white" onClick={() => router.replace("/user/auth/login")}>
              {copy.cta}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
