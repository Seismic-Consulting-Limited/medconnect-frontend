"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Lock } from "lucide-react"
import { authService } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

export default function ResetPasswordNewPage() {
  const { toast } = useToast()
  const router = useRouter()
  const params = useSearchParams()

  // Read from the email link (?uid=...&token=...)
  const uid = useMemo(() => params.get("uid") || "", [params])
  const token = useMemo(() => params.get("token") || "", [params])

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [inFlight, setInFlight] = useState(false)

  useEffect(() => {
    if (!uid || !token) {
      toast({
        title: "Invalid reset link",
        description: "The link is missing required codes. Please request a new password reset.",
        variant: "destructive",
        duration: 5000,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inFlight) return

    if (!uid || !token) {
      toast({
        title: "Missing code",
        description: "UID and token are required. Please request a new reset email.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }
    if (!password || password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }
    if (password !== confirm) {
      toast({
        title: "Passwords do not match",
        description: "Please re-enter.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    setInFlight(true)
    try {
      const res = await authService.resetPasswordConfirm(uid, token, password)
      const msg = res?.message ?? res?.detail ?? "Password has been reset."
      toast({ title: "Success", description: String(msg), duration: 5000 })
      router.push("/user/auth/login")
    } catch (err) {
      toast({
        title: "Reset failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setInFlight(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Set a new password</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your new password. (The codes from your email are applied automatically.)
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 border-border"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
                disabled={inFlight}
              >
                {inFlight ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating…
                  </>
                ) : (
                  "Update password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
