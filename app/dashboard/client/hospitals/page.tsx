'use client'

import AdvancedFilter from '@/components/hospital/advancedFilter'
import Filters from '@/components/hospital/filters'
import HospitalCard from '@/components/hospital/hospitalCard'
import Paginations from '@/components/hospital/pagination'
import { Input } from '@/components/ui/input'
import { ChevronDown, Search, Sliders } from 'lucide-react'

const HospitalsPage = () => {
  const hospitals = [
    {
      id: 1,
      name: 'Lagos General Hospital',
      location: 'Lagos, Nigeria',
      specialties: ['Cardiac Surgery', 'Pediatrics', 'Neurology'],
      accreditations: ['ISO 9001', 'MDCN', 'NHIS', 'NMA'],
      rating: 4.6,
      reviews: 145,
      image: '/new-ruby-hospital-nxIhHjGloHI-unsplash.jpg',
    },
    {
      id: 2,
      name: 'Abuja National Hospital',
      location: 'Abuja, Nigeria',
      specialties: ['Orthopedics', 'Radiology', 'Gynecology'],
      accreditations: ['MDCN', 'NHIS'],
      rating: 4.8,
      reviews: 231,
      image: '/national-cancer-institute-1c8sj2IO2I4-unsplash.jpg',
    },
    {
      id: 3,
      name: 'Enugu Specialist Clinic',
      location: 'Enugu, Nigeria',
      specialties: ['Dermatology', 'ENT', 'Surgery'],
      accreditations: ['ISO 9001', 'MDCN'],
      rating: 4.3,
      reviews: 102,
      image: '/labor-accommodation-P3oo4--IVys-unsplash.jpg',
    },
    {
      id: 4,
      name: 'Enugu Specialist Clinic',
      location: 'Enugu, Nigeria',
      specialties: ['Dermatology', 'ENT', 'Surgery'],
      accreditations: ['ISO 9001', 'MDCN'],
      rating: 4.3,
      reviews: 102,
      image: '/wendor-6tCmf0t1yyw-unsplash.jpg',
    },
    {
      id: 5,
      name: 'Enugu Specialist Clinic',
      location: 'Enugu, Nigeria',
      specialties: ['Dermatology', 'ENT', 'Surgery'],
      accreditations: ['ISO 9001', 'MDCN'],
      rating: 4.3,
      reviews: 102,
      image: '/new-ruby-hospital-nxIhHjGloHI-unsplash.jpg',
    },
  ]

  return (
    <div className=''>
      <div className='text-center space-y-5 py-10 bg-white'>
        <h1 className='font-semibold text-[32px] text-text'>
          Find Your Ideal Hospital in Nigeria
        </h1>
        <p className='lg:w-[622px] text-[14px] lg:text-[16px] text-[#717171] mx-auto'>
          Search our network of accredited hospitals across Nigeria to find the perfect match for your healthcare needs.
        </p>

        <AdvancedFilter />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-6 lg:gap-16 w-full px-4 py-3">
          {/* Popular Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            <p className="text-[12px] lg:text-[16px] font-light text-left">Popular:</p>
            <div className="flex flex-wrap gap-2">
              {['Cardiology', 'Orthopedics', 'Dental'].map((specialty, index) => (
                <span
                  key={index}
                  className="py-[6px] px-[8px] lg:px-[14px] bg-[#F2F2F2] text-[8px] lg:text-[10px] uppercase text-[#555] border border-[#D7D7D7] rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Top Destinations Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            <p className="text-[12px] lg:text-[16px] font-light text-left">Top Destinations:</p>
            <div className="flex flex-wrap gap-3">
              {['Lagos', 'Abuja', 'Kano'].map((location, index) => (
                <span
                  key={index}
                  className="py-[6px] px-[8px] lg:px-[14px] bg-[#F2F2F2] text-[8px] lg:text-[10px] uppercase text-[#555] border border-[#D7D7D7] rounded-full"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className='p-5'>
        <Filters />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-5'>
          {hospitals.map((hospital, index) => (
            <HospitalCard key={index} {...hospital} />
          ))}
        </div>
        <Paginations
          totalPages={5}
          onPageChange={(page) => console.log('Current page:', page)}
        />
      </div>
    </div>
  )
}

export default HospitalsPage

