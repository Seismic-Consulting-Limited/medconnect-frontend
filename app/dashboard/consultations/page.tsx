// app/consultations/page.tsx
'use client'

import DashboardCard from '@/components/consultations/dashboardCard'
import { Video, CalendarCheck, Users, X, Plus } from 'lucide-react'
import React from 'react'
import TableHeading from '@/components/consultations/tableHeading'
import SessionTable from '@/components/consultations/sessionTable'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { sessions } from '@/constant/consultationData'
import { Card } from '@/components/ui/card'

const ConsultationsPage = () => {
  // Sample data for cards
  const dashboardData = [
    {
      id: 1,
      title: 'Completed Sessions',
      icon: <Video className='w-[24px] h-[24px]' color='white' />,
      value: 12,
      description: 'Total number of completed sessions',
      bgColor: '#007AFF',
    },
    {
      id: 2,
      title: 'Upcoming Sessions',
      icon: <CalendarCheck className='w-[24px] h-[24px]' color='white' />,
      value: 5,
      description: 'Total number of upcoming sessions',
      bgColor: '#F79009',
    },
    {
      id: 3,
      title: 'Cancelled Sessions',
      icon: <X className='w-[24px] h-[24px]' color='white' />,
      value: 28,
      description: 'Total number of cancelled sessions',
      bgColor: '#D92D20',
    },
  ]

  const tabItems = [
    { label: 'All', value: 20 },
    { label: 'Completed', value: 13 },
    { label: 'Upcoming', value: 8 },
    { label: 'Cancelled', value: 2 },
  ]

  const sortOptions = [
    { label: 'Date', value: 'date' },
    { label: 'Name', value: 'name' },
    { label: 'Status', value: 'status' },
  ]

  return (
    <div className='w-full p-5 space-y-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {dashboardData.map((card) => (
                <DashboardCard
                key={card.id}
                title={card.title}
                icon={card.icon}
                value={card.value}
                description={card.description}
                bgColor={card.bgColor}
                />
            ))}
        </div>

        <Card className='p-5'>
            <TableHeading
              title="Telemedicine Sessions"
              tabs={tabItems}
              sortOptions={sortOptions}
              onTabChange={(tab) => console.log('Active Tab:', tab)}
              onSortChange={(value) => console.log('Sort By:', value)}
            />
            <SessionTable />
        </Card>

        {
          sessions.length === 0 && (
            <div className='text-center w-[428px] mx-auto space-y-5 mt-10'>
              <Image src={'/0a4b22370c49dbdd503635fb34217daec988258b.png'} alt={''} width={100} height={100} className='mx-auto w-[84px] h-[84px]' />
              <h2 className='font-semibold text-[18px]'>No Payments Found</h2>
              <p className='font-light text-[14px] text-[#717171]'>You haven’t made any payments yet. Once you book a doctor, hospital, or travel package, your transactions will appear here.</p>
              <Button variant={'outline'} className='text-[14px] text-[#313131] py-[8px] px-[16px] h-[39px]'>
                  <Plus />
                  Book a Doctor
              </Button>
            </div>
          )
        }
    </div>
  )
}

export default ConsultationsPage
