"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Plus } from "lucide-react"
import { Card } from "../ui/card"
import ActivityCard from "./activityCard"
import { Button } from "../ui/button"

type Activity = {
  id: string
  title: string
  category: string
  date: string
}

const activities: Activity[] = [
  // {
  //   id: "1",
  //   title: "Payment of NGN 120,000 for Dr. Bello",
  //   category: "Telemedicine",
  //   date: "17th AUG, 2025",
  // },
  // {
  //   id: "2",
  //   title: "Consultation with Dr. Stephen Strange",
  //   category: "Cardiology",
  //   date: "15th AUG, 2025",
  // },
  // {
  //   id: "3",
  //   title: "Prescription renewal for Ibuprofen",
  //   category: "Pharmacy",
  //   date: "12th AUG, 2025",
  // },
]

const ActivityContainer = () => {
  return (
    <Card className="w-full lg:w-1/3">
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
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
        {
          activities.length === 0 && (
            <div className="text-center py-20 space-y-4">
                <h2 className='text-[18px] font-semibold'>No Recent Activity</h2>
                <p className="w-[278px] mx-auto text-[14px] font-light text-[#717171]">Your hospital activity will appear here once there are payments, reviews, or updates.</p>
                <Button variant={'outline'} className="text-[14px] font-light"><Plus /> Add First Consultant</Button>
            </div>
          )
        }
      </div>
    </Card>
  )
}

export default ActivityContainer
