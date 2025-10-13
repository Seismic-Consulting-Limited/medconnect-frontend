import { Clock, Hospital, Stethoscope } from 'lucide-react'
import React from 'react'
import TreatmentInfoItem from './treatmentInfoItem'
import { Card } from '@/components/ui/card'

type Treatment = {
  name: string
  description: string
  priceRange: string
  duration: string
  recovery: string
  facility: string
}

const TreatmentCard = ({ treatment }: { treatment: Treatment }) => {
  return (
    <Card>
      {/* --- Top Section --- */}
      <div className="py-[20px] px-[16px] space-y-2">
        <h2 className="text-[18px] font-semibold">{treatment.name}</h2>
        <p className="text-[15px] text-[#555] font-light pb-2">
          {treatment.description}
        </p>
        <span className="text-[#7E22CE] text-[16px] font-semibold">
          {treatment.priceRange}
        </span>
      </div>

      {/* --- Bottom Info --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 py-[20px] px-[16px] border-t gap-4">
        <TreatmentInfoItem
          icon={Clock}
          iconColor="#F79009"
          borderColor="#FEC84B"
          bgColor="#FFFAEB"
          label="Duration"
          value={treatment.duration}
        />
        <TreatmentInfoItem
          icon={Stethoscope}
          iconColor="#17B26A"
          borderColor="#ABEFC6"
          bgColor="#ECFDF3"
          label="Recovery"
          value={treatment.recovery}
        />
        <TreatmentInfoItem
          icon={Hospital}
          iconColor="#155EEF"
          borderColor="#84ADFF"
          bgColor="#EFF4FF"
          label="Facility"
          value={treatment.facility}
        />
      </div>
    </Card>
  )
}

export default TreatmentCard
