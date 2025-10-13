'use client'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface CompareHeaderProps {
  title: string
  description: string
  onCancel?: () => void
}

export const CompareHeader = ({ title, description, onCancel }: CompareHeaderProps) => (
  <div className="flex flex-col lg:flex-row items-start justify-between gap-4 py-6 h-[173px]">
    <div className="space-y-2 px-[2]">
      <h2 className="text-2xl lg:text-[32px] font-semibold">{title}</h2>
      <p className="text-[16px] lg:text-[18px] font-light text-[#717171] max-w-[670px]">{description}</p>
    </div>
    <Button
      variant="outline"
      onClick={onCancel}
      className="bg-transparent text-[14px] h-[39px] font-light flex items-center gap-2"
    >
      <X className="w-[20px] h-[20px]" />
      Cancel
    </Button>
  </div>
)
