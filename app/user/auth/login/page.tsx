"use client";

import type React from "react";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  KeyRound,
  Send,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/lib/auth";
import { toast } from "sonner";

type Tab = "password" | "otp";

function getDashboardPath(role?: string) {
  switch ((role || "").toLowerCase()) {
    case "hospital":
      return "/dashboard/hospital";
    case "travel_agent":
    case "travel-agent":
      return "/dashboard/travel-agent";
    default:
      return "/dashboard/client";
  }
}

function setRoleCookie(role?: string) {
  if (!role) return;
  // 30 days; adjust as needed. HttpOnly would be ideal from server, but this works for now.
  document.cookie = `role=${encodeURIComponent(role)}; path=/; max-age=${
    60 * 60 * 24 * 30
  }`;
}

function getNextParam(): string | null {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  return url.searchParams.get("next") || url.searchParams.get("redirect");
}

function routeAfterLogin(router: ReturnType<typeof useRouter>, payload: any) {
  const next = getNextParam();
  const role =
    payload?.user?.role ??
    payload?.role ??
    payload?.data?.user?.role ??
    payload?.data?.role;

  if (role) setRoleCookie(role);

  if (next) {
    router.replace(next);
  } else {
    router.replace(getDashboardPath(role));
  }
}

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("password");

  // Shared
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Password flow
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // OTP flow
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Resend controls
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const canResend = useMemo(
    () => resendCooldown <= 0 && !isResending,
    [resendCooldown, isResending]
  );

  type LoginPayload = {
    requires_verification?: boolean;
    status?: string;
    next?: string;
    user?: {
      emailVerified?: boolean;
      role?: string;
    };
    role?: string;
    data?: {
      user?: {
        role?: string;
      };
      role?: string;
      access_token?: string;
      token?: string;
    };
    access_token?: string;
    token?: string;
  };

  const { login, isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();

  // If already logged in, never show this page
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const next = getNextParam();
      if (next) {
        router.replace(next);
        return;
      }
      // Try to read role from cookie (set previously on a successful login)
      const roleCookie =
        typeof document !== "undefined"
          ? document.cookie
              .split("; ")
              .find((c) => c.startsWith("role="))
              ?.split("=")[1]
          : undefined;
      const role = roleCookie ? decodeURIComponent(roleCookie) : undefined;
      const dashboardPath = getDashboardPath(role);
      router.replace(dashboardPath);
    }
  }, [authLoading, isAuthenticated, router, user]);

  const switchTab = (next: Tab) => {
    setTab(next);
    setPasswordError("");
    setOtpError("");
    setOtpRequested(false);
    setOtp("");
    setIsRequestingOtp(false);
    setIsVerifyingOtp(false);
    setIsResending(false);
    setResendCooldown(0);
    if (next === "otp") setPassword("");
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (!email || !password) {
      setPasswordError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {

      authService.debugClearAll();

      const response = await authService.login(email, password);

      // Check if login failed
      if (response.success === false || response.error) {
        console.log("[v0] LOGIN: Login failed:", response.error);
        setPasswordError(response.error || "Login failed");
        return;
      }

      // Check if token was stored
      const storedToken = authService.getToken();
      if (!storedToken) {
        console.error("[v0] LOGIN: No token found after login");
        setPasswordError("Authentication failed - please try again");
        return;
      }

      console.log("[v0] LOGIN: Login successful, redirecting");

      // Extract user type for routing
      const userType =
        response.data?.user_type ||
        response.user?.role ||
        response.data?.user?.role ||
        localStorage.getItem("user_type");

      if (userType) {
        setRoleCookie(userType);
      }

      // Navigate to appropriate dashboard
      const next = getNextParam();
      if (next) {
        router.replace(next);
      } else {
        router.replace(getDashboardPath(userType));
      }
    } catch (err) {
      console.error("[v0] LOGIN: Login error:", err);
      if (err instanceof Error) {
        const errorMessage = err.message;

        if (
          errorMessage ===
          "User not verified, an OTP has been sent to your email"
        ) {
          const q = new URLSearchParams({
            email: email.toLowerCase(),
            from: "login",
          });
          router.replace(`/user/auth/verify?${q.toString()}`);
          return;
        } else {
          setPasswordError(errorMessage);
        }
      } else {
        setPasswordError("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startCooldown = (secs = 30) => {
    setResendCooldown(secs);
    const id = setInterval(() => {
      setResendCooldown((v) => {
        if (v <= 1) {
          clearInterval(id as any);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  };

  const handleRequestOtp = async () => {
    setOtpError("");
    if (!email) {
      setOtpError("Please enter your email");
      return;
    }
    setIsRequestingOtp(true);
    try {
      const res = await authService.signinOtpInit(email);
      const msg =
        res?.message ??
        res?.detail ??
        "If an account exists, we’ve sent a code.";
      setOtpRequested(true);
      toast.success(String(msg));
      startCooldown(30);
    } catch (err) {
      const m =
        err instanceof Error
          ? err.message
          : "Could not send code. Please try again.";
      setOtpError(m);
      toast.error(m);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    if (!email) {
      setOtpError("Missing email");
      return;
    }
    if (!otp || otp.length < 4) {
      setOtpError("Enter the code sent to your email");
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const res = await authService.signinOtpVerify(email, otp);
      const needsVerify =
        Boolean(res?.requires_verification) ||
        res?.status === "pending_verification" ||
        res?.next === "verify" ||
        res?.user?.emailVerified === false;

      router.replace(
        needsVerify
          ? `/user/auth/verify?email=${encodeURIComponent(
              email.toLowerCase()
            )}&from=login`
          : "/dashboard"
      );
    } catch (err) {
      const m =
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.";
      setOtpError(m);
      toast.error(m);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setOtpError("Missing email");
      return;
    }
    if (!canResend) return;

    setIsResending(true);
    setOtpError("");
    try {
      const res = await authService.signinOtpInit(email);
      const msg =
        res?.message ??
        res?.detail ??
        "If an account exists, a new code has been sent.";
      toast.success(String(msg));
      startCooldown(30);
    } catch (err) {
      const m =
        err instanceof Error
          ? err.message
          : "Could not resend code. Please try again.";
      setOtpError(m);
      toast.error(m);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[520px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold text-foreground">
              Login
            </CardTitle>
            <div className="mx-auto mt-2 inline-flex rounded-lg border p-1 bg-muted/30">
              <button
                className={`px-4 py-2 rounded-md text-sm ${
                  tab === "password" ? "bg-background shadow" : "opacity-70"
                }`}
                onClick={() => switchTab("password")}
                type="button"
                aria-pressed={tab === "password"}
              >
                Password
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm ${
                  tab === "otp" ? "bg-background shadow" : "opacity-70"
                }`}
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
              <form
                key="password-form"
                onSubmit={handlePasswordLogin}
                className="space-y-4"
              >
                {passwordError && (
                  <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                    {passwordError}
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
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
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
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
                    <label
                      htmlFor="remember"
                      className="text-sm text-muted-foreground"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/user/auth/reset"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
                  disabled={isLoading}
                >
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
                  <Link
                    href="/user/auth/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
            ) : (
              <div key="otp-form" className="space-y-4">
                {otpError && (
                  <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                    {otpError}
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email-otp"
                    className="text-sm font-medium text-foreground"
                  >
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
                      <Label
                        htmlFor="otp"
                        className="text-sm font-medium text-foreground"
                      >
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
                          onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ""))
                          }
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

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResendOtp}
                      disabled={!canResend || !email}
                      className="w-full h-12 hover:bg-primary hover:text-white focus:bg-primary focus:text-white active:bg-primary active:text-white bg-transparent"
                    >
                      {isResending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        <>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Resend Code{" "}
                          {resendCooldown > 0 ? `(${resendCooldown}s)` : ""}
                        </>
                      )}
                    </Button>
                  </>
                )}

                <div className="text-center text-sm text-muted-foreground pt-2">
                  Prefer password?{" "}
                  <button
                    onClick={() => switchTab("password")}
                    className="text-primary hover:underline font-medium"
                  >
                    Use password instead
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
