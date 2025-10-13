'use client'
import React from 'react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Banknote, Calendar1, Clock, CloudUpload, DownloadCloud, File, Hash, Receipt, Stethoscope, Video } from 'lucide-react'
import BookingInfoRow from '../consultants/book-appointment/InfoRow'
import { Button } from '../ui/button'

interface PaymentSummaryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: any
}

const PaymentSummary = ({ open, onOpenChange, payment }: PaymentSummaryProps) => {
  if (!payment) return null

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'Confirmed':
            return 'text-[#079455] border-[0.5px] border-[#079455] bg-[#DCFAE6] h-[39px] py-[8px] px-[16px] text-[14px] rounded-full'
        case 'Pending':
            return 'text-[#DC6803] border-[0.5px] border-[#DC6803] bg-[#FEF0C7] h-[39px] py-[8px] px-[16px] text-[14px] rounded-full'
        case 'Failed':
            return 'text-[#D92D20] border-[0.5px] border-[#B42318] bg-[#FEE4E2] h-[39px] py-[8px] px-[16px] text-[14px] rounded-full'
        case 'Refunded':
            return 'text-[#155EEF] border-[0.5px] border-[#155EEF] bg-[#E0EAFF] h-[39px] py-[8px] px-[16px] text-[14px] rounded-full'
        default:
            return ''
        }
    }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="!max-w-none !w-[508px] bg-white px-6 py-4 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-[24px] pb-5">Payment Receipt</SheetTitle>
        </SheetHeader>

        {/* Doctor Info */}
        <div className='border-b py-5 space-y-2'>
            <div className='w-[60px] h-[61px] bg-[#F2F2F2] border-[0.5] border-[#D7D7D7] flex items-center justify-center mx-auto rounded-full'>
                <Receipt />
            </div>
            <h2 className="text-[24px] font-semibold text-center">₦100,000</h2>
        </div>

        {/* Payment Info */}
        <div>
            <p className='mt-10 text-[14px] text-[#313131]'>Payment Summary</p>
            <div className="flex items-center justify-between py-[12px] border-b mt-5">
                <span className="text-[18px] font-light text-[#A2A2A2]">Status</span>
                <span
                className={` ${getStatusStyle(
                    payment.status
                )}`}
                >
                {payment.status}
                </span>
            </div>

          <BookingInfoRow
            label="Reference ID"
            value={
              <>
                <Hash className="w-[20px] h-[21px]" color="#00C7BE" />
                {payment?.referenceId}
              </>
            }
          />

          <BookingInfoRow
            label="Payment Date"
            value={
              <>
                <Calendar1 className="w-[20px] h-[21px]" color="#007AFF" />{' '}
                {payment.date}
              </>
            }
          />

          <BookingInfoRow
            label="Payment Time"
            value={
              <>
                <Clock className="w-[20px] h-[21px]" color="#FF9500" />{' '}
                {payment.time}
              </>
            }
          />

        </div>
                {/* Payment Info */}
        <div>
            <p className='mt-10 text-[14px] text-[#313131]'>Service Details</p>

            <BookingInfoRow
                label="Service Type"
                value={
                <>
                    <Video className="w-[20px] h-[21px]" color="#AF52DE" />
                    Telemedicine (Video Call)
                </>
                }
            />

            <BookingInfoRow
                label="Doctor"
                value={
                <>
                    <Stethoscope className="w-[20px] h-[21px]" color="#007AFF" />{' '}
                    Dr. Zainab Aliyu
                </>
                }
            />

            <BookingInfoRow
                label="Appointment Date"
                value={
                <>
                    <Calendar1 className="w-[20px] h-[21px]" color="#34C759" />{' '}
                    28 August 2025
                </>
                }
            />

            <BookingInfoRow
                label="Appointment Time"
                value={
                <>
                    <Clock className="w-[20px] h-[21px]" color="#FF9500" />{' '}
                   3:00 PM
                </>
                }
            />
        </div>
        <div className="w-full absolute grid grid-cols-2  gap-5 bottom-5 left-0 mt-6 pb-4 px-5 pt-3">
            <Button className='py-[12px] px-[20px] h-[47px] text-[14px]'>
                <DownloadCloud />
                Download Reciept
            </Button>
            <Button variant={'outline'} className='py-[12px] px-[20px] h-[47px] text-[14px]'>
                Report Transaction
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default PaymentSummary
