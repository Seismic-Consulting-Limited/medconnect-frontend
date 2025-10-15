'use client'
import React from 'react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Banknote, Calendar, Calendar1, CalendarSearch, Clock, Cloud, CloudUpload, Video } from 'lucide-react'
import BookingInfoRow from '../consultants/book-appointment/InfoRow'

interface ScheduleSummaryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: {
    doctor: string
    specialty: string
    hospital: string
    status: string
    date: string
    time: string
    fee: string
  }
}

const ScheduleSummary = ({ open, onOpenChange, data }: ScheduleSummaryProps) => {
  const { doctor, specialty, hospital, status, date, time, fee } = data

const getStatusStyle = (status: string) => {
  const normalizedStatus = status.trim().toLowerCase()

  switch (normalizedStatus) {
    case "ongoing":
      return "text-[#079455] border border-[#079455] bg-[#dcfae6]"
    case "in 15 mins":
      return "text-[#7e22ce] border border-[#7e22ce] bg-[#e4cff7]"
    case "upcoming":
      return "text-[#b54708] border border-[#b54708] bg-[#fef0c7]"
    case "completed":
      return "text-[#155eef] border border-[#155eef] bg-[#d1e0ff]"
    case "canceled":
      return "text-[#d92d20] border border-[#d92d20] bg-[#fee4e2]"
    case "booking":
      return "text-[#007aff] border border-[#007aff] bg-[#e0f7ff]"
    case "confirmed":
      return "text-[#079455] border border-[#079455] bg-[#dcfae6]"
    case "pending":
      return "text-[#b54708] border border-[#b54708] bg-[#fef0c7]"
    case "failed":
      return "text-[#d92d20] border border-[#d92d20] bg-[#fee4e2]"
    case "refunded":
      return "text-[#155eef] border border-[#155eef] bg-[#d1e0ff]"
    default:
      return "text-[#555] border border-[#ccc] bg-[#eee]"
  }
}

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
            alt={doctor}
            width={112}
            height={112}
            className="w-[112px] h-[112px] rounded-full object-cover"
          />
          <div>
            <h2 className="text-[24px] font-semibold">{doctor}</h2>
            <p className="text-[18px] font-light">{specialty}</p>
            <span className="text-[14px] text-[#A2A2A2] font-light">
              {hospital}
            </span>
          </div>
        </div>

        {/* Booking Info */}
        <div>
          <div className="flex items-center justify-between py-[12px] border-b mt-5">
            <span className="text-[18px] font-light text-[#A2A2A2]">Status</span>
            <span
              className={`text-[14px] py-[8px] px-[16px] rounded-full capitalize border-[0.5] ${getStatusStyle(
                status
              )}`}
            >
              {status}
            </span>
          </div>

          <BookingInfoRow
            label="Date"
            value={
              <>
                <Calendar1 className="w-[20px] h-[21px]" color="#007AFF" /> {date}
              </>
            }
          />
          <BookingInfoRow
            label="Time"
            value={
              <>
                <Clock className="w-[20px] h-[21px]" color="#FF9500" /> {time}
              </>
            }
          />
          <BookingInfoRow
                label="File"
                value={
                <>
                    <Cloud className="w-[20px] h-[21px]" color="#00C7BE" /> {'1 Document Uploaded'}
                </>
                }
            />
            <BookingInfoRow
                label="Type"
                value={
                <>
                    <Video className="w-[20px] h-[21px]" color="#AF52DE" /> {'Telemedicine (Video Call)'}
                </>
                }
            />
          <BookingInfoRow
            label="Fee"
            value={
              <>
                <Banknote className="w-[20px] h-[21px]" color="#34C759" /> {fee}
              </>
            }
            borderBottom={false}
          />
        </div>

       {/* Action buttons */}
      <div className="w-full grid grid-cols-2 gap-5 absolute bottom-5 left-0 mt-6 pb-4 px-5 pt-3">
        {/* Primary Button */}
        <Button
          disabled={status === 'Upcoming'}
          className="flex items-center justify-center gap-2"
        >
          {(status === 'Upcoming' || status === 'In 15 Mins') && <Video />}
          {status === 'Canceled' && <CalendarSearch />}

          {status === 'Upcoming'
            ? 'Join Video Call'
            : status === 'In 15 Mins'
            ? 'Join Call'
            : status === 'Ongoing'
            ? 'Mark as Completed'
            : status === 'Completed'
            ? 'Leave a Review'
            : status === 'Canceled'
            ? 'Reschedule'
            : ''}
        </Button>

        {/* Secondary Button */}
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          {(status === 'Upcoming' || status === 'In 15 Mins') && <CalendarSearch />}
          {status === 'Upcoming'
            ? 'Reschedule'
            : status === 'In 15 Mins'
            ? 'Cancel Appointment'
            : (status === 'Ongoing' || status === 'Completed' || status === 'Canceled')
            ? 'Report Appointment'
            : ''}
        </Button>
      </div>

      </SheetContent>
    </Sheet>
  )
}

export default ScheduleSummary
