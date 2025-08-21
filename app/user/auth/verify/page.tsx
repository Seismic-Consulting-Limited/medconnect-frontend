"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2, RotateCcw, ShieldCheck } from "lucide-react"
import { authService } from "@/lib/auth"
import { toast } from "sonner"

function maskEmail(email: string) {
  const [user, domain] = email.split("@")
  if (!user || !domain) return email
  const maskedUser =
    user.length <= 2 ? `${user[0] ?? ""}*` : `${user.slice(0, 2)}${"*".repeat(Math.max(1, user.length - 2))}`
  const [name, tld] = domain.split(".")
  const maskedDomain = name ? `${name[0]}***.${tld ?? ""}` : domain
  return `${maskedUser}@${maskedDomain}`
}

export default function VerifyEmailPage() {
  const params = useSearchParams()
  const router = useRouter()
  const emailParam = (params.get("email") || "").toLowerCase()

  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState<number>(0)

  // simple 30s cooldown
  const canResend = useMemo(() => resendCooldown <= 0 && !isResending, [resendCooldown, isResending])

  const handleVerify = async () => {
    if (!emailParam) {
      toast.error("Missing email. Please go back and try again.")
      return
    }
    if (!otp || otp.length < 4) {
      toast.error("Please enter the verification code sent to your email.")
      return
    }

    setIsVerifying(true)
    try {
      const payload = await authService.verifyEmail(emailParam, otp)
      const msg = payload?.message ?? payload?.detail ?? "Email verified successfully."
      toast.success(String(msg))

      // If backend returned tokens/user on verify, go to dashboard immediately
      if (payload?.token || payload?.refreshToken || payload?.user) {
        router.push("/dashboard")
      } else {
        // Otherwise send to login after a brief moment (toast persists across route)
        setTimeout(() => router.push("/user/auth/login"), 400)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    if (!emailParam) {
      toast.error("Missing email. Please go back and try again.")
      return
    }
    if (!canResend) return

    setIsResending(true)
    try {
      const payload = await authService.resendEmailOtp(emailParam)
      const msg = payload?.message ?? payload?.detail ?? "A new code has been sent to your email."
      toast.success(String(msg))
      setResendCooldown(30)

      const id = setInterval(() => {
        setResendCooldown((v) => {
          if (v <= 1) {
            clearInterval(id as any)
            return 0
          }
          return v - 1
        })
      }, 1000)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend code. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold text-foreground">Verify your email</CardTitle>
            <p className="text-sm text-muted-foreground">
              We’ve sent a code to{" "}
              <span className="font-medium text-foreground">{emailParam ? maskEmail(emailParam) : "your email"}</span>
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="h-12"
              />
            </div>

            <Button onClick={handleVerify} disabled={isVerifying || otp.length < 4 || !emailParam} className="w-full h-12 text-white">
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleResend}
              disabled={!canResend || !emailParam}
              className="w-full h-12 hover:bg-primary hover:text-white focus:bg-primary focus:text-white active:bg-primary active:text-white"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Resend Code {resendCooldown > 0 ? `(${resendCooldown}s)` : ""}
                </>
              )}
            </Button>

            <div className="text-center text-sm">
              <Link href="/user/auth/signup" className="text-primary hover:underline font-medium">
                Back to Sign Up
              </Link>
              <span className="text-muted-foreground"> · </span>
              <Link href="/user/auth/login" className="text-primary hover:underline font-medium">
                Go to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
