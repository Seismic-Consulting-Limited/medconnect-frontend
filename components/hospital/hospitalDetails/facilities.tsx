'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import TreatmentCard from './treatmentCard'
import SectionHeader from '@/components/shared/SectionHeader'

const Facilities = ({hospitalDetails}: any) => {
    const handleSortChange = (value: string) => {
        console.log('Sort by:', value)
        // Add sorting logic here later
    }
  return (
    <div className="py-10 space-y-10">
      {/* --- Medical Specialties --- */}
      <section className="space-y-5">
        {
          hospitalDetails?.specialties?.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold">
                  Medical Specialties{' '}
                  <span className="font-light text-[#A2A2A2]">(Showing 1–15 of 43)</span>
                </h3>
                <Button variant="outline" className="bg-transparent font-light">
                  See All <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 mt-3">
                {hospitalDetails?.specialties?.map((label: any, i: number) => (
                  <span key={i} className="flex items-center gap-3 text-[16px]">
                    <Check className="w-5 h-5 text-green-600" /> {label.name}
                  </span>
                ))}
              </div>
            </div>
          )
        }
      </section>

      {/* --- Treatments --- */}
      <section className="space-y-5">

        <div className='space-y-3'>
          {
            hospitalDetails?.treatments?.length > 0 && (
              <div>
                <SectionHeader
                    title="Treatment"
                    totalCount={hospitalDetails?.treatments?.length}
                    visibleCount={hospitalDetails?.treatments?.length}
                    sortOptions={[
                    { value: 'rating', label: 'Top Rated' },
                    { value: 'location', label: 'Nearest' },
                    { value: 'reviews', label: 'Most Reviewed' },
                    ]}
                    onSortChange={handleSortChange}
                    defaultSort="Newest"
                />
                <div className='mt-3'>
                  {hospitalDetails?.treatments.map((treatment: any, index: number) => (
                    <TreatmentCard key={index} treatment={treatment} />
                  ))}
                </div>
              </div>
            )
          }
        </div>
      </section>
    </div>
  )
}

export default Facilities
