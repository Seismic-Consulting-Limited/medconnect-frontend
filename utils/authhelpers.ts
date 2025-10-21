import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";


export const UNVERIFIED_MSG = "User not verified, an OTP has been sent to your email";

export function getDashboardPath(role?: string) {
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

export function getNextParam(): string | null {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  return url.searchParams.get("next") || url.searchParams.get("redirect");
}

export function startVerifyCountdown(email: string, router: AppRouterInstance) {
  const base = UNVERIFIED_MSG;
  let secs = 5;
  const id = toast.success(`${base}. Redirecting in ${secs}s…`, { duration: 6000 });
  const timer = setInterval(() => {
    secs -= 1;
    if (secs <= 0) {
      clearInterval(timer);
      const q = new URLSearchParams({ email: email.toLowerCase(), from: "login" });
      router.replace(`/user/auth/verify?${q.toString()}`);
    } else {
      toast.success(`${base}. Redirecting in ${secs}s…`, { id, duration: 6000 });
    }
  }, 1000);
}
