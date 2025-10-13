'use client'

import React from 'react'
import ConsultantsCard from '../../consultants/consultantsCard'
import Paginations from '../pagination'
import SectionHeader from '@/components/shared/SectionHeader'
import { consultants } from '@/constant/hospitalData'

const Consultants = () => {
    const handleSortChange = (value: string) => {
        console.log('Sort by:', value)
        // Add sorting logic here later
    }

  return (
    <div className="py-10 space-y-10">
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
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
  )
}

export default Consultants
