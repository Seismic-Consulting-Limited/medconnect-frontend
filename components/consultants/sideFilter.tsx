import React from 'react'
import { Button } from '../ui/button'
import { Contact, Globe, Plus } from 'lucide-react'
import { specialties } from '@/constant/hospitalData'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from '../ui/card'


const SideFilter = () => {
  return (
    <Card className='lg:w-1/3 mb-5'>
        <div className="flex items-center justify-between border-b p-[14px]">
          <h3 className="text-[16px] font-semibold">
            Filter Options
          </h3>
          <Button variant="outline" className="bg-transparent font-light">
            Clear All
          </Button>
        </div>
        <div className='p-[14px] space-y-3'>
            <div className='space-y-2'>
                <span className='text-[12px] font-medium'>Select Speciality</span>
                <div className='flex flex-wrap gap-2'>
                    {specialties.slice(0,5).map((label, i) => (
                        <span key={i} className='flex items-center gap-4 border-[0.5px] rounded-full border-[#B173E8] w-fit text-[16px] text-[#B173E8] py-[4px] px-[16px]'>
                            {label}
                            <Plus className='w-[16px] h-[16px]' />
                        </span>
                    ))}
                </div>
            </div>
            <div className='space-y-2'>
                <Label className='text-[12px] font-medium'>Other Specialties</Label>
                <Input placeholder='Type area of specialty you are looking for' className='border-[1px] border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light placeholder:text-[#C0C0C0] placeholder:text-[14px]' />
            </div>
            <div className='space-y-2'>
                <Label className='text-[12px] font-medium'>Language</Label>
                <Select>
                    <SelectTrigger className="w-full border-[1px] border-[#D7D7D7] rounded-[16px] text-[#C0C0C0] text-[14px]">
                        <div className='flex items-center gap-2'>
                            <Globe className='w-[16px] h-[16px]'  />
                            <SelectValue placeholder="Select Language" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='space-y-2'>
                <Label className='text-[12px] font-medium'>Available Date</Label>
                <Select>
                    <SelectTrigger className="w-full border-[1px] border-[#D7D7D7] rounded-[16px] text-[#C0C0C0] text-[14px]">
                        <div className='flex items-center gap-2'>
                            <Contact className='w-[16px] h-[16px]'  />
                            <SelectValue placeholder="Pick A Date" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold">
                    Price Range (₦)
                </h3>
                <Button variant="outline" className="text-[10px] bg-transparent font-light border-primary text-primary">
                    Apply
                </Button>
            </div>
            <div className='flex items-center gap-2'>
                <div className='space-y-2'>
                    <Label className='text-[12px] font-medium'>Min</Label>
                    <Input placeholder='0' type='number' className='border-[1px] border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light placeholder:text-[#C0C0C0] placeholder:text-[14px]' />
                </div>
                <div className='space-y-2'>
                    <Label className='text-[12px] font-medium'>Max</Label>
                    <Input placeholder='0' type='number' className='border-[1px] border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light placeholder:text-[#C0C0C0] placeholder:text-[14px]' />
                </div>
            </div>
            <Button className='h-[47px] w-full text-sm flex items-center justify-center gap-2'>Apply Filter</Button>
        </div>
    </Card>
  )
}

export default SideFilter
