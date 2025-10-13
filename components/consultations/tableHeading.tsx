import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TabItem {
  label: string
  value: number
}

interface SortOption {
  label: string
  value: string
}

interface TableHeadingProps {
  title: string
  tabs: TabItem[]
  sortOptions: SortOption[]
  defaultTab?: string
  defaultSort?: string
  onTabChange?: (tab: string) => void
  onSortChange?: (value: string) => void
}

const TableHeading: React.FC<TableHeadingProps> = ({
  title,
  tabs,
  sortOptions,
  defaultTab = tabs[0]?.label || '',
  defaultSort = sortOptions[0]?.value || '',
  onTabChange,
  onSortChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [selectedSort, setSelectedSort] = useState(defaultSort)

  const handleTabClick = (tabLabel: string) => {
    setActiveTab(tabLabel)
    onTabChange?.(tabLabel)
  }

  const handleSortChange = (value: string) => {
    setSelectedSort(value)
    onSortChange?.(value)
  }

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-20">
        <h2 className="text-[16px] font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {tabs.map((tab, index) => (
            <span
              key={index}
              onClick={() => handleTabClick(tab.label)}
              className={`cursor-pointer ${
                tab.label === activeTab
                  ? 'border-[0.5px] border-[#CCA3F0] bg-[#F3E9FB] text-[#7E22CE]'
                  : 'text-[#A2A2A2]'
              } text-[12px] font-medium py-[4px] px-[16px] rounded-full`}
            >
              {tab.label} ({tab.value})
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-light text-[#555]">Sort By:</p>
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[150px] h-[39px] border border-[#C0C0C0] bg-transparent font-light text-sm">
            <SelectValue placeholder={selectedSort || 'Select'} />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option, i) => (
              <SelectItem key={i} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TableHeading
