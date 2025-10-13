import React from 'react'
import { Clock, Globe, GraduationCap, Hospital,  Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';

type Consultant = {
  id: number;
  name: string
  specialty: string
  rating: number
  reviews: number
  hospital: string
  language: string
  qualification: string
  experience: string
  image: string
}

const ConsultantsCard = ({ consultant }: { consultant: Consultant }) => {
  const {
    id,
    name,
    specialty,
    rating,
    reviews,
    hospital,
    language,
    qualification,
    experience,
    image,
  } = consultant

  return (
    <div className="bg-white text-center rounded-[16px] border border-[#D7D7D7] shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Top */}
      <div className="py-5 space-y-2">
        <Image
          src={image}
          alt={name}
          width={96}
          height={96}
          className="rounded-full object-cover mx-auto"
        />
        <div className="space-y-1">
          <Link href={`/dashboard/consultants/${id}`} className="text-[18px] font-semibold">{name}</Link>
          <p className="text-[15px] font-light text-[#A2A2A2]">{specialty}</p>

          <div className="flex items-center mx-auto gap-2 text-[18px] py-2 px-4 bg-[#F4F4F4] w-fit rounded-full border border-[#C0C0C0]">
            <Star className="w-[18px] h-[18px] text-[#F79009]" />
            <span className="text-[12px]">
              {rating} <span className="text-[#717171]">({reviews} Reviews)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-5 px-4 text-left space-y-3 border-t text-[#333]">
        <InfoRow icon={<Hospital className='w-[20px] h-[20px]' />} label="Affiliation" value={hospital} />
        <InfoRow icon={<Globe className='w-[20px] h-[20px]' />} label="Language" value={language} />
        <InfoRow icon={<GraduationCap className='w-[20px] h-[20px]' />} label="Qualification" value={qualification} />
        <InfoRow icon={<Clock className='w-[20px] h-[20px]' />} label="Experience" value={experience} />
      </div>
    </div>
  )
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-[#717171] text-[14px] flex items-center gap-2">
      {icon} {label}:
    </span>
    <p className="text-[14px] font-light line-clamp-1 text-right flex-1">{value}</p>
  </div>
)

export default ConsultantsCard
