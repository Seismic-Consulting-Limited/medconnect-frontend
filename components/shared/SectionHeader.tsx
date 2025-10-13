import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SectionHeaderProps = {
  title: string
  totalCount: number
  visibleCount: number
  sortOptions?: { value: string; label: string }[]
  onSortChange?: (value: string) => void
  defaultSort?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  totalCount,
  visibleCount,
  sortOptions = [],
  onSortChange,
  defaultSort = 'Newest',
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Title */}
      <h3 className="text-[18px] font-semibold">
        {title}{' '}
        <span className="font-light text-[#A2A2A2]">
          (Showing {visibleCount} of {totalCount})
        </span>
      </h3>

      {/* Sort */}
      {sortOptions.length > 0 && (
        <div className="flex items-center gap-3">
          <p className="text-sm font-light text-[#555]">Sort By:</p>
          <Select onValueChange={onSortChange}>
            <SelectTrigger className="w-[150px] h-[39px] border border-[#C0C0C0] bg-transparent font-light text-sm">
              <SelectValue placeholder={defaultSort} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

export default SectionHeader
