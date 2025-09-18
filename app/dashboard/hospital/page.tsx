"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, ChevronDown, ChevronRight, Plus, Calendar, Stethoscope, MessageSquare, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dashboardService, type HospitalDashboardData } from "@/lib/services/dashboard-service"
import { VerificationStepOne } from "@/components/verification/verification-step-one"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

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
      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
        active ? "bg-primary text-white font-medium" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </div>
  )
}

export default function HospitalDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hospitalData, setHospitalData] = useState<HospitalDashboardData>({})
  const [showVerification, setShowVerification] = useState(false)
  const [completionRate, setCompletionRate] = useState<number | null>(null)

  useEffect(() => {
    let off = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await dashboardService.getHospitalDashboard()
        if (off) return
        setHospitalData(data)

        try {
          const completionData = await dashboardService.getHospitalProfileCompletionRate()
          console.log("[v0] Profile completion data:", completionData)
          setCompletionRate(completionData.completion_rate || 0)
        } catch (err) {
          console.log("[v0] Could not fetch completion rate:", err)
          setCompletionRate(0)
        }
      } catch (err: any) {
        if (err?.message?.includes("Authentication required")) {
          router.replace(`/user/auth/login?next=${encodeURIComponent("/dashboard/hospital")}`)
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

  const doctorCount = hospitalData.counts?.doctors || 0
  const messageCount = 0 // Mock data as shown in screenshot

  if (showVerification) {
    return (
      <VerificationStepOne
        onNext={() => {
          // Handle next step
          console.log("Moving to step 2")
        }}
        onBack={() => setShowVerification(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-end ml-0 lg:ml-64">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowVerification(true)}
              className="flex items-center gap-3 rounded-full bg-primary hover:bg-primary/90 text-white px-4 py-2"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  Your Profile is {completionRate !== null ? `${completionRate}%` : "...%"} complete
                </span>
                <span className="text-xs opacity-80">Click here to complete verification</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" className="gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <span>Account</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-4 lg:p-6 ml-0 lg:ml-64 min-h-screen">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Consultants</h3>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900">{doctorCount}</div>
                  <p className="text-sm text-gray-500 mt-1">Total number of consultants</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Messages</h3>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900">{messageCount}</div>
                  <p className="text-sm text-gray-500 mt-1">Total number of contact messages received from clients</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <CardTitle className="text-lg font-medium">Activities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                    <div className="h-8 w-8 rounded-full border-2 border-purple-200 flex items-center justify-center">
                      <div className="h-4 w-4 bg-purple-100 rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">No Recent Activity</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                    Your hospital activity will appear here once there are payments, reviews, or updates.
                  </p>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Plus className="h-4 w-4" />
                    Add First Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-5 w-5" />
                  <CardTitle className="text-lg font-medium">Consultants (45)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 pb-4 text-sm font-medium text-gray-500 border-b">
                  <div>Doctor Name</div>
                  <div>Primary Specialty</div>
                  <div>Profile Status</div>
                  <div>Action</div>
                </div>

                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto mb-4">
                    <img
                      src="/doctor-with-stethoscope-illustration.png"
                      alt="Doctor illustration"
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">No Doctors Added Yet</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                    You haven't added any doctors to your hospital profile. Add doctors so patients can view and book
                    them.
                  </p>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Plus className="h-4 w-4" />
                    Add First Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {error && (
            <div className="mt-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
              {error}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
