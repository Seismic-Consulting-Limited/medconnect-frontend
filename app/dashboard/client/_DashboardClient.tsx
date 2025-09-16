"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity, AlarmClock, Bell, Bed, CheckCircle2, ChevronRight, CircleUserRound, HelpCircle,
  Home, Plus, Stethoscope, Users2
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { apiRequest as sharedApiRequest } from "@/lib/utils/api-request";
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants";

/** ---------- Types ---------- */
type DashboardDoctor = {
  id: string;
  name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  primary_specialty?: string;
  profile_status?: string;
};

type DashboardActivity = {
  id: string;
  title?: string;
  description?: string;
  created_at?: string;
};

type DashboardResponse = {
  data?: {
    counts?: { doctors?: number; nurses?: number; beds?: number };
    doctors?: DashboardDoctor[];
    activities?: DashboardActivity[];
    profile_completion?: number;
  };
};

/** ---------- Helpers ---------- */
const getAPIPath = () =>
  (API_ENDPOINTS as any).HOSPITALS_DASHBOARD ||
  (API_ENDPOINTS as any)?.META?.HOSPITALS_DASHBOARD ||
  "/v1/hospitals/dashboard";

const safeNumber = (n: unknown, fb = 0) => (typeof n === "number" && Number.isFinite(n) ? n : fb);

const displayName = (d: DashboardDoctor) =>
  d.name || d.full_name || [d.first_name, d.last_name].filter(Boolean).join(" ") || "—";

