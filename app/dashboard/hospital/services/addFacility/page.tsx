'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AddFacilityPage = () => {
  const [category, setCategory] = useState('')
  return (
    <div>
                {/* Header */}
        <div className='bg-white shadow flex items-center gap-5 h-[92px] p-[24px]'> 
            <ArrowLeft className='w-[20px] h-[20px]' /> 
            <div> 
                <span className='flex items-center gap-3 text-[#C0C0C0] text-[14px] font-light'>
                    Treatments
                    <div>
                    </div> 
                    <p className='text-text'>Add New Treatment</p>
                </span> 
            </div> 
        </div>
        <div className="max-w-[720px] mx-auto py-10 px-5 space-y-8">
            <h1 className="text-[28px] font-semibold text-gray-800">Add New Treatment</h1>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <Label>Name of Facility *</Label>
                        <Input name='' placeholder='Spinal Fusion Surgery' />
                    </div>
                    <div className="space-y-1">
                        <Label>Facility Category *</Label>
                        <Select value={category} onValueChange={(e) => setCategory(e)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="other">Others</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    {
                      category === 'other' && (
                        <div className="space-y-1">
                          <Label>Other Category *</Label>
                          <Input name='' placeholder='Spinal Fusion Surgery' />
                        </div>
                      )
                    }
                    <div className="grid grid-cols-2 gap-5">
                        <Button >Add Treatment</Button>
                        <Button variant={'outline'}>Cancel</Button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AddFacilityPage
