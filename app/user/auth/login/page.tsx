"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Loader2, Mail, Lock, KeyRound, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"
import { authService } from "@/lib/auth"
import { toast } from "sonner"

type Tab = "password" | "otp"

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("password")

  // Shared
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Password flow
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // OTP flow
  const [otpRequested, setOtpRequested] = useState(false)
  const [otp, setOtp] = useState("")
  const [isRequestingOtp, setIsRequestingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const switchTab = (next: Tab) => {
    setTab(next)
    // reset per-tab states so messages don't bleed between tabs
    setOtpRequested(false)
    setOtp("")
    setIsLoading(false)
    setIsRequestingOtp(false)
    setIsVerifyingOtp(false)
    if (next === "otp") setPassword("")
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }
    setIsLoading(true)
    try {
      await login(email, password) // POST /v1/auth/signin/
      // we don't fabricate success text since useAuth.login doesn't return payload
      router.push("/dashboard")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestOtp = async () => {
    if (!email) {
      toast.error("Please enter your email")
      return
    }
    setIsRequestingOtp(true)
    try {
      const res = await authService.signinOtpInit(email) // POST /v1/auth/signin/otp/
      const msg = res?.message ?? res?.detail ?? "Code sent to your email."
      toast.success(String(msg))
      setOtpRequested(true)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send code.")
    } finally {
      setIsRequestingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!email) {
      toast.error("Missing email")
      return
    }
    if (!otp || otp.length < 4) {
      toast.error("Enter the code sent to your email")
      return
    }
    setIsVerifyingOtp(true)
    try {
      const res = await authService.signinOtpVerify(email, otp) // POST /v1/auth/signin/otp/verify/
      const msg = res?.message ?? res?.detail ?? "Logged in successfully."
      toast.success(String(msg))
      router.push("/dashboard")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "OTP verification failed.")
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[520px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold text-foreground">Login</CardTitle>

            {/* Tabs */}
            <div className="mx-auto mt-2 inline-flex rounded-lg border p-1 bg-muted/30">
              <button
                className={`px-4 py-2 rounded-md text-sm ${tab === "password" ? "bg-background shadow" : "opacity-70"}`}
                onClick={() => switchTab("password")}
                type="button"
                aria-pressed={tab === "password"}
              >
                Password
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm ${tab === "otp" ? "bg-background shadow" : "opacity-70"}`}
                onClick={() => switchTab("otp")}
                type="button"
                aria-pressed={tab === "otp"}
              >
                Login with OTP
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {tab === "password" ? (
              <form key="password-form" onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-border"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                    />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground pt-2">
                  Don&apos;t have an account?{" "}
                  <Link href="/user/auth/signup" className="text-primary hover:underline font-medium">
                    Sign Up
                  </Link>
                </div>
              </form>
            ) : (
              <div key="otp-form" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-otp" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email-otp"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-border"
                      required
                    />
                  </div>
                </div>

                {!otpRequested ? (
                  <Button
                    type="button"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
                    onClick={handleRequestOtp}
                    disabled={isRequestingOtp || !email}
                  >
                    {isRequestingOtp ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Login Code
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium text-foreground">
                        Enter OTP
                      </Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="otp"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={6}
                          placeholder="6-digit code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                          className="pl-10 h-12 border-border"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingOtp || otp.length < 4}
                    >
                      {isVerifyingOtp ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Login"
                      )}
                    </Button>
                  </>
                )}

                <div className="text-center text-sm text-muted-foreground pt-2">
                  Prefer password?{" "}
                  <button onClick={() => switchTab("password")} className="text-primary hover:underline font-medium">
                    Use password instead
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
