// components/dashboard-layout.tsx
"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/utils/api-request";
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants";
import { authService } from "@/lib/auth";

type DashboardLayoutProps = {
  title: string;
  subtitle?: string;
  /** Optional initial value; will be overridden for hospital/travel_agent when the endpoint returns */
  profileCompletion?: number;
  children: React.ReactNode;
};

export function DashboardLayout({
  title,
  subtitle,
  profileCompletion: initialCompletion = 75,
  children,
}: DashboardLayoutProps) {
  const { isAuthenticated, userRole } = useAuth();
  const [profileCompletion, setProfileCompletion] = useState<number>(initialCompletion);
  const [loadingPC, setLoadingPC] = useState<boolean>(false);

  const normalizedRole = useMemo(
    () => (userRole ?? "").toLowerCase().replace(/\s+/g, "_"),
    [userRole],
  );

  const shouldFetchProfileCompletion =
    normalizedRole === "hospital" || normalizedRole === "travel_agent";

  useEffect(() => {
    let cancelled = false;

    const fetchProfileCompletion = async () => {
      if (!isAuthenticated || !shouldFetchProfileCompletion) {
        // Client/patient: keep whatever was passed (or default)
        return;
      }

      setLoadingPC(true);
      try {
        // NOTE: your constants already pointed to hospitals endpoint in logs.
        // If your backend uses a single endpoint for both roles, keep this.
        // If you later split them, switch by role here.
        const res: any = await apiRequest(
          API_ENDPOINTS.META.PROFILE_COMPLETION_RATE,
          { method: HTTP_METHODS.GET },
          {
            auth: true,
            getToken: () => authService.getToken(),
          },
        );

        if (cancelled) return;

        // Accept multiple possible shapes: number or object
        const value =
          typeof res === "number"
            ? res
            : (res?.data?.completion_rate ??
               res?.completion_rate ??
               res?.rate ??
               res?.percentage);

        if (typeof value === "number" && !Number.isNaN(value)) {
          setProfileCompletion(Math.max(0, Math.min(100, value)));
        }
      } catch (err: any) {
        // Ignore 403 (not applicable for this role or permissions)
        if (err?.status !== 403) {
          // Log other errors quietly; keep existing completion value
          console.error("Failed to fetch profile completion rate:", err);
        }
      } finally {
        if (!cancelled) setLoadingPC(false);
      }
    };

    fetchProfileCompletion();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, shouldFetchProfileCompletion]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {/* Profile completion badge (shown for all roles, but only fetched for hospital/travel_agent) */}
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
              <span className="font-medium">Profile completion</span>
              <span className="tabular-nums">
                {loadingPC ? "…" : `${Math.round(profileCompletion)}%`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Page body (you pass sidebar + main from the children) */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

export default DashboardLayout;
