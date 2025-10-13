'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Plus, Star, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { CompareHeader } from '@/components/hospital/compare/CompareHeader'

const CompareHospitalPage = () => {
  const hospitals = [
    {
      name: 'Lagos State University Teaching Hospital',
      location: 'Ikeja, Lagos',
      image: '/918fb92ed1ae2f26a67dfcb733b1f6e5731ba954.jpg',
      rating: 4,
      reviews: 108,
      specialties: ['Cardiology', 'Orthopedics', 'Dental', 'Gynecology', 'Cardiology', 'General Surgery'],
      facilities: 'Dialysis Unit, Emergency Room, CT Scanner',
      consultants: '60 Specialists',
      accreditations: ['Orthopedics', 'Radiology', 'Gynecology', 'Cardiology', 'General Surgery'],
      languages: 'English, Yoruba, Hausa',
      cost: '₦300,000 – ₦1,500,000'
    },
    {
      name: 'Reddington Hospital',
      location: 'Victoria Island, Lagos',
      image: '/8f00848ef155bd4d59a39872d0436b200db61f3e.jpg',
      rating: 4,
      reviews: 108,
      specialties: ['Cardiology', 'Orthopedics', 'Dental'],
      facilities: 'Private Wards, Endoscopy Unit, 24-hour Pharmacy',
      consultants: '50 Specialists',
      accreditations: ['Orthopedics', 'Radiology', 'Gynecology'],
      languages: 'English, Yoruba, Hausa',
      cost: '₦300,000 – ₦1,500,000'
    },
  ]

  const filledHospitals = [
    ...hospitals,
    ...Array(Math.max(0, 3 - hospitals.length)).fill(null)
  ]

  const labels = [
    'Name & Location',
    'Rating',
    'Specialties',
    'Facilities',
    'Consultants',
    'Accreditations',
    'Languages Spoken',
    'Average Cost Range',
    'Booking Options',
  ]

  return (
    <div className="w-full overflow-x-auto px-5">
      <CompareHeader
        title="Compare Hospitals"
        description="Select up to 3 hospitals and compare their specialties, facilities, treatments, and ratings side by side to find the best option for your care."
      />

      <div className="min-w-[900px] border-t border-gray-200">
        {labels.map((label, index) => (
          <div
            key={index}
            className="grid grid-cols-[220px_repeat(3,minmax(250px,1fr))] border-b border-gray-200"
          >
            {/* LEFT LABEL */}
            <div className="bg-white flex items-center border-x px-4 font-light">
              {label}
            </div>

            {/* RIGHT COLUMNS */}
            {filledHospitals.map((hospital, idx) => (
              <div key={idx} className="flex items-center p-4 text-sm text-gray-700 bg-[#F9F9F9] odd:border-x">
                {(() => {
                  switch (label) {
                    case 'Name & Location':
                      return hospital ? (
                        <div className="w-full space-y-3">
                          <div className="relative mb-2 ">
                            <Image
                              src={hospital.image}
                              alt={hospital.name}
                              width={100}
                              height={100}
                              className="w-full h-[198px] object-cover rounded-lg mx-auto"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute -top-2 -right-2 w-[28px] h-[28px] rounded-full bg-text border-[3px] border-white"
                            >
                              <X className="w-4 h-4" color='white' />
                            </Button>
                          </div>
                          <h3 className="font-semibold text-[18px] text-[#222] line-clamp-1">
                            {hospital.name}
                          </h3>
                          <p className="text-[14px] font-light">{hospital.location}</p>
                        </div>
                      ) : (
                        <div className="w-[296px] h-[198px] rounded-[12px] mx-auto border border-dashed flex flex-col items-center justify-center border-[#A2A2A2]">
                          <Plus className="w-[24px] h-[24px]" />
                          <p className="text-[14px] font-light">Click to add hospital</p>
                        </div>
                      )

                    case 'Rating':
                      return hospital && (
                        <div className="flex items-center gap-2">
                          <Star className="w-[18px] h-[18px] text-[#F79009]" />
                          <span className="text-[18px] font-light">{hospital.rating}</span>
                          <span className="text-[18px] font-light">
                            ({hospital.reviews} reviews)
                          </span>
                        </div>
                      )

                    case 'Specialties':
                      return hospital && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {hospital.specialties.map((s: any, i: any) => (
                            <span
                              key={i}
                              className="py-[4px] px-[10px] bg-[#F2F2F2] text-[16px] font-light text-[#717171] border border-[#D7D7D7] rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )

                    case 'Facilities':
                      return hospital && <span className='text-[18px] font-light'>{hospital.facilities}</span>

                    case 'Consultants':
                      return hospital && <span className='text-[18px] font-light'>{hospital.consultants}</span>

                    case 'Accreditations':
                      return hospital && (
                        <div className="flex flex-wrap gap-2">
                          {hospital.accreditations.slice(0, 7).map((a: any, i: any) => (
                            <span
                              key={i}
                              className="py-[4px] px-[10px] bg-[#F6FEF9] text-[15px] font-light text-[#079455] border border-[#DCFAE6] rounded-full uppercase"
                            >
                              {a}
                            </span>
                          ))}
                          {
                             <span
                              className="py-[4px] px-[10px] bg-[#F6FEF9] text-[12px] text-[#079455] border border-[#DCFAE6] rounded-full uppercase"
                            >
                              + 1
                            </span>
                          }
                        </div>
                      )

                    case 'Languages Spoken':
                      return hospital && <span className='text-[18px] font-light'>{hospital.languages}</span>

                    case 'Average Cost Range':
                      return hospital && <span className='text-[18px] font-light'>{hospital.cost}</span>

                    case 'Booking Options':
                      return hospital && (
                        <Button className="h-[47px] w-full text-sm flex items-center justify-center gap-2">
                          View Hospital <ArrowRight className="w-[14px] h-[14px]" />
                        </Button>
                      )

                    default:
                      return null
                  }
                })()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompareHospitalPage
