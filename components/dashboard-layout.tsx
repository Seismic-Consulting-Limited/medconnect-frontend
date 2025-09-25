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

  // Pick the correct endpoint per role
  const completionEndpoint = useMemo(() => {
    if (normalizedRole === "hospital") {
      return API_ENDPOINTS.META.HOSPITAL_PROFILE_COMPLETION_RATE;
    }
    if (normalizedRole === "travel_agent") {
      return API_ENDPOINTS.META.TRAVEL_AGENT_PROFILE_COMPLETION_RATE;
    }
    return null;
  }, [normalizedRole]);

  useEffect(() => {
    let cancelled = false;

    const fetchProfileCompletion = async () => {
      if (!isAuthenticated || !shouldFetchProfileCompletion || !completionEndpoint) {
        // Client/patient: keep the value passed in (or default)
        return;
      }

      setLoadingPC(true);
      try {
        const res: any = await apiRequest(
          completionEndpoint,
          { method: HTTP_METHODS.GET },
          {
            auth: true,
            getToken: () => authService.getToken(),
          },
        );

        if (cancelled) return;

        // Accept several shapes: number or object with completion value
        const value =
          typeof res === "number"
            ? res
            : (res?.data?.completion_rate ??
               res?.completion_rate ??
               res?.rate ??
               res?.percentage);

        if (typeof value === "number" && Number.isFinite(value)) {
          setProfileCompletion(Math.max(0, Math.min(100, value)));
        }
      } catch (err: any) {
        // Ignore 403 (role not permitted or endpoint not applicable)
        if (err?.status !== 403) {
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
  }, [isAuthenticated, shouldFetchProfileCompletion, completionEndpoint]);

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

            {/* Profile completion badge (always shown; value fetched for hospital/agent only) */}
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
              <span className="font-medium">Profile completion</span>
              <span className="tabular-nums">
                {loadingPC ? "…" : `${Math.round(profileCompletion)}%`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Page body (you pass sidebar + main as children) */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

export default DashboardLayout;
