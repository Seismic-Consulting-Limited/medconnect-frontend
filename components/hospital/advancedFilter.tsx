'use client'

import React from 'react'
import { Flag, MapPin, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Stethoscope } from '../ui/stethoscope'

const AdvancedFilter = () => {
  return (
    <div className="p-[8px] bg-[#F3E9FB] border border-[#9946E1]/50 rounded-[16px] w-full max-w-[1003px] mx-auto">
      {/* Container */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch w-full">
        {/* Filter Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full bg-white border border-[#D7D7D7]/70 rounded-l-[12px] overflow-hidden">
          {/* Specialty */}
          <Select>
            <SelectTrigger className="w-full h-[52px] text-[14px] text-[#717171] border-none focus:ring-0 focus:outline-none">
              <div className='flex items-center gap-2'>
                <Stethoscope className='w-[16px] h-[16px]' />
                <SelectValue placeholder="Choose Specialty" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
              <SelectItem value="therapy">Therapy</SelectItem>
            </SelectContent>
          </Select>

          {/* Country */}
          <Select>
            <SelectTrigger className="w-full h-[52px] text-[14px] text-[#717171] border-none focus:ring-0 focus:outline-none">
              <div className='flex items-center gap-2'>
                <Flag className='w-[16px] h-[16px]' />
                <SelectValue placeholder="Select Country" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="abuja">Abuja</SelectItem>
              <SelectItem value="kano">Kano</SelectItem>
            </SelectContent>
          </Select>

          {/* State */}
          <Select>
            <SelectTrigger className="w-full h-[52px] text-[14px] text-[#717171] border-none focus:ring-0 focus:outline-none">
              <div className='flex items-center gap-2'>
                <MapPin className='w-[16px] h-[16px]' />
                <SelectValue placeholder="Select State" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
            </SelectContent>
          </Select>

          {/* City */}
          <Select>
            <SelectTrigger className="w-full h-[52px] text-[14px] text-[#717171] border-none focus:ring-0 focus:outline-none">
              <div className='flex items-center gap-2'>
                <MapPin className='w-[16px] h-[16px]' />
                <SelectValue placeholder="Select City" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="abuja">Abuja</SelectItem>
              <SelectItem value="kano">Kano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button className="flex items-center justify-center gap-2 bg-[#9946E1] text-white hover:bg-[#8535c6] rounded-r-[12px] h-[52px] lg:h-auto w-full lg:w-[180px] transition-all">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
    </div>
  )
}

export default AdvancedFilter
