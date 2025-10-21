"use client";

import { useState, useMemo, useEffect } from "react";
import { Mail, Send, KeyRound, RotateCcw, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getDashboardPath } from "@/utils/authhelpers";
import { loginViaOtpService, resendOtpService, verifySigninOtpService } from "@/service/auth.service";
import { toast } from "sonner";
import { setAccessToken, setRefreshToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useRoleStore } from "@/store/role";

export default function OtpLoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [otpRequested, setOtpRequested] = useState(false);
    const [otp, setOtp] = useState("");
    const [isRequestingOtp, setIsRequestingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState<number>(0);

    const { setRole } = useRoleStore();

    const canResend = useMemo(
        () => resendCooldown <= 0 && !isResending,
        [resendCooldown, isResending]
    );

    // Countdown timer for resend cooldown
    useEffect(() => {
        if (resendCooldown <= 0) return;

        const timer = setInterval(() => {
        setResendCooldown((prev) => {
            if (prev <= 1) {
            clearInterval(timer);
            return 0;
            }
            return prev - 1;
        });
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);

    const verifyOtp = async () => {
        setIsVerifyingOtp(true)
        try {
          const response = await verifySigninOtpService(email, otp);
          console.log(response)
          const accessToken = response?.data?.access_token
          const refreshToken = response?.data?.refresh_token
          const role = response?.data?.user_type

          if(response?.data) {
            toast.success(response?.message)
            setAccessToken(accessToken)
            setRefreshToken(refreshToken);
            setRole(role);
          }

          router.replace(getDashboardPath(role));
        } catch(error: any) {
          const is_Not_Verified = error?.response?.data?.error?.label === 'unverified_user'
          if(is_Not_Verified) {
            sessionStorage.setItem("pending_email", email.toLowerCase());
            router.replace("/user/auth/verify");
          }
          toast.error(error?.response?.data?.message)
        } finally {
            setIsVerifyingOtp(false)
        }
    }

    const requestOtp = async () => {
        setIsRequestingOtp(true);
        try {
          const response = await loginViaOtpService(email);
          if(response?.data) {
            toast.success(response.message);
            setOtpRequested(true);
            setResendCooldown(3600);
          } 
        } catch(error: any) {
          toast.error(error?.response?.data?.message)
        } finally {
            setIsRequestingOtp(false)
        }
    }

    const resendOtp = async () => {
      setIsResending(true)
        try {
          const response = await resendOtpService(email);
          if(response.data) {
            toast.success(response?.message)
            setOtpRequested(true)
          }
        } catch(error: any) {
          toast.error(error?.response?.data?.message)
        } finally {
            setIsResending(false)
        }
    }

  return (
    <div className="space-y-4">
      {/* Email input */}
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
            className="pl-10 h-12"
            required
          />
        </div>
      </div>

      {/* Request / Verify */}
      {!otpRequested ? (
        <Button
            onClick={requestOtp}
            type="button"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
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
                className="pl-10 h-12"
                required
              />
            </div>
          </div>

          <Button
            onClick={verifyOtp}
            type="button"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
            disabled={isVerifyingOtp || otp.length < 6}
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
              onClick={resendOtp}
              type="button"
              variant="outline"
              disabled={!canResend || !email}
              className="w-full h-12 hover:bg-primary hover:text-white bg-transparent"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {resendCooldown > 0 ? (
                    <>
                      Resend Code (
                      {Math.floor(resendCooldown / 60)
                        .toString()
                        .padStart(2, "0")}
                      :
                      {(resendCooldown % 60).toString().padStart(2, "0")}
                      )
                    </>
                  ) : (
                    "Resend Code"
                  )}
                </>
              )}
            </Button>

        </>
      )}
    </div>
  );
}
