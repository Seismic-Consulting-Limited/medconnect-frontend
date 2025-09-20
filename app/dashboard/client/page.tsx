"use client"

import type React from "react"
import {
  Calendar,
  FileText,
  Clock,
  Plus,
  Activity,
  Stethoscope,
  Plane,
  MessageSquare,
  Heart,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { useAuth } from "@/hooks/use-auth"

interface Appointment {
  id: string
  doctor_name: string
  hospital_name: string
  type: string
  appointment_date?: string
  status: string
}

interface RecentActivity {
  id: string
  title: string
  description: string
  created_at?: string
}

export default function ClientDashboard() {
  const { user } = useAuth()
  const { data, loading, error } = useDashboardData()

  return (
    <ProtectedRoute requiredRole={["client", "patient"]}>
      <DashboardLayout
        title={`Welcome back, ${user?.name || "Patient"}!`}
        subtitle="Manage your health journey and medical appointments"
        profileCompletion={data?.profile_completion || 75}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <DashboardSidebar />

          <main className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryCard
                title="Upcoming"
                value={loading ? "—" : String(data?.stats?.upcoming_appointments || 0)}
                subtitle="Appointments"
                icon={<Calendar className="h-4 w-4" />}
                accent="bg-blue-100 text-blue-700"
              />
              <SummaryCard
                title="Completed"
                value={loading ? "—" : String(data?.stats?.completed_appointments || 0)}
                subtitle="Appointments"
                icon={<Clock className="h-4 w-4" />}
                accent="bg-green-100 text-green-700"
              />
              <SummaryCard
                title="Medical"
                value={loading ? "—" : String(data?.stats?.medical_records || 0)}
                subtitle="Records"
                icon={<FileText className="h-4 w-4" />}
                accent="bg-purple-100 text-purple-700"
              />
              <SummaryCard
                title="Travel"
                value={loading ? "—" : String(data?.stats?.travel_bookings || 0)}
                subtitle="Bookings"
                icon={<Plane className="h-4 w-4" />}
                accent="bg-orange-100 text-orange-700"
              />
            </div>

            {/* Health Insights feature card */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="p-2 rounded-full bg-green-100">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Health Score</p>
                      <p className="text-2xl font-bold text-green-600">85%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Next Checkup</p>
                      <p className="text-sm text-muted-foreground">In 2 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <div className="p-2 rounded-full bg-purple-100">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Recent Tests</p>
                      <p className="text-sm text-muted-foreground">All normal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {loading ? (
                    <SkeletonAppointments />
                  ) : data?.appointments && data.appointments.length > 0 ? (
                    <div className="space-y-4">
                      {data.appointments.map((appointment: Appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                        >
                          <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                            <Stethoscope className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{appointment.doctor_name}</h4>
                            <p className="text-xs text-gray-500">{appointment.hospital_name}</p>
                            <p className="text-xs text-gray-500">{appointment.type}</p>
                            {appointment.appointment_date && (
                              <p className="text-[11px] text-gray-400 mt-1">
                                <Clock className="inline mr-1 h-3 w-3" />
                                {new Date(appointment.appointment_date).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <Badge variant="secondary" className="capitalize">
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyAppointments />
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {loading ? (
                    <SkeletonActivities />
                  ) : data?.activities && data.activities.length > 0 ? (
                    <div className="space-y-4">
                      {data.activities.map((activity: RecentActivity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                        >
                          <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                            <Activity className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{activity.title}</h4>
                            <p className="text-xs text-gray-500">{activity.description}</p>
                            {activity.created_at && (
                              <p className="text-[11px] text-gray-400 mt-1">
                                <Clock className="inline mr-1 h-3 w-3" />
                                {new Date(activity.created_at).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyActivities />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                    <Calendar className="h-6 w-6 text-primary" />
                    <span className="text-sm">Book Appointment</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="text-sm">View Records</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                    <Plane className="h-6 w-6 text-primary" />
                    <span className="text-sm">Plan Travel</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span className="text-sm">Contact Support</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>
            )}
          </main>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  accent,
}: {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  accent: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
          <div className={`h-9 w-9 rounded-full grid place-items-center ${accent}`}>{icon}</div>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-xs text-gray-500 mt-1">
            {title} {subtitle}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyAppointments() {
  return (
    <div className="grid place-items-center py-10">
      <div className="max-w-xs text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 grid place-items-center mb-3">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div className="font-medium">No Upcoming Appointments</div>
        <p className="text-xs text-gray-500 mt-1">Book your first appointment with a healthcare provider.</p>
        <Button variant="outline" className="mt-4 bg-transparent">
          <Plus className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </div>
    </div>
  )
}

function EmptyActivities() {
  return (
    <div className="grid place-items-center py-10">
      <div className="max-w-xs text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 grid place-items-center mb-3">
          <Activity className="h-6 w-6 text-primary" />
        </div>
        <div className="font-medium">No Recent Activity</div>
        <p className="text-xs text-gray-500 mt-1">Your health activities will appear here.</p>
      </div>
    </div>
  )
}

function SkeletonAppointments() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="animate-pulse flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
          <div className="h-7 w-7 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-2 w-20 bg-gray-200 rounded" />
          </div>
          <div className="h-5 w-16 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
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
  )
}
