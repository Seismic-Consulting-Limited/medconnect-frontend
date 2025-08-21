"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Loader2, User, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"

export default function ClientSignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { signup } = useAuth()
  const router = useRouter()

  // Basic password checks; align with backend rules as needed
  const validatePassword = (pwd: string) => {
    const hasUppercase = /[A-Z]/.test(pwd)
    const hasLowercase = /[a-z]/.test(pwd)
    const hasMinLength = pwd.length >= 6
    const hasNumber = /\d/.test(pwd)
    return { hasUppercase, hasLowercase, hasMinLength, hasNumber }
  }
  const passwordValidation = validatePassword(password)
  const isPasswordValid =
    passwordValidation.hasUppercase &&
    passwordValidation.hasLowercase &&
    passwordValidation.hasMinLength &&
    passwordValidation.hasNumber

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side guards
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields")
      return
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (!isPasswordValid) {
      toast.error("Password must meet all requirements")
      return
    }
    if (!agreeToTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    setIsLoading(true)
    try {
      const payload: any = await signup(firstName, lastName, email, password, "client")

      // Optional success message from backend (preferred), fallback if absent
      const successMsg =
        (payload && (payload.message || payload.detail)) ||
        "Account created. Please check your email for verification."
      toast.success(String(successMsg))

      // Detect if verification is required — check several common flags.
      const needsOtp =
        Boolean(payload?.requires_verification) ||
        Boolean(payload?.requiresVerification) ||
        payload?.next === "verify" ||
        payload?.status === "pending_verification" ||
        Boolean(payload?.otp_required)

      // Detect if the backend already authenticated the user.
      const hasAuth = Boolean(payload?.token || payload?.refreshToken || payload?.user)

      // 🚦 Redirect rule:
      // - If verification is required OR there is no auth in the response → go to verify page
      // - Only when NO verification is needed AND auth is present → go to dashboard
      const lower = email.toLowerCase()
      if (needsOtp || !hasAuth) {
        const params = new URLSearchParams({ email: lower })
        router.push(`/user/auth/verify?${params.toString()}`)
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      // Show ONLY backend-provided/parsed message
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold text-foreground">Client Sign Up</CardTitle>
            <p className="text-muted-foreground">Create your patient account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="Stephen"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10 h-12 border-border"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      placeholder="Strange"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-10 h-12 border-border"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="dr-strange@marvel.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
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
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-border"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>

              {password && (
                <div className="text-sm space-y-1">
                  <p className="text-primary">
                    Passwords must include{" "}
                    <span className={passwordValidation.hasUppercase ? "text-primary" : "text-destructive"}>uppercase</span>{" "}
                    and{" "}
                    <span className={passwordValidation.hasLowercase ? "text-primary" : "text-destructive"}>lowercase</span>{" "}
                    letters, contain{" "}
                    <span className={passwordValidation.hasNumber ? "text-primary" : "text-destructive"}>a number</span>, and be{" "}
                    <span className={passwordValidation.hasMinLength ? "text-primary" : "text-destructive"}>at least 6 characters</span>.
                  </p>
                </div>
              )}

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                  className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating Account...</>) : ("Continue")}
              </Button>

              <div className="text-center text-sm text-muted-foreground pt-2">
                Already have an account?{" "}
                <Link href="/user/auth/login" className="text-primary hover:underline font-medium">Login</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
