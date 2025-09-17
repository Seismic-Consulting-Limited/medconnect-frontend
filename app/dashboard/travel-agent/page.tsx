"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Bell,
  Calendar,
  ChevronRight,
  CircleUserRound,
  HelpCircle,
  Home,
  Plane,
  Users,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  CalendarPlus,
  Settings,
  MessageSquare,
  BarChart3,
  ActivityIcon,
  Star,
  Package,
  DollarSign,
  Globe,
  MapPin,
  Phone,
  ExternalLink,
  Building,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { dashboardService, type TravelAgentDashboardData } from "@/lib/services/dashboard-service"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from "recharts"

/** ---------- Types ---------- */
type TravelAgentData = {
  stats?: {
    active_bookings?: number
    completed_trips?: number
    clients?: number
    revenue?: number
  }
  bookings?: any[]
  activities?: any[]
  profile_completion?: number
}

function SidebarItem({
  label,
  icon: Icon,
  active = false,
  onClick,
}: {
  label: string
  icon: any
  active?: boolean
  onClick?: () => void
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
  )
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
  title: string
  value: string
  subtitle: string
  trend?: "up" | "down"
  trendValue?: string
  icon: any
  color?: "primary" | "secondary" | "accent" | "destructive"
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary-foreground",
    accent: "bg-accent/10 text-accent-foreground",
    destructive: "bg-destructive/10 text-destructive",
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground font-body">{title}</CardTitle>
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
            <div className={`flex items-center gap-1 text-xs ${trend === "up" ? "text-primary" : "text-destructive"}`}>
              {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function BookingTrendsChart() {
  const data = [
    { name: "Jan", bookings: 12, revenue: 45000 },
    { name: "Feb", bookings: 19, revenue: 68000 },
    { name: "Mar", bookings: 15, revenue: 52000 },
    { name: "Apr", bookings: 25, revenue: 89000 },
    { name: "May", bookings: 22, revenue: 78000 },
    { name: "Jun", bookings: 30, revenue: 105000 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Booking Trends</CardTitle>
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
              dataKey="bookings"
              stackId="1"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function DestinationDistribution() {
  const data = [
    { name: "Lagos", value: 35, color: "hsl(var(--chart-1))" },
    { name: "Abuja", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Port Harcourt", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Ibadan", value: 12, color: "hsl(var(--chart-4))" },
    { name: "Others", value: 8, color: "hsl(var(--chart-5))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Popular Destinations</CardTitle>
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
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RevenueChart() {
  const data = [
    { name: "Jan", revenue: 45000 },
    { name: "Feb", revenue: 68000 },
    { name: "Mar", revenue: 52000 },
    { name: "Apr", revenue: 89000 },
    { name: "May", revenue: 78000 },
    { name: "Jun", revenue: 105000 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    { label: "New Booking", icon: CalendarPlus, color: "primary" },
    { label: "Add Client", icon: UserPlus, color: "secondary" },
    { label: "Create Package", icon: Package, color: "accent" },
    { label: "View Reports", icon: BarChart3, color: "primary" },
  ]

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
  )
}

/** ---------- Component ---------- */
export default function TravelAgentDashboard() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [agentData, setAgentData] = useState<TravelAgentDashboardData>({})

  useEffect(() => {
    let off = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await dashboardService.getTravelAgentDashboard()
        if (off) return
        setAgentData(data)
      } catch (err: any) {
        if (err?.message?.includes("Authentication required")) {
          router.replace(`/user/auth/login?next=${encodeURIComponent("/dashboard/travel-agent")}`)
          return
        }
        setError(err?.message || "Could not load dashboard.")
      } finally {
        if (!off) setLoading(false)
      }
    }
    load()
    return () => {
      off = true
    }
  }, [router])

  const activeBookings = 12 // Mock data since API doesn't provide this yet
  const completedTrips = agentData.years_of_experience ? agentData.years_of_experience * 10 : 45
  const totalClients = 28 // Mock data since API doesn't provide this yet
  const totalRevenue = 125000 // Mock data since API doesn't provide this yet
  const profileCompletion = 85

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
              Travel Agent
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
            <SidebarItem label="Bookings" icon={Calendar} />
            <SidebarItem label="Clients" icon={Users} />
            <SidebarItem label="Packages" icon={Package} />
            <SidebarItem label="Destinations" icon={Globe} />
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
                {loading ? "Loading..." : agentData.name || "Travel Agent Dashboard"}
              </h1>
              <p className="text-muted-foreground font-body">Manage your medical tourism bookings and clients</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </div>
          </div>

          {!loading && agentData.name && (
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Agency Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Agency Details</h3>
                      <p className="font-medium">{agentData.name}</p>
                      <p className="text-sm text-muted-foreground">{agentData.email}</p>
                      {agentData.description && (
                        <p className="text-sm text-muted-foreground mt-2">{agentData.description}</p>
                      )}
                    </div>
                    {agentData.rating !== undefined && (
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{agentData.rating}/5.0</span>
                        <span className="text-xs text-muted-foreground">Agency Rating</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Contact Information</h3>
                      {agentData.phone_number_1 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4" />
                          <span>{agentData.phone_number_1}</span>
                        </div>
                      )}
                      {agentData.website_url && (
                        <div className="flex items-center gap-2 text-sm mt-1">
                          <ExternalLink className="h-4 w-4" />
                          <a
                            href={agentData.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {agentData.website_url}
                          </a>
                        </div>
                      )}
                    </div>
                    {agentData.location && (
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-1">Location</h3>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <div>
                            <p>{agentData.location.address_1}</p>
                            <p className="text-muted-foreground">{agentData.location.state.name} State</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Business Information</h3>
                      {agentData.years_of_experience && (
                        <p className="text-sm">{agentData.years_of_experience} years of experience</p>
                      )}
                      {agentData.year_founded && (
                        <p className="text-sm text-muted-foreground">Founded in {agentData.year_founded}</p>
                      )}
                      {agentData.registration_number && (
                        <p className="text-sm text-muted-foreground">Reg: {agentData.registration_number}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Destinations:</span>
                        <Badge variant="outline">{agentData.destinations?.length || 0}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Hospital Partners:</span>
                        <Badge variant="outline">{agentData.hospital_partners?.length || 0}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Services:</span>
                        <Badge variant="outline">{agentData.services?.length || 0}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              title="Active Bookings"
              value={loading ? "—" : String(activeBookings)}
              subtitle="Currently processing"
              trend="up"
              trendValue="+18%"
              icon={Calendar}
              color="primary"
            />
            <SummaryCard
              title="Completed Trips"
              value={loading ? "—" : String(completedTrips)}
              subtitle="Successfully organized"
              trend="up"
              trendValue="+12%"
              icon={Plane}
              color="secondary"
            />
            <SummaryCard
              title="Total Clients"
              value={loading ? "—" : String(totalClients)}
              subtitle="Active relationships"
              trend="up"
              trendValue="+8%"
              icon={Users}
              color="accent"
            />
            <SummaryCard
              title="Revenue"
              value={loading ? "—" : `$${totalRevenue.toLocaleString()}`}
              subtitle="This month"
              trend="up"
              trendValue="+25%"
              icon={DollarSign}
              color="primary"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BookingTrendsChart />
            <DestinationDistribution />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <QuickActions />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading">Recent Activities</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                        <div className="flex-1">
                          <div className="h-4 w-3/4 mb-2 rounded-full bg-muted animate-pulse" />
                          <div className="h-3 w-1/2 rounded-full bg-muted animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ActivityIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">No recent activities</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Activities will appear here as you manage bookings
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Top Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Cardiac Surgery Package", bookings: 12, rating: 4.8 },
                    { name: "Orthopedic Treatment", bookings: 8, rating: 4.9 },
                    { name: "Cancer Treatment", bookings: 6, rating: 4.7 },
                  ].map((pkg, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm font-body">{pkg.name}</h4>
                        <p className="text-xs text-muted-foreground font-body">{pkg.bookings} bookings</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-body">{pkg.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-4 py-3 font-body">
              {error}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
