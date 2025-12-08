'use client'

import React, { useEffect, useState } from 'react'
import Paginations from '../pagination'
import SectionHeader from '@/components/shared/SectionHeader'
import { fetchHospitalConsultants } from '@/service/hospital.service'
import { Loader2 } from 'lucide-react'
import ConsultantsCard from '@/components/consultants/consultantsCard'

const Consultants = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false)
  const [consultants, setConsultants] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4) // number of consultants per page

  useEffect(() => {
    const fetchConsultants = async () => {
      setLoading(true)
      try {
        const response = await fetchHospitalConsultants(id)
        if (response?.data) {
          setConsultants(response.data)
        }
      } catch (error: any) {
        console.error('Error fetching consultants:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchConsultants()
  }, [id])

  const handleSortChange = (value: string) => {
    console.log('Sort by:', value)
    // Add client-side sorting logic here later
  }

  // Pagination calculations
  const totalPages = Math.ceil(consultants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentConsultants = consultants.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // scroll to top on page change
  }

  return (
    <div className="py-10 space-y-10">
      <SectionHeader
        title="Consultants List"
        totalCount={consultants.length}
        visibleCount={currentConsultants.length}
        sortOptions={[
          { value: 'rating', label: 'Top Rated' },
          { value: 'location', label: 'Nearest' },
          { value: 'reviews', label: 'Most Reviewed' },
        ]}
        onSortChange={handleSortChange}
        defaultSort="Newest"
      />

      <div className="mt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary" />
            <p>Loading consultants...</p>
          </div>
        ) : consultants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <img
              src="/empty-state.svg"
              alt="No consultants"
              className="w-40 h-40 mb-4 opacity-80"
            />
            <h3 className="text-lg font-semibold text-gray-700">
              No consultants available
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              This hospital has not added any consultants yet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentConsultants.map((consultant) => (
                <ConsultantsCard key={consultant.id} consultant={consultant} />
              ))}
            </div>

            {totalPages > 1 && (
              <Paginations
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Consultants
