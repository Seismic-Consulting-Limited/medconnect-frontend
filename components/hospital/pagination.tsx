'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  totalPages: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

const Paginations: React.FC<PaginationProps> = ({
  totalPages,
  currentPage = 1,
  onPageChange,
}) => {
  const [page, setPage] = useState(currentPage)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
    onPageChange?.(newPage)
  }

  return (
    <div className="flex items-center justify-center gap-2 py-6 text-sm">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`flex items-center gap-1 px-3 py-1 border rounded-lg transition ${
          page === 1
            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
            : 'text-black border-gray-300 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 rounded-md border transition ${
              page === num
                ? 'bg-primary text-white border-primary'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`flex items-center gap-1 px-3 py-1 border rounded-lg transition ${
          page === totalPages
            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
            : 'text-black border-gray-300 hover:bg-gray-100'
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Paginations
