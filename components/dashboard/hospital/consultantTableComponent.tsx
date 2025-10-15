import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, Stethoscope } from 'lucide-react'
import React from 'react'
import ConsultantsTable from './consultantsTable'

const ConsultantTableComponent = () => {
  return (
    <Card className='w-full'>
        <CardHeader >
            <div className="flex items-center gap-3 text-text">
                <Stethoscope className="w-[24px] h-[24px]" />
                <h2 className="text-[18px] font-semibold">Consultants <span className='font-light text-[#717171]'>(45)</span></h2>
            </div>
        </CardHeader>
        <CardContent>
            <ConsultantsTable />
        </CardContent>
    </Card>
  )
}

export default ConsultantTableComponent
