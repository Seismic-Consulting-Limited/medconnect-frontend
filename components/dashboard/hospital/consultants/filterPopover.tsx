import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Settings2 } from 'lucide-react'

const FilterPopover = () => {
  return (
    <Popover>
        <PopoverTrigger>
            <Button variant="outline" className="text-[14px] font-light gap-2">
                <Settings2 size={16} /> Filter
            </Button>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  )
}

export default FilterPopover
