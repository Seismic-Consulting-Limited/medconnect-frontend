// hooks/use-dashboard-data.ts
"use client";

import { useState, useEffect } from "react";
import { dashboardService } from "@/lib/services/dashboard-service";
import { useAuth } from "./use-auth";

export function useDashboardData() {
  const { user, isAuthenticated, userRole, logout, refreshAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const normalizedRole = userRole?.toLowerCase();

  useEffect(() => {
    let cancelled = false;

    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    const fetchOnce = async () => {
      switch (normalizedRole) {
        case "hospital":
          return dashboardService.getHospitalDashboard();
        case "travel_agent":
        case "travel-agent":
          return dashboardService.getTravelAgentDashboard();
        case "client":
        case "patient":
        default:
          return dashboardService.getClientDashboard();
      }
    };

    const shouldTreatAsAuthError = (err: unknown) => {
      const msg = (err instanceof Error ? err.message : String(err || ""))?.toLowerCase?.() || "";
      const status = (err as any)?.status as number | undefined;
      return (
        status === 401 ||
        status === 403 ||
        msg.includes("authentication required") ||
        msg.includes("unauthorized") ||
        msg.includes("forbidden") ||
        msg.includes("user not found") ||
        msg.includes("account not found")
      );
    };

    const load = async () => {
      setLoading(true);
      setError(null);

      let didRetry = false;

      try {
        const result = await fetchOnce();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!didRetry && shouldTreatAsAuthError(err)) {
          didRetry = true;
          try {
            // Safe refresh: no-ops if backend doesn't support it
            await refreshAuth();
            const result = await fetchOnce();
            if (!cancelled) setData(result);
            return;
          } catch (err2) {
            if (!shouldTreatAsAuthError(err2)) {
              if (!cancelled) setError(err2 instanceof Error ? err2.message : "Failed to load dashboard data");
              if (!cancelled) setLoading(false);
              return;
            }
          }
        }

        // Final handling: real auth failure → logout and let guards handle redirect
        if (shouldTreatAsAuthError(err)) {
          await logout();
          if (!cancelled) setLoading(false);
          return;
        }

        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [user, isAuthenticated, normalizedRole, logout, refreshAuth]);

  const refetch = async () => {
    if (!isAuthenticated || !user) return;

    setLoading(true);
    setError(null);

    const fetchOnce = async () => {
      switch (normalizedRole) {
        case "hospital":
          return dashboardService.getHospitalDashboard();
        case "travel_agent":
        case "travel-agent":
          return dashboardService.getTravelAgentDashboard();
        case "client":
        case "patient":
        default:
          return dashboardService.getClientDashboard();
      }
    };

    const shouldTreatAsAuthError = (err: unknown) => {
      const msg = (err instanceof Error ? err.message : String(err || ""))?.toLowerCase?.() || "";
      const status = (err as any)?.status as number | undefined;
      return (
        status === 401 ||
        status === 403 ||
        msg.includes("authentication required") ||
        msg.includes("unauthorized") ||
        msg.includes("forbidden") ||
        msg.includes("user not found") ||
        msg.includes("account not found")
      );
    };

    let didRetry = false;

    try {
      const result = await fetchOnce();
      setData(result);
    } catch (err) {
      if (!didRetry && shouldTreatAsAuthError(err)) {
        didRetry = true;
        try {
          await refreshAuth(); // safe no-op if unsupported
          const result = await fetchOnce();
          setData(result);
          return;
        } catch (err2) {
          if (shouldTreatAsAuthError(err2)) {
            await logout();
            return;
          }
          setError(err2 instanceof Error ? err2.message : "Failed to load dashboard data");
        }
      } else {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch,
    userRole: normalizedRole,
  };
}
