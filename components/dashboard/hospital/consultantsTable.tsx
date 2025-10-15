import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'

const ConsultantsTable = () => {
  return (
    <div>
        <Table>
            <TableHeader>
                <TableRow className='text-[#717171]'>
                <TableHead className="">Consultant Name</TableHead>
                <TableHead>Primary Specialty</TableHead>
                <TableHead>Profile Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            {/* <TableBody>
                <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody> */}
        </Table>
        <div className="text-center py-20 space-y-2 w-full">
            <Image src={'/d39c20e3e93e46cb3db2037b492288d0f08332e9.png'} alt={''} width={100} height={100} className='mx-auto w-[84px] h-[84px]' />
            <h2 className='text-[18px] font-semibold'>No Consultants Added Yet</h2>
            <p className="w-[278px] mx-auto text-[14px] font-light text-[#717171]">You haven’t added any Consultants to your hospital profile. Add Consultants so patients can view and book them.</p>
            <Button variant={'outline'} className="text-[14px] font-light"><Plus /> Add First Consultant</Button>
        </div>
    </div>
  )
}

export default ConsultantsTable
