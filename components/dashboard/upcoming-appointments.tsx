"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin } from "lucide-react"

interface Appointment {
  id: string
  title: string
  doctorName: string
  specialty: string
  hospitalName?: string
  date: string
  time: string
  type: "virtual" | "in-person"
  status: "confirmed" | "pending" | "completed"
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled consultations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">You don't have any upcoming appointments</p>
            <Button>Schedule Consultation</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled consultations</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{appointment.title}</h3>
                  <p className="text-sm text-gray-500">
                    Dr. {appointment.doctorName} - {appointment.specialty}
                  </p>
                  {appointment.hospitalName && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{appointment.hospitalName}</span>
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    className={`
                      ${
                        appointment.type === "virtual"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                      }
                    `}
                  >
                    {appointment.type === "virtual" ? (
                      <span className="flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        Virtual
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        In-Person
                      </span>
                    )}
                  </Badge>

                  {appointment.type === "virtual" ? (
                    <Button size="sm">Join Call</Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
