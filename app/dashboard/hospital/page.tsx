import ConsultantTableComponent from '@/components/dashboard/hospital/consultantTableComponent'
import ActivityContainer from '@/components/telemedicine/activity'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChevronRight, Hospital, Stethoscope } from 'lucide-react'
import React from 'react'

const HospitalDashboardPage = () => {
  return (
    <div>
      <div className='px-5 mt-5 grid grid-cols-3 gap-5'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full w-[40px] h-[40px] bg-[#7E22CE] flex items-center justify-center'>
                  <Stethoscope color='white' />
                </div>
                <h2>Consultants</h2>
              </div>
              <div className='rounded-full w-[40px] h-[40px] bg-[#E6E6E6] flex items-center justify-center'>
                <ChevronRight />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h1 className='text-[60px] font-bold'>0</h1>
            <p className='font-light text-[#717171] text-[16px]'>Total number of consultants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full w-[40px] h-[40px] bg-[#30B0C7] flex items-center justify-center'>
                  <Hospital color='white' />
                </div>
                <h2>Nurses</h2>
              </div>
              <div className='rounded-full w-[40px] h-[40px] bg-[#E6E6E6] flex items-center justify-center'>
                <ChevronRight />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h1 className='text-[60px] font-bold'>0</h1>
            <p className='font-light text-[#717171] text-[16px]'>Total number of nurses</p>
          </CardContent>
        </Card>
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col items-start lg:flex-row gap-6 mt-5 px-5">
        <ActivityContainer />
        <ConsultantTableComponent />
      </div>
    </div>
  )
}

export default HospitalDashboardPage
