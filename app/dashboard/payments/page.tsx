'use client'

import TableHeading from '@/components/consultations/tableHeading'
import PaymentTables from '@/components/payments/paymentTables'
import { Button } from '@/components/ui/button'
import { payments } from '@/constant/consultationData'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PaymentsPage = () => {
    const tabItems = [
        { label: 'All', value: 20 },
        { label: 'Confirmed', value: 13 },
        { label: 'Pending', value: 8 },
        { label: 'Failed', value: 2 },
    ]

    const sortOptions = [
        { label: 'Date', value: 'date' },
        { label: 'Name', value: 'name' },
        { label: 'Status', value: 'status' },
    ]

  return (
    <div className='w-[1216px] p-5'>
        <div className='p-5 border border-[#D7D7D7] bg-[#F7F7F7] rounded-[32px]'>
            <TableHeading
              title="Telemedicine Sessions"
              tabs={tabItems}
              sortOptions={sortOptions}
              onTabChange={(tab) => console.log('Active Tab:', tab)}
              onSortChange={(value) => console.log('Sort By:', value)}
            />
            <PaymentTables />
        </div>
        {
            payments.length === 0 && (
                <div className='text-center w-[428px] mx-auto space-y-5 mt-10'>
                    <Image src={'/320d58cda9680e119e0030fce1030c987d0a8797.png'} alt={''} width={100} height={100} className='mx-auto w-[84px] h-[84px]' />
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

export default PaymentsPage
