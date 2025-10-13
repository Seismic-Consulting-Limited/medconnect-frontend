// components/consultations/dashboardCard.tsx
import React from 'react'
import { Card } from '../ui/card'

interface DashboardCardProps {
  title: string
  icon: React.ReactNode
  value: number | string
  description: string
  bgColor?: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  value,
  description,
  bgColor = '#007AFF',
}) => {
  return (
    <Card className='flex flex-col justify-center w-full h-[196px]'>
      <div className='flex items-center gap-3 px-[16px]'>
        <div
          className='w-[40px] h-[40px] flex items-center justify-center rounded-full'
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
        <h2 className='text-[16px] font-medium'>{title}</h2>
      </div>
      <div className='px-[16px]'>
        <h1 className='text-[48px] font-semibold'>{value}</h1>
        <p className='text-[16px] font-light text-[#717171]'>{description}</p>
      </div>
    </Card>
  )
}

export default DashboardCard
