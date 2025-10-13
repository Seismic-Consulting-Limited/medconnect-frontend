'use client'

import { LineChart } from 'lucide-react'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const Filters = () => {
  return (
    <div className='flex flex-col lg:flex-row items-start lg:items-center justify-end gap-4 mb-5'>
      {/* Left Section (Sort) */}
      <div className='lg:flex items-center gap-3 w-full lg:w-auto'>
        <p className='text-sm font-light text-[#555]'>Sort By:</p>
        <Select>
          <SelectTrigger className='w-full lg:w-[172px] h-[39px] border border-[#C0C0C0] bg-transparent font-light text-sm focus:ring-0 focus:outline-none'>
            <SelectValue placeholder='Relevance' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='rating'>Top Rated</SelectItem>
            <SelectItem value='location'>Nearest</SelectItem>
            <SelectItem value='reviews'>Most Reviewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right Section (Compare Button) */}
      <Button
        variant='outline'
        className='flex items-center justify-center gap-2 w-full lg:w-[172px] h-[39px] border border-[#C0C0C0] bg-transparent font-light text-sm text-[#333] hover:bg-[#F8F8F8]'
      >
        <LineChart className='w-4 h-4' />
        Compare Hospitals
      </Button>
    </div>
  )
}

export default Filters
