'use client'
import React from 'react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Banknote, Calendar, Calendar1, Clock, CloudUpload, Video } from 'lucide-react'
import BookingInfoRow from './InfoRow'
import ActionGroup from './ActionGroup' // ✅ import the reusable action group
import { getStatusStyle } from '@/utils/statusStyle'

interface ScheduleSummaryProps {
  active: boolean
  type: string
  compact?: boolean // ✅ new prop
  label?: string
}

const ScheduleSummary = ({ active, type, compact = false, label }: ScheduleSummaryProps) => {
  return (
    <Sheet>
      <SheetTrigger className="w-full">
       {compact ? (
          // ✅ Compact version (used inside table)
          <Button
            className={`px-[14px] h-[50px] w-full py-[8px] text-[14px] font-light rounded-[12px] ${
              active
                ? "bg-[#7E22CE] hover:bg-[#6B1CBF] text-white"
                : "border border-[#313131] text-[#313131] bg-transparent hover:bg-[#F5EBFF]"
            }`}
          >
            {active ? "Join Call" : label}
          </Button>
        ) : (
          // ✅ Default full-width version
          <Button
            className={`rounded-[16px] w-full text-[16px] h-[58px] font-light ${
              active ? "bg-[#7E22CE] hover:bg-[#6B1CBF]" : "bg-[#EEE8F9] text-[#B173E8]"
            }`}
          >
            Next{" "}
            <span className={`${active ? "text-white" : "text-[#B173E8]"}`}>
              | View Booking Summary
            </span>
          </Button>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="!max-w-none !w-[508px] bg-white px-6 py-4 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-[24px] pb-5">Schedule Summary</SheetTitle>
        </SheetHeader>

        {/* Doctor Info */}
        <div className="flex items-center gap-4 py-5 border-y">
          <Image
            src="/fb4996dd2f3bece621cfd3cf3a8f5361a14ddc31.jpg"
            alt="Doctor Image"
            width={112}
            height={112}
            className="w-[112px] h-[112px] rounded-full object-cover"
          />
          <div>
            <h2 className="text-[24px] font-semibold">Dr. Zainab Aliyu</h2>
            <p className="text-[18px] font-light">Neurosurgery</p>
            <span className="text-[14px] text-[#A2A2A2] font-light">
              Lagos State Teaching Hospital
            </span>
          </div>
        </div>

        {/* Booking Info */}
        <div>
          <div className="flex items-center justify-between py-[12px] border-b mt-5">
            <span className="text-[18px] font-light text-[#A2A2A2]">Status</span>
            <span
              className={`text-[14px] py-[8px] px-[16px] rounded-full capitalize border-[0.5] ${getStatusStyle(type)}`}
            >
              {type}
            </span>
          </div>

          <BookingInfoRow 
            label="Date" 
            value={<><Calendar1 className="w-[20px] h-[21px]" color="#007AFF" /> 28 August 2025</>} 
          />

          <BookingInfoRow 
            label="Time" 
            value={<><Clock className="w-[20px] h-[21px]" color="#FF9500" /> 3:00 PM</>} 
          />

          <BookingInfoRow 
            label="File" 
            value={<><CloudUpload className="w-[20px] h-[21px]" color="#00C7BE" /> 1 Document uploaded</>} 
          />

          <BookingInfoRow 
            label="Type" 
            value={<><Video className="w-[20px] h-[21px]" color="#AF52DE" /> Telemedicine (Video Call)</>} 
          />

          <BookingInfoRow 
            label="Fee" 
            value={<><Banknote className="w-[20px] h-[21px]" color="#34C759" /> ₦100,000</>} 
            borderBottom={false}
          />
        </div>

        {/* ✅ Action Buttons (now using ActionGroup) */}
        <div className="w-full absolute bottom-5 left-0 mt-6 pb-4 px-5 pt-3">
          {type === 'booking' && (
            <Button className="w-full h-[56px] rounded-[12px] text-[16px] font-light">
              Confirm & Proceed to Payment
            </Button>
          )}

          {type === 'upcoming' && (
            <ActionGroup
              primary={{
                label: "Join Video Call",
                icon: <Video className="w-[20px] h-[20px]" />,
              }}
              secondary={{
                label: "Reschedule",
                icon: <Calendar className="w-[20px] h-[20px]" />,
                variant: "outline",
              }}
            />
          )}

          {type === 'ongoing' && (
            <ActionGroup
              primary={{ label: "Mark as Complete" }}
              secondary={{ label: "Report Appointment", variant: "outline" }}
            />
          )}

          {type === 'completed' && (
            <ActionGroup
              primary={{ label: "Leave a Review" }}
              secondary={{ label: "Report Appointment", variant: "outline" }}
            />
          )}

          {type === 'canceled' && (
            <ActionGroup
              primary={{
                label: "Reschedule",
                icon: <Calendar className="w-[20px] h-[20px]" />,
              }}
              secondary={{
                label: "Report Appointment",
                variant: "outline",
              }}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ScheduleSummary
