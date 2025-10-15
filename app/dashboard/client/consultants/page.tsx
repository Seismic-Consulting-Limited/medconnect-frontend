'use client'
import SideFilter from '@/components/consultants/sideFilter'
import ConsultantsCard from '@/components/consultants/consultantsCard'
import Paginations from '@/components/hospital/pagination'
import SectionHeader from '@/components/shared/SectionHeader'
import { consultants } from '@/constant/hospitalData'
import React from 'react'

const ConsultantsPage = () => {
    const handleSortChange = (value: string) => {
        console.log('Sort by:', value)
        // Add sorting logic here later
    }
  return (
    <div className='p-5'>
      <div className='flex gap-5'>
        <SideFilter />
        <div>
            <SectionHeader
                title="Consultants List"
                totalCount={375}
                visibleCount={consultants.length}
                sortOptions={[
                { value: 'rating', label: 'Top Rated' },
                { value: 'location', label: 'Nearest' },
                { value: 'reviews', label: 'Most Reviewed' },
                ]}
                onSortChange={handleSortChange}
                defaultSort="Newest"
            />

        {/* Consultant Cards */}
        <div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultants.map((consultant) => (
                    <ConsultantsCard key={consultant.id} consultant={consultant} />
                ))}
            </div>
            <Paginations
              totalPages={5}
              onPageChange={(page) => console.log('Current page:', page)}
            />
        </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultantsPage
