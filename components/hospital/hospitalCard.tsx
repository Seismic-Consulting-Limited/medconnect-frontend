'use client'

import React from 'react'
import { Button } from '../ui/button'
import { BadgeCheck, MapPin, Plus, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardFooter, CardTitle } from '../ui/card'

interface HospitalCardProps {
  id: number;
  name: string
  location: string
  specialties: string[]
  accreditations: string[]
  rating: number
  reviews: number
  image: string
}

const HospitalCard: React.FC<HospitalCardProps> = ({
  id,
  name,
  location,
  specialties,
  accreditations,
  rating,
  reviews,
  image,
}) => {
    const router = useRouter()
  return (
    <Card className="p-2 h-fit">
      {/* 🏥 Hospital Image */}
      <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={`Image of ${name}`}
          width={400}
          height={220}
          className="w-full h-full object-cover"
        />
        <Button
          size="sm"
          className="absolute top-3 right-3 bg-black/50 text-white hover:bg-black/60 flex items-center gap-1 text-xs px-2 py-1 border border-white rounded-md"
          onClick={() => router.push('hospitals/compare')}
        >
          <Plus className="w-3 h-3" />
          Compare
        </Button>
      </div>

      {/* 🏥 Info Section */}
      <div className="px-2 py-4 space-y-3">
        {/* Name */}
        <CardTitle>
          <Link href={`/dashboard/hospitals/${id}`} className="font-semibold text-base text-[#222] truncate">
            {name}
          </Link>
        </CardTitle>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, i) => (
            <span
              key={i}
              className="py-[4px] px-[10px] bg-[#F2F2F2] text-[10px] uppercase text-[#555] border border-[#D7D7D7] rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Accreditations */}
        <div className="flex items-center gap-2 flex-wrap">
          <BadgeCheck className="w-4 h-4 text-[#17B26A]" />
          {accreditations.slice(0, 3).map((acc, i) => (
            <span
              key={i}
              className="py-[4px] px-[10px] bg-[#F6FEF9] text-[10px] uppercase text-[#079455] border border-[#DCFAE6] rounded-full"
            >
              {acc}
            </span>
          ))}
          {accreditations.length > 3 && (
            <span className="py-[4px] px-[10px] bg-[#F6FEF9] text-[10px] uppercase text-[#079455] border border-[#DCFAE6] rounded-full">
              +{accreditations.length - 3}
            </span>
          )}
        </div>

          <CardFooter className="flex items-center justify-between text-[#717171] mt-2 px-0">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-[12px] font-medium">{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star fill={'#F79009'} className="w-4 h-4 text-[#F79009]" />
              <span className="text-[12px] font-medium">{rating}</span>
              <span className="text-[12px] text-[#C0C0C0]">({reviews})</span>
            </div>
          </CardFooter>
      </div>
    </Card>
  )
}

export default HospitalCard
