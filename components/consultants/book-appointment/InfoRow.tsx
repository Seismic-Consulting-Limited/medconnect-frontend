import React from "react"

type BookingInfoRowProps = {
  label: string
  value: React.ReactNode
  borderBottom?: boolean
}

const BookingInfoRow = ({ label, value, borderBottom = true }: BookingInfoRowProps) => {
  return (
    <div className={`flex items-center justify-between py-[12px] ${borderBottom ? "border-b" : ""}`}>
      <span className="text-[18px] font-light text-[#A2A2A2]">{label}</span>
      <span className="text-[18px] font-medium flex items-center gap-2">{value}</span>
    </div>
  )
}

export default BookingInfoRow
