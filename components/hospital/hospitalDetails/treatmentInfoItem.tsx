import React from 'react'
import { LucideIcon } from 'lucide-react'

type TreatmentInfoItemProps = {
  icon: LucideIcon
  iconColor: string
  borderColor: string
  bgColor: string
  label: string
  value: string
}

const TreatmentInfoItem = ({
  icon: Icon,
  iconColor,
  borderColor,
  bgColor,
  label,
  value,
}: TreatmentInfoItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-[34px] h-[34px] rounded-full flex items-center justify-center border`}
        style={{ borderColor, backgroundColor: bgColor }}
      >
        <Icon className="w-[18px] h-[18px]" color={iconColor} />
      </div>
      <div>
        <small className="text-[#717171] text-[10px] font-medium uppercase">{label}</small>
        <p className="text-[15px] font-semibold">{value}</p>
      </div>
    </div>
  )
}

export default TreatmentInfoItem
