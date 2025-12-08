import React, { useEffect, useState } from 'react'
import { Clock, Globe, GraduationCap, Hospital, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { fetchSingleHospital } from '@/service/hospital.service'
import { id } from 'date-fns/locale'

type Consultant = {
  id: string
  title?: string
  hospital?: string
  years_of_experience?: number
  consultation_fee?: string
  profile?: {
    email?: string
    first_name?: string
    last_name?: string
    other_name?: string | null
    gender?: string | null
    date_of_birth?: string | null
    phone_number?: string | null
  }
  languages?: string[]
  education?: string[]
  experience?: string[]
  specialty?: string | number
  rating?: number
  reviews?: number
}

const ConsultantsCard = ({ consultant }: { consultant: Consultant }) => {
    const [loading, setLoading] = useState(false)
    const [hospitalDetails, setHospitalDetails] = useState<any>({})
  const fullName = `${consultant?.title || ''} ${consultant?.profile?.first_name || ''} ${consultant?.profile?.last_name || ''}`.trim()

    useEffect(() => {
      const fetchHospitalDetails = async () => {
        setLoading(true)
        try {
          const response = await fetchSingleHospital(consultant.hospital as any)
          if (response?.data) setHospitalDetails(response?.data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
      fetchHospitalDetails()
    }, [id])
  

  return (
    <Card className="text-center shadow-sm border border-gray-200 hover:shadow-md transition-all">
      {/* Header Section */}
      <CardHeader>
        <Image
          src={'/default-avatar.png'}
          alt={fullName || 'Consultant'}
          width={96}
          height={96}
          className="rounded-full object-cover mx-auto mb-3"
        />

        <CardTitle>
          <Link
            href={`/dashboard/consultants/${consultant?.id}`}
            className="text-[18px] font-semibold hover:text-primary transition"
          >
            {fullName || 'Unnamed Consultant'}
          </Link>
        </CardTitle>

        <CardDescription>
          <p className="text-[15px] font-light text-[#A2A2A2]">
            {typeof consultant?.specialty === 'string'
              ? consultant?.specialty
              : 'Specialty Not Specified'}
          </p>
        </CardDescription>

        {/* Rating Section */}
        <div className="flex items-center justify-center gap-2 text-[18px] py-2 px-4 bg-[#F4F4F4] w-fit mx-auto rounded-full border border-[#C0C0C0]">
          <Star
            fill={'#F79009'}
            className="w-[18px] h-[18px] text-[#F79009]"
          />
          <span className="text-[12px]">
            {consultant?.rating || 0}{' '}
            <span className="text-[#717171]">
              ({consultant?.reviews || 0} Reviews)
            </span>
          </span>
        </div>
      </CardHeader>

      {/* Info Section */}
      <CardContent className="space-y-3 border-t py-5">
        <InfoRow
          icon={<Hospital className="w-[20px] h-[20px]" />}
          label="Affiliation"
          value={hospitalDetails?.name|| 'Not Available'}
        />
        <InfoRow
          icon={<Globe className="w-[20px] h-[20px]" />}
          label="Language"
          value={
            consultant?.languages?.length
              ? consultant?.languages.join(', ')
              : 'Not Specified'
          }
        />
        <InfoRow
          icon={<GraduationCap className="w-[20px] h-[20px]" />}
          label="Qualification"
          value={
            consultant?.education?.length
              ? consultant?.education.join(', ')
              : 'Not Provided'
          }
        />
        <InfoRow
          icon={<Clock className="w-[20px] h-[20px]" />}
          label="Experience"
          value={
            consultant?.years_of_experience
              ? `${consultant?.years_of_experience} years`
              : 'Not Specified'
          }
        />
      </CardContent>
    </Card>
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
    <p className="text-[14px] font-light line-clamp-1 text-right flex-1">
      {value}
    </p>
  </div>
)

export default ConsultantsCard
