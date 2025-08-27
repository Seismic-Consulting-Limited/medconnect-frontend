"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2, Mail, CheckCircle2, RotateCcw } from "lucide-react"
import { authService } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

function maskEmail(email: string) {
  const [user, domain] = email.split("@")
  if (!user || !domain) return email
  const maskedUser = user.length <= 2 ? `${user[0] ?? ""}*` : `${user.slice(0, 2)}${"*".repeat(Math.max(1, user.length - 2))}`
  const [name, tld] = domain.split(".")
  const maskedDomain = name ? `${name[0]}***.${tld ?? ""}` : domain
  return `${maskedUser}@${maskedDomain}`
}

export default function PasswordResetRequestPage() {
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [serverMsg, setServerMsg] = useState<string>("")
  const [cooldown, setCooldown] = useState(0)

  const canResend = useMemo(() => cooldown <= 0 && !isSending, [cooldown, isSending])

  const startCooldown = (secs = 30) => {
    setCooldown(secs)
    const id = setInterval(() => {
      setCooldown((v) => {
        if (v <= 1) {
          clearInterval(id as any)
          return 0
        }
        return v - 1
      })
    }, 1000)
  }

  const handleSend = async () => {
    if (!email) return
    setIsSending(true)
    setServerMsg("")
    try {
      const res = await authService.resetPasswordInit(email.toLowerCase())
      const msg = res?.message ?? res?.detail ?? ""
      setSent(true)
      setServerMsg(String(msg))
      toast({
        title: "Email sent",
        description: String(msg || `If an account exists for ${email}, we’ve sent reset instructions.`),
        duration: 5000,
      })
      startCooldown(30)
    } catch (err) {
      const message = err instanceof Error ? err.message : ""
      toast({ title: "Request failed", description: message, variant: "destructive", duration: 5000 })
    } finally {
      setIsSending(false)
    }
  }

  const handleResend = async () => {
    if (!canResend || !email) return
    await handleSend()
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Reset your password</CardTitle>
            <p className="text-sm text-muted-foreground">Enter your email to receive a reset link.</p>
          </CardHeader>

          <CardContent className="space-y-5">
            {!sent ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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

                <Button
                  onClick={handleSend}
                  disabled={isSending || !email}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send reset instructions"
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 rounded-md border border-border p-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Check your email</p>
                    <p className="text-muted-foreground mt-0.5">
                      {serverMsg || `We’ve sent a password reset link to ${maskEmail(email)}.`}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleResend}
                  disabled={!canResend}
                  variant="outline"
                  className="w-full h-12 hover:bg-primary hover:text-white"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resending…
                    </>
                  ) : (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Resend email {cooldown > 0 ? `(${cooldown}s)` : ""}
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Didn&apos;t get it? Check your spam folder or try again.
                </div>
              </>
            )}

            <div className="text-center text-sm">
              <Link href="/user/auth/login" className="text-primary hover:underline font-medium">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
