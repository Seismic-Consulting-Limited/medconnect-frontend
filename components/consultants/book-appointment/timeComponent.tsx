'use client'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import React, { useState } from 'react'
import ScheduleSummary from './scheduleSummary'

const TimeComponent = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const active = !!selectedTime

  // Sample time slots (you can generate dynamically if needed)
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  ]

  return (
    <div className="border-[0.5px] border-[#D7D7D7] rounded-[32px] w-[348px]">
      {/* Header */}
      <div className="p-[20px] border-b border-[#D7D7D7]">
        <h2 className="text-[16px] font-semibold">Select Time</h2>
      </div>

      {/* Time Slots */}
      <div className="p-[20px] space-y-3 max-h-[409px] overflow-y-auto scrollbar-hide">
        {timeSlots.map((time) => (
          <label
            key={time}
            className={`flex items-center gap-3 border-[1px] bg-[#EDEDED] rounded-[12px] py-[10px] px-[14px] cursor-pointer transition-all ${
              selectedTime === time
                ? "border-[#7E22CE] bg-[#F9F5FF]"
                : "border-[#D7D7D7] hover:border-[#C9C9C9]"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedTime === time}
              onChange={() => setSelectedTime(time)}
              className="w-[18px] h-[18px] accent-[#7E22CE] cursor-pointer"
            />
            <span className="text-[18px] font-light text-[#333]">{time}</span>
          </label>
        ))}
      </div>

      {/* Upload Section */}
      <div className="p-[20px] space-y-3 border-t border-[#E2E2E2]">
        <p className="text-[#A2A2A2] text-[14px] font-light">
          Share any reports, scans, or notes to help{" "}
          <span className="text-text">Dr. Aliyu</span> understand your condition better.
        </p>
        <div className="text-center space-y-2 border-[#9946E1] border-[1px] border-dashed p-[12px] rounded-[12px]">
          <Upload className="mx-auto" color="#7E22CE" />
          <p className="text-[14px] font-light">Click to upload or drag and drop</p>
          <span className="text-[#A2A2A2] text-[12px] font-light">JPEG, PNG, DOC, PDF</span>
        </div>

        {/* Action Button */}
        <ScheduleSummary active={active} type='booking' />
      </div>
    </div>
  )
}

export default TimeComponent
