"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlarmClock,
  Bell,
  Calendar,
  ChevronRight,
  CircleUserRound,
  HelpCircle,
  Home,
  Stethoscope,
  Users,
  Bed,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  CalendarPlus,
  FileText,
  Settings,
  MessageSquare,
  BarChart3,
  ActivityIcon,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  dashboardService,
  type HospitalDashboardData,
} from "@/lib/services/dashboard-service";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie, // Added Pie import
  Cell,
  Area,
  AreaChart,
} from "recharts";

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

function SidebarItem({
  label,
  icon: Icon,
  active = false,
  onClick,
}: {
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground font-medium shadow-sm"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  color = "primary",
}: {
  title: string;
  value: string;
  subtitle: string;
  trend?: "up" | "down";
  trendValue?: string;
  icon: any;
  color?: "primary" | "secondary" | "accent" | "destructive";
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary-foreground",
    accent: "bg-accent/10 text-accent-foreground",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground font-body">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-heading mb-1">{value}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-body">{subtitle}</p>
          {trend && trendValue && (
            <div
              className={`flex items-center gap-1 text-xs ${
                trend === "up" ? "text-primary" : "text-destructive"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function HospitalInfoCard({
  hospitalData,
}: {
  hospitalData: HospitalDashboardData;
}) {
  const getApprovalStatus = () => {
    if (hospitalData.is_approved === true) {
      return {
        label: "Approved",
        variant: "default" as const,
        icon: CheckCircle,
        color: "text-green-600",
      };
    } else if (hospitalData.is_approved === false) {
      return {
        label: "Pending Approval",
        variant: "secondary" as const,
        icon: Clock,
        color: "text-yellow-600",
      };
    }
    return {
      label: "Not Approved",
      variant: "destructive" as const,
      icon: XCircle,
      color: "text-red-600",
    };
  };

  const status = getApprovalStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Hospital Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg font-heading">
            {hospitalData.name || "Hospital Name"}
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            {hospitalData.description || "No description available"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <status.icon className={`h-4 w-4 ${status.color}`} />
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        {hospitalData.location && (
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-body">{hospitalData.location.address_1}</p>
              <p className="text-muted-foreground font-body">
                {hospitalData.location.state.name} State
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-body">
            {hospitalData.rating || 0}/5 Rating
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function FacilitiesCard({ facilities }: { facilities: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Medical Facilities</CardTitle>
      </CardHeader>
      <CardContent>
        {facilities && facilities.length > 0 ? (
          <div className="space-y-3">
            {facilities.slice(0, 6).map((facility) => (
              <div
                key={facility.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm font-body">
                    {facility.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-body">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
            {facilities.length > 6 && (
              <p className="text-xs text-muted-foreground text-center font-body">
                +{facilities.length - 6} more facilities
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <Stethoscope className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground font-body">
              No facilities listed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PatientFlowChart() {
  const data = [
    { name: "Mon", patients: 45, appointments: 38 },
    { name: "Tue", patients: 52, appointments: 44 },
    { name: "Wed", patients: 48, appointments: 41 },
    { name: "Thu", patients: 61, appointments: 55 },
    { name: "Fri", patients: 55, appointments: 48 },
    { name: "Sat", patients: 35, appointments: 30 },
    { name: "Sun", patients: 28, appointments: 25 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Patient Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="patients"
              stackId="1"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="appointments"
              stackId="1"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function DepartmentDistribution() {
  const data = [
    { name: "Cardiology", value: 30, color: "hsl(var(--chart-1))" },
    { name: "Neurology", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Orthopedics", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Pediatrics", value: 15, color: "hsl(var(--chart-4))" },
    { name: "Others", value: 10, color: "hsl(var(--chart-5))" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Department Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Tooltip />
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  const actions = [
    { label: "Add Doctor", icon: UserPlus, color: "primary" },
    { label: "Schedule Appointment", icon: CalendarPlus, color: "secondary" },
    { label: "Generate Report", icon: FileText, color: "accent" },
    { label: "View Analytics", icon: BarChart3, color: "primary" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs font-body">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonActivities() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 pb-4 border-b last:border-b-0"
        >
          <ActivityIcon className="h-8 w-8 rounded-full" />
          <div className="flex-1">
            <div className="h-4 w-3/4 mb-2 rounded-full bg-muted" />
            <div className="h-3 w-1/2 rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyActivities() {
  return (
    <div className="text-center py-8">
      <ActivityIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-sm text-muted-foreground">No recent activities</p>
    </div>
  );
}

function SkeletonDoctors() {
  return (
    <div className="divide-y">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[2fr_1fr_1fr_120px] px-2 py-3 items-center"
        >
          <div className="h-4 w-3/4 rounded-full bg-muted" />
          <div className="h-4 w-1/2 hidden sm:block rounded-full bg-muted" />
          <div className="h-6 w-16 hidden md:block rounded-full bg-muted" />
          <div className="h-8 w-12 ml-auto rounded-full bg-muted" />
        </div>
      ))}
    </div>
  );
}

function EmptyDoctors() {
  return (
    <div className="text-center py-8">
      <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-sm text-muted-foreground">No doctors found</p>
    </div>
  );
}

/** ---------- Component ---------- */
export default function HospitalDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hospitalData, setHospitalData] = useState<HospitalDashboardData>({});

  useEffect(() => {
    let off = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await dashboardService.getHospitalDashboard();
        if (off) return;
        setHospitalData(data);
      } catch (err: any) {
        if (err?.message?.includes("Authentication required")) {
          router.replace(
            `/user/auth/login?next=${encodeURIComponent("/dashboard/hospital")}`
          );
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
  }, [router]);

  const doctorCount = hospitalData.counts?.doctors || 0;
  const nurseCount = hospitalData.counts?.nurses || 0;
  const bedCount = hospitalData.counts?.beds || 0;
  const doctors = hospitalData.doctors || [];
  const activities = hospitalData.activities || [];
  const profileCompletion = hospitalData.profile_completion || 50;
  const facilities = hospitalData.facilities || [];

  const hasDoctors = useMemo(() => doctors.length > 0, [doctors]);
  const hasActivities = useMemo(() => activities.length > 0, [activities]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl font-heading">MedKonnect</span>
            <Badge variant="secondary" className="ml-2">
              Hospital
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2">
              <div className="h-6 w-6 rounded-full bg-white/20 grid place-items-center text-xs font-semibold">
                {Math.round(profileCompletion)}%
              </div>
              <span className="text-sm font-body">Profile Complete</span>
              <ChevronRight className="h-4 w-4 opacity-90" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="gap-2">
              <CircleUserRound className="h-5 w-5" />
              <span className="hidden sm:inline font-body">Account</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside className="bg-card border border-border rounded-xl p-4 hidden lg:block">
          <nav className="space-y-2">
            <SidebarItem label="Dashboard" icon={Home} active />
            <SidebarItem label="Doctors" icon={Stethoscope} />
            <SidebarItem label="Patients" icon={Users} />
            <SidebarItem label="Appointments" icon={Calendar} />
            <SidebarItem label="Analytics" icon={BarChart3} />
            <SidebarItem label="Messages" icon={MessageSquare} />
            <Separator className="my-4" />
            <SidebarItem label="Settings" icon={Settings} />
            <SidebarItem label="Help & Support" icon={HelpCircle} />
          </nav>
        </aside>

        <main className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-heading">
                {hospitalData.name || "Hospital Dashboard"}
              </h1>
              <p className="text-muted-foreground font-body">
                Monitor your hospital operations and performance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HospitalInfoCard hospitalData={hospitalData} />
            <FacilitiesCard facilities={facilities} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              title="Total Doctors"
              value={loading ? "—" : String(doctorCount)}
              subtitle="Active medical staff"
              trend="up"
              trendValue="+12%"
              icon={Stethoscope}
              color="primary"
            />
            <SummaryCard
              title="Total Nurses"
              value={loading ? "—" : String(nurseCount)}
              subtitle="Nursing staff"
              trend="up"
              trendValue="+8%"
              icon={Users}
              color="secondary"
            />
            <SummaryCard
              title="Available Beds"
              value={loading ? "—" : String(bedCount)}
              subtitle="Hospital capacity"
              trend="down"
              trendValue="-5%"
              icon={Bed}
              color="accent"
            />
            <SummaryCard
              title="Today's Appointments"
              value="47"
              subtitle="Scheduled for today"
              trend="up"
              trendValue="+15%"
              icon={Calendar}
              color="primary"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PatientFlowChart />
            <DepartmentDistribution />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading">
                    Recent Activities
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 pb-4 border-b last:border-b-0"
                      >
                        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                        <div className="flex-1">
                          <div className="h-4 w-3/4 mb-2 rounded-full bg-muted animate-pulse" />
                          <div className="h-3 w-1/2 rounded-full bg-muted animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : hasActivities ? (
                  <div className="space-y-4">
                    {activities.slice(0, 5).map((a) => (
                      <div
                        key={a.id}
                        className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                      >
                        <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                          <ActivityIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium font-body">
                            {a.title || "Update"}
                          </h4>
                          <p className="text-xs text-muted-foreground font-body">
                            {a.description || "—"}
                          </p>
                          {a.created_at && (
                            <p className="text-xs text-muted-foreground mt-1 font-body">
                              <AlarmClock className="inline mr-1 h-3 w-3" />
                              {new Date(a.created_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ActivityIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      No recent activities
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <QuickActions />
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">Medical Staff</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search doctors..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] px-4 py-3 text-sm font-medium text-muted-foreground border-b font-body">
                <div>Doctor Name</div>
                <div className="hidden sm:block">Specialty</div>
                <div className="hidden md:block">Status</div>
                <div className="hidden lg:block">Patients Today</div>
                <div className="text-right">Actions</div>
              </div>

              {loading ? (
                <div className="divide-y">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[2fr_1fr_1fr_120px] px-2 py-3 items-center"
                    >
                      <div className="h-4 w-3/4 rounded-full bg-muted animate-pulse" />
                      <div className="h-4 w-1/2 hidden sm:block rounded-full bg-muted animate-pulse" />
                      <div className="h-6 w-16 hidden md:block rounded-full bg-muted animate-pulse" />
                      <div className="h-8 w-12 ml-auto rounded-full bg-muted animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : hasDoctors ? (
                <div className="divide-y">
                  {doctors.slice(0, 8).map((d) => (
                    <div
                      key={d.id}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr_120px] px-4 py-4 items-center text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Stethoscope className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium font-body">
                            {d.name ||
                              d.full_name ||
                              [d.first_name, d.last_name]
                                .filter(Boolean)
                                .join(" ") ||
                              "—"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ID: {d.id.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block font-body">
                        {d.primary_specialty || "—"}
                      </div>
                      <div className="hidden md:block">
                        <Badge
                          variant={
                            (d.profile_status || "").toLowerCase() ===
                            "approved"
                              ? "default"
                              : (d.profile_status || "").toLowerCase() ===
                                "pending"
                              ? "secondary"
                              : (d.profile_status || "").toLowerCase() ===
                                "rejected"
                              ? "destructive"
                              : "outline"
                          }
                          className="capitalize"
                        >
                          {d.profile_status || "—"}
                        </Badge>
                      </div>
                      <div className="hidden lg:block font-body">12</div>
                      <div className="text-right">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    No doctors found
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-4 py-3 font-body">
              {error}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
