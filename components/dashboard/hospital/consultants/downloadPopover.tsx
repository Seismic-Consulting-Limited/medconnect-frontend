import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { ChevronRight, FileArchive } from 'lucide-react'

const DownloadPopover = () => {
  return (
    <Popover>
        <PopoverTrigger>
            <Button variant="outline" className="text-[14px] font-light gap-2">
                <FileArchive size={16} /> Download
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <div className='flex items-center justify-between py-3 border-b'>
                <div className='flex items-center gap-3 font-light text-[14px]'>
                    <FileArchive className='w-[24px] h-[24px]' />
                    Download PDF
                </div>
                <ChevronRight className='w-[20px] h-[20px]' />
            </div>
            <div className='flex items-center justify-between py-3'>
                <div className='flex items-center gap-3 font-light text-[14px]'>
                    <FileArchive className='w-[24px] h-[24px]' />
                    Download CSV
                </div>
                <ChevronRight className='w-[20px] h-[20px]' />
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default DownloadPopover
