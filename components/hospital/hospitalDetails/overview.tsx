'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Bed,
  Check,
  Contact,
  Stethoscope,
} from 'lucide-react'
import ReviewCard from './reviewCard'
import { accreditations, reviews, specialties } from '@/constant/hospitalData'
import SectionHeader from '@/components/shared/SectionHeader'

const Overview = () => {
    const handleSortChange = (value: string) => {
        console.log('Sort by:', value)
        // Add sorting logic here later
    }

  return (
    <div className="py-10 space-y-10">
      {/* --- Hospital Description --- */}
      <p className="text-[18px] font-light leading-relaxed text-[#333]">
        Lagos University Teaching Hospital (LUTH) is one of Nigeria’s foremost
        tertiary healthcare institutions, located in Lagos. As a leading teaching
        hospital, it is renowned for providing comprehensive medical services across
        a wide range of specialties while also serving as a centre for medical
        education, research, and training. LUTH is particularly recognized for its
        strengths in internal medicine, surgery, oncology, paediatrics, and maternal
        health. Equipped with experienced professionals and essential medical
        facilities, the hospital caters to both routine and complex cases,
        supporting patients locally and internationally with affordable,
        quality-driven care.
      </p>

      {/* --- Quick Info Section --- */}
      <div className="grid grid-cols-4 items-center border border-[#D7D7D7] p-6 rounded-[24px] text-[16px] font-light text-[#333]">
        <div className="flex items-center justify-center gap-3">
          <Contact className="w-5 h-5" />
          <span>Est. 1985</span>
        </div>
        <div className="flex items-center justify-center gap-3 border-x border-[#D7D7D7]">
          <Stethoscope className="w-5 h-5" />
          <span>75 Doctors</span>
        </div>
        <div className="flex items-center justify-center gap-3 border-r border-[#D7D7D7]">
          <Stethoscope className="w-5 h-5" />
          <span>143 Nurses</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Bed className="w-5 h-5" />
          <span>200 Beds</span>
        </div>
      </div>

      {/* --- Accreditations --- */}
      <section className="space-y-5">
        <h3 className="text-[18px] font-semibold">Accreditations</h3>
        <div className="flex flex-wrap gap-3">
          {accreditations.map((a, i) => (
            <span
              key={i}
              className="py-[6px] px-[12px] bg-[#F6FEF9] text-[14px] font-light text-[#079455] border border-[#DCFAE6] rounded-full uppercase"
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* --- Medical Specialties --- */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold">
            Medical Specialties{' '}
            <span className="font-light text-[#A2A2A2]">
              (Showing 1–15 of 43)
            </span>
          </h3>
          <Button variant="outline" className="bg-transparent font-light">
            See All <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-y-5">
          {specialties.map((label, i) => (
            <span key={i} className="flex items-center gap-3 text-[16px]">
              <Check className="w-5 h-5 text-green-600" /> {label}
            </span>
          ))}
        </div>
      </section>

      {/* --- Reviews Section --- */}
      <section className="space-y-5">
        <SectionHeader
            title="Review List"
            totalCount={375}
            visibleCount={reviews.length}
            sortOptions={[
            { value: 'rating', label: 'Top Rated' },
            { value: 'location', label: 'Nearest' },
            { value: 'reviews', label: 'Most Reviewed' },
            ]}
            onSortChange={handleSortChange}
            defaultSort="Newest"
        />

        {/* Review Cards */}
        <div className="flex flex-wrap gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Overview