const statusVariant = (s?: string) => {
  switch ((s || "").toLowerCase()) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

/** Use token if provided and always include cookies for backends that auth via session cookie */
async function apiRequestAuthorized<T>(token: string, url: string, init?: RequestInit): Promise<T> {
  // Prefer project helper to keep interceptors
  if (typeof sharedApiRequest === "function") {
    return sharedApiRequest<T>(url, {
      ...(init || {}),
      method: (init?.method as any) || HTTP_METHODS.GET,
      headers: {
        ...(init?.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // ensure cookies are sent too (session-based auth compatibility)
      credentials: "include" as RequestCredentials,
    });
  }

  const res = await fetch(url, {
    ...(init || {}),
    method: init?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include", // <-- important
  });

  if (res.status === 401) {
    const err: any = new Error("UNAUTHORIZED");
    err.__status = 401;
    throw err;
  }
  if (!res.ok) {
    throw new Error(`Request failed ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

/** ---------- Component ---------- */
export default function DashboardClient({ token }: { token: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [doctorCount, setDoctorCount] = useState(0);
  const [nurseCount, setNurseCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [doctors, setDoctors] = useState<DashboardDoctor[]>([]);
  const [activities, setActivities] = useState<DashboardActivity[]>([]);
  const [profileCompletion, setProfileCompletion] = useState(50);

  useEffect(() => {
    let off = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = getAPIPath();
        const payload = await apiRequestAuthorized<DashboardResponse>(token, url, { method: HTTP_METHODS.GET });
        if (off) return;

        const data = payload?.data ?? {};
        const counts = (data as any).counts ?? {};
        setDoctorCount(safeNumber(counts.doctors));
        setNurseCount(safeNumber(counts.nurses));
        setBedCount(safeNumber(counts.beds));
        setDoctors(Array.isArray((data as any).doctors) ? ((data as any).doctors as DashboardDoctor[]) : []);
        setActivities(Array.isArray((data as any).activities) ? ((data as any).activities as DashboardActivity[]) : []);
        setProfileCompletion(safeNumber((data as any).profile_completion, 50));
      } catch (err: any) {
        if (err?.__status === 401 || err?.message === "UNAUTHORIZED") {
          router.replace(`/login?next=${encodeURIComponent("/hospitals/dashboard")}`);
          return;
        }
        setError(err?.message || "Could not load dashboard.");
      } finally {
        if (!off) setLoading(false);
      }
    };
    load();
    return () => {
      off = true;
    };
  }, [router, token]);

  const hasDoctors = useMemo(() => doctors.length > 0, [doctors]);
  const hasActivities = useMemo(() => activities.length > 0, [activities]);

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
              <Home className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold">MedKonnect</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white px-3 py-1.5">
              <div className="h-6 w-6 rounded-full bg-white/20 grid place-items-center text-xs font-semibold">
                {Math.round(profileCompletion)}%
              </div>
              <span className="text-sm">Profile Completion</span>
              <ChevronRight className="h-4 w-4 opacity-90" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full"><Bell className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><HelpCircle className="h-5 w-5" /></Button>
            <Button variant="ghost" className="gap-2">
              <CircleUserRound className="h-5 w-5" /><span className="hidden sm:inline">Account</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <aside className="bg-white border rounded-xl p-3 hidden lg:block">
          <nav className="space-y-1">
            <SidebarItem label="Dashboard" active />
            <SidebarItem label="Doctors" />
            <SidebarItem label="Treatments" />
            <SidebarItem label="Services" />
            <SidebarItem label="Messages" />
            <Separator className="my-3" />
            <SidebarItem label="Settings" />
            <SidebarItem label="Help & Support" />
          </nav>
        </aside>

        <main className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard title="Doctors" value={loading ? "—" : String(doctorCount)} subtitle="Total number of doctors" />
            <SummaryCard title="Nurses" value={loading ? "—" : String(nurseCount)} subtitle="Total number of nurses" />
            <SummaryCard title="Beds" value={loading ? "—" : String(bedCount)} subtitle="Total number of beds" />
          </div>

          {/* Activities + Doctors tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3"><CardTitle>Activities</CardTitle></CardHeader>
              <CardContent className="pt-0">
                {loading ? <SkeletonActivities /> : hasActivities ? (
                  <div className="space-y-4">
                    {activities.slice(0, 4).map((a) => (
                      <div key={a.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                        <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full"><Activity className="h-4 w-4 text-blue-700" /></div>
                        <div>
                          <h4 className="text-sm font-medium">{a.title || "Update"}</h4>
                          <p className="text-xs text-gray-500">{a.description || "—"}</p>
                          {a.created_at && (
                            <p className="text-[11px] text-gray-400 mt-1">
                              <AlarmClock className="inline mr-1 h-3 w-3" />
                              {new Date(a.created_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <EmptyActivities />}
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-3"><CardTitle>Doctors</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-[2fr_1fr_1fr_120px] px-2 py-2 text-xs text-gray-500 border-b">
                  <div>Doctor Name</div>
                  <div className="hidden sm:block">Primary Specialty</div>
                  <div className="hidden md:block">Profile Status</div>
                  <div className="text-right">Action</div>
                </div>

                {loading ? <SkeletonDoctors /> : hasDoctors ? (
                  <div className="divide-y">
                    {doctors.slice(0, 5).map((d) => (
                      <div key={d.id} className="grid grid-cols-[2fr_1fr_1fr_120px] px-2 py-3 items-center text-sm">
                        <div className="truncate">{displayName(d)}</div>
                        <div className="hidden sm:block truncate">{d.primary_specialty || "—"}</div>
                        <div className="hidden md:block">
                          <Badge variant={statusVariant(d.profile_status)} className="capitalize">
                            {d.profile_status || "—"}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <Button size="sm" variant="outline" className="h-8">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <EmptyDoctors />}
              </CardContent>
            </Card>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>
          )}
        </main>
      </div>
    </div>
  );
}

/** ---------- UI bits ---------- */
function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <Link
      href="#"
      className={[
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
        active ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-50 text-gray-700",
      ].join(" ")}
    >
      <span>{label}</span>
    </Link>
  );
}

function SummaryCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  const icon = title === "Doctors" ? <Stethoscope className="h-4 w-4" /> : title === "Nurses" ? <Users2 className="h-4 w-4" /> : <Bed className="h-4 w-4" />;
  const accent =
    title === "Doctors" ? "bg-purple-100 text-purple-700" : title === "Nurses" ? "bg-cyan-100 text-cyan-700" : "bg-neutral-900 text-neutral-100";
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
          <div className={`h-9 w-9 rounded-full grid place-items-center ${accent}`}>{icon}</div>
        </div>
        <div className="mt-4">
          <div className="text-4xl font-semibold">{value}</div>
          <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyActivities() {
  return (
    <div className="grid place-items-center py-10">
      <div className="max-w-xs text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-purple-50 grid place-items-center mb-3">
          <CheckCircle2 className="h-6 w-6 text-purple-600" />
        </div>
        <div className="font-medium">No Recent Activity</div>
        <p className="text-xs text-gray-500 mt-1">
          Your hospital activity will appear here once there are payments, reviews, or updates.
        </p>
        <Button variant="outline" className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Add First Doctor
        </Button>
      </div>
    </div>
  );
}

function EmptyDoctors() {
  return (
    <div className="grid place-items-center py-10">
      <div className="max-w-md text-center">
        <div className="mx-auto w-24 h-24 mb-3">
          <div className="w-full h-full grid place-items-center text-5xl">🩺</div>
          {/* swap with your SVG later */}
        </div>
        <div className="font-medium">No Doctors Added Yet</div>
        <p className="text-xs text-gray-500 mt-1">
          You haven&apos;t added any doctors to your hospital profile. Add doctors so patients can view and book them.
        </p>
        <Button variant="outline" className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Add First Doctor
        </Button>
      </div>
    </div>
  );
}

function SkeletonActivities() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
          <div className="h-7 w-7 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-64 bg-gray-200 rounded" />
            <div className="h-2 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonDoctors() {
  return (
    <div className="divide-y">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-[2fr_1fr_1fr_120px] px-2 py-3 items-center">
          <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="hidden sm:block h-3 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="hidden md:block h-6 bg-gray-200 rounded w-20 animate-pulse" />
          <div className="flex justify-end">
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
