// components/protected-route.tsx
"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRoleNavigation } from "@/hooks/use-role-navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  fallbackPath?: string;
}

const norm = (v?: string | null) => (v ?? "").toLowerCase().replace(/\s+/g, "_");
const alias = (r?: string | null) => {
  const x = norm(r);
  if (x === "patient") return "client";
  if (x === "travel-agent") return "travel_agent";
  return x;
};
const hasAnyRole = (userRole?: string | null, required?: string | string[]) => {
  if (!required) return true;
  const ur = alias(userRole) || "";
  const allowed = (Array.isArray(required) ? required : [required]).map(alias);
  return allowed.includes(ur);
};

export function ProtectedRoute({ children, requiredRole, fallbackPath }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, getUserRole } = useAuth();
  const { getDashboardPath, isAuthorizedForRoute } = useRoleNavigation();
  const [isChecking, setIsChecking] = useState(true);

  // consider cookie presence while user hydrates
  const tokenPresent = useMemo(() => {
    if (typeof document === "undefined") return false;
    return document.cookie.split("; ").some((c) => c.startsWith("medconnect_token="));
  }, []);

  const rawRole: string | undefined = (getUserRole?.() ?? undefined) as string | undefined;
  const userRole = alias(rawRole);
  const authNow = isAuthenticated || (!isLoading && tokenPresent);

  const currentUrl = () => {
    if (typeof window === "undefined") return "/";
    const { pathname, search } = window.location;
    return `${pathname}${search || ""}`;
  };

  useEffect(() => {
    if (isLoading) return;

    const here = currentUrl();

    // 1) not authenticated → login with ?next=<full path + query>
    if (!authNow) {
      if (!here.startsWith("/user/auth/login")) {
        router.replace(`/user/auth/login?next=${encodeURIComponent(here)}`);
      }
      return;
    }

    // 2) role gating (patient == client)
    if (requiredRole && !hasAnyRole(userRole, requiredRole)) {
      const target = fallbackPath || getDashboardPath(userRole ?? undefined) || "/dashboard/client";
      if (target !== here) router.replace(target);
      return;
    }

    // 3) route-level authorization
    if (typeof isAuthorizedForRoute === "function" && !isAuthorizedForRoute(here)) {
      const target = fallbackPath || getDashboardPath(userRole ?? undefined) || "/dashboard/client";
      if (target !== here) router.replace(target);
      return;
    }

    setIsChecking(false);
  }, [isLoading, authNow, requiredRole, userRole, fallbackPath, router, getDashboardPath, isAuthorizedForRoute]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
