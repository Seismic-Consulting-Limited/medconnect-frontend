"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Calendar, MessageSquare, Stethoscope } from "lucide-react"

interface StatsCardsProps {
  stats: {
    savedHospitals: number
    upcomingAppointments: number
    openInquiries: number
    savedTreatments: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { savedHospitals, upcomingAppointments, openInquiries, savedTreatments } = stats

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Saved Hospitals</p>
              <p className="text-3xl font-bold">{savedHospitals}</p>
            </div>
            <div className="rounded-full bg-blue-50 p-3">
              <Building2 className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
              <p className="text-3xl font-bold">{upcomingAppointments}</p>
            </div>
            <div className="rounded-full bg-green-50 p-3">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Open Inquiries</p>
              <p className="text-3xl font-bold">{openInquiries}</p>
            </div>
            <div className="rounded-full bg-amber-50 p-3">
              <MessageSquare className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Saved Treatments</p>
              <p className="text-3xl font-bold">{savedTreatments}</p>
            </div>
            <div className="rounded-full bg-purple-50 p-3">
              <Stethoscope className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
