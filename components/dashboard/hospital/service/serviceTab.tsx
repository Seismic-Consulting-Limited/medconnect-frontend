import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hospital, Plus, Zap } from 'lucide-react'
import { Input } from '@/components/ui/input'
import DownloadPopover from '../consultants/downloadPopover'
import FilterPopover from '../consultants/filterPopover'
import { Button } from '@/components/ui/button'
import SpecialtyTable from './specialtyTable'
import FacilitiesTable from './facilitiesTable'

const ServiceTab = () => {
  return (
    <Tabs defaultValue="spacialty" className="w-full">
        <TabsList>
            <TabsTrigger value="spacialty" className='flex items-center gap-3'><Zap className='w-[24px] h-[24px]' /> Specialties</TabsTrigger>
            <TabsTrigger value="facility" className='flex items-center gap-3'><Hospital className='w-[24px] h-[24px]' /> Facilities</TabsTrigger>
        </TabsList>
        {/* Header with actions */}
        <div className="flex items-center justify-between w-full my-5">
            <h2 className="text-[20px] font-semibold">Medical Specialties <span className='text-[#A2A2A2]'>(32)</span></h2>
            <div className="flex items-center justify-end gap-3">
            <Input placeholder="Search for name and specialty" className="w-[250px]" />
            <DownloadPopover />
            <FilterPopover />
            <Button className="text-[14px] font-light gap-2">
                <Plus size={16} /> Add Specialties
            </Button>
            </div>
        </div>
        <TabsContent value="spacialty">
            <SpecialtyTable />
        </TabsContent>
        <TabsContent value="facility">
            <FacilitiesTable />
        </TabsContent>
    </Tabs>
  )
}

export default ServiceTab
