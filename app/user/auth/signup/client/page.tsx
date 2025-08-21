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
  const [error, setError] = useState("")

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
    setError("")

    // Client-side guards
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!isPasswordValid) {
      setError("Password must meet all requirements")
      return
    }
    if (!agreeToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    setIsLoading(true)
    try {
      const payload: any = await signup(firstName, lastName, email, password, "client")

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
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => console.log("Google login clicked")
  const handleAppleLogin = () => console.log("Apple login clicked")

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold text-foreground">Client Sign Up</CardTitle>
            <p className="text-muted-foreground">Create your patient account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social logins */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 border-border hover:bg-muted bg-transparent"
                onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 4.12-4.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  />
                </svg>
                Login with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 border-border hover:bg-muted bg-transparent"
                onClick={handleAppleLogin}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Login with Apple
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="firstName" placeholder="Stephen" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="pl-10 h-12 border-border" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="lastName" placeholder="Strange" value={lastName} onChange={(e) => setLastName(e.target.value)} className="pl-10 h-12 border-border" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="dr-strange@marvel.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 border-border" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 h-12 border-border" required />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10 h-12 border-border" required />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowConfirmPassword((s) => !s)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>
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

              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium" disabled={isLoading}>
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
