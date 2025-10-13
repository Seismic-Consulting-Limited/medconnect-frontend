'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { specialties } from '@/constant/hospitalData'
import { ArrowRight, Check } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import TreatmentCard from './treatmentCard'
import SectionHeader from '@/components/shared/SectionHeader'

const treatments = [
  {
    name: 'Coronary Bypass Surgery',
    description:
      'Surgical procedure to restore normal blood flow to an obstructed coronary artery.',
    priceRange: '₦1,500,000 - ₦3,000,000',
    duration: '4–6 hours',
    recovery: '7–10 days',
    facility: 'Cardiac Surgery Unit',
  },
  {
    name: 'Appendectomy',
    description:
      'Surgical removal of the appendix, typically due to appendicitis.',
    priceRange: '₦400,000 - ₦700,000',
    duration: '1–2 hours',
    recovery: '3–5 days',
    facility: 'General Surgery Ward',
  },
  {
    name: 'Knee Replacement Surgery',
    description:
      'Procedure to replace a damaged or worn-out knee joint with an artificial implant.',
    priceRange: '₦2,000,000 - ₦4,500,000',
    duration: '3–4 hours',
    recovery: '2–3 weeks',
    facility: 'Orthopedic Unit',
  },
]

const Facilities = () => {
    const handleSortChange = (value: string) => {
        console.log('Sort by:', value)
        // Add sorting logic here later
    }
  return (
    <div className="py-10 space-y-10">
      {/* --- Medical Specialties --- */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold">
            Medical Specialties{' '}
            <span className="font-light text-[#A2A2A2]">(Showing 1–15 of 43)</span>
          </h3>
          <Button variant="outline" className="bg-transparent font-light">
            See All <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4">
          {specialties.map((label, i) => (
            <span key={i} className="flex items-center gap-3 text-[16px]">
              <Check className="w-5 h-5 text-green-600" /> {label}
            </span>
          ))}
        </div>
      </section>

      {/* --- Treatments --- */}
      <section className="space-y-5">
        <SectionHeader
            title="Treatment"
            totalCount={375}
            visibleCount={treatments.length}
            sortOptions={[
            { value: 'rating', label: 'Top Rated' },
            { value: 'location', label: 'Nearest' },
            { value: 'reviews', label: 'Most Reviewed' },
            ]}
            onSortChange={handleSortChange}
            defaultSort="Newest"
        />

        <div className='space-y-3'>
          {treatments.map((treatment, index) => (
            <TreatmentCard key={index} treatment={treatment} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Facilities
