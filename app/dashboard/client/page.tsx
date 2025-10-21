'use client'

import { ProtectedRoute } from "@/components/protected-route"
import { ActionCard } from "@/components/telemedicine/ActionCard"
import { Stethoscope, Activity, Heart } from "lucide-react"
import AppointmentCard from "@/components/telemedicine/appointmentCard"
import RecentBookings from "@/components/telemedicine/recentBookings"
import { Card } from "@/components/ui/card"
import ActivityContainer from "@/components/telemedicine/activity"

export const dashboardActions = [
  {
    id: 1,
    title: "Book a Doctor",
    subtitle: "Find and book specialist",
    icon: <Stethoscope className="w-[24px] h-[24px]" />,
    borderColor: "border-[#9946E1]",
    href: '/dashboard/consultants'
  },
  {
    id: 2,
    title: "Find A Hospital",
    subtitle: "Explore top hospitals",
    icon: <Activity className="w-[24px] h-[24px]" />,
    borderColor: "border-[#2970FF]",
    href: '/dashboard/hospitals'
  },
  {
    id: 3,
    title: "Contact Travel Agent",
    subtitle: "Get assistance with flight",
    icon: <Heart className="w-[24px] h-[24px]" />,
    borderColor: "border-[#34C759]",
    href: ''
  },
]

export default function ClientDashboard() {
  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-start gap-6 mt-5 px-5">
        {/* Left: Greeting & Actions */}
        <Card className="w-full lg:flex-1 p-5">
          <h2 className="text-primary font-light text-[18px]">Good Morning,</h2>
          <h1 className="font-extrabold text-[32px] sm:text-[40px] lg:text-[48px] text-text">
            Peter Parker
          </h1>
          <p className="text-[16px] sm:text-[18px] font-extralight mt-2 lg:w-[468px]">
            Stay on top of your health journey with <b>MedKonnect</b>. Let’s get
            you connected to top Nigerian care today!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {dashboardActions.map((action) => (
              <ActionCard
                key={action.id}
                icon={action.icon}
                title={action.title}
                subtitle={action.subtitle}
                borderColor={action.borderColor}
                link={action.href}
              />
            ))}
          </div>
        </Card>

        {/* Right: Appointments */}
        <Card className="w-full lg:w-[360px]">
            <div className="border-b px-5 py-4">
              <h2 className="text-[18px] font-semibold">Upcoming Appointments</h2>
            </div>
            <AppointmentCard />
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-5 px-5">
        <ActivityContainer />
        <RecentBookings />
      </div>
    </div>
  )
}
