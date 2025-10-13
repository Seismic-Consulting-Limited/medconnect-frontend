"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Card } from "../ui/card"

type Activity = {
  id: string
  title: string
  category: string
  date: string
}

const activities: Activity[] = [
  {
    id: "1",
    title: "Payment of NGN 120,000 for Dr. Bello",
    category: "Telemedicine",
    date: "17th AUG, 2025",
  },
  {
    id: "2",
    title: "Consultation with Dr. Stephen Strange",
    category: "Cardiology",
    date: "15th AUG, 2025",
  },
  {
    id: "3",
    title: "Prescription renewal for Ibuprofen",
    category: "Pharmacy",
    date: "12th AUG, 2025",
  },
]

const ActivityCard = () => {
  return (
    <Card className="w-full lg:w-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between py-[12px] px-[16px] h-[61px] border-b">
        <div className="flex items-center gap-3 text-text">
          <Calendar className="w-[24px] h-[24px]" />
          <h2 className="text-[18px] font-semibold">Activity</h2>
        </div>
        <Link
          href="#"
          className="flex items-center gap-2 text-[14px] text-text hover:underline"
        >
          View All <ArrowRight className="w-[18px] h-[18px]" />
        </Link>
      </div>

      {/* Activity List */}
      <div className="divide-y">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="py-[12px] space-y-1 px-[16px] h-[100px] flex flex-col justify-center hover:bg-[#FAFAFA] transition"
          >
            <h3 className="text-[15px] font-light text-text leading-snug">
              {activity.title}
            </h3>
            <small className="text-[14px] text-text">{activity.category}</small>
            <p className="text-[13px] font-extralight text-[#717171]">
              {activity.date}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default ActivityCard
