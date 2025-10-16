import ConsultantTableComponent from '@/components/dashboard/hospital/consultantTableComponent'
import ActivityContainer from '@/components/telemedicine/activity'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChevronRight, Hospital, Stethoscope } from 'lucide-react'
import React from 'react'

const HospitalDashboardPage = () => {
  // ✅ Step 1: Create an array of summary cards
  const summaryCards = [
    {
      title: 'Consultants',
      count: 0,
      description: 'Total number of consultants',
      iconBg: '#7E22CE',
      icon: <Stethoscope color='white' />,
    },
    {
      title: 'Nurses',
      count: 0,
      description: 'Total number of nurses',
      iconBg: '#30B0C7',
      icon: <Hospital color='white' />,
    },
    // 👇 You can easily add more
    // {
    //   title: 'Patients',
    //   count: 0,
    //   description: 'Total number of patients',
    //   iconBg: '#F59E0B',
    //   icon: <User color="white" />,
    // },
  ]

  return (
    <div>
      {/* ✅ Dynamic Summary Cards */}
      <div className='px-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div
                    className='rounded-full w-[40px] h-[40px] flex items-center justify-center'
                    style={{ backgroundColor: card.iconBg }}
                  >
                    {card.icon}
                  </div>
                  <h2>{card.title}</h2>
                </div>
                <div className='rounded-full w-[40px] h-[40px] bg-[#E6E6E6] flex items-center justify-center'>
                  <ChevronRight />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h1 className='text-[60px] font-bold'>{card.count}</h1>
              <p className='font-light text-[#717171] text-[16px]'>{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ✅ Bottom Section */}
      <div className="flex flex-col items-start lg:flex-row gap-6 mt-5 px-5">
        <ActivityContainer />
        <ConsultantTableComponent />
      </div>
    </div>
  )
}

export default HospitalDashboardPage
