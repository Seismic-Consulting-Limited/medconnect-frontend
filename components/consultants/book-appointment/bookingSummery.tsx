import React from 'react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingInfoRow from './InfoRow'
import { Banknote, Calendar1, Clock, Cloud, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BookingSummery = () => {
  return (
    <Sheet>
        <SheetTrigger className='w-full'>
            <Button className='w-full font-light text-[16px]'>Next | <span className='text-[#B173E8]'>View Booking Summery</span></Button>
        </SheetTrigger>
      <SheetContent
        side="right"
        className="!max-w-none !w-[508px] bg-white px-6 py-4 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-[24px] pb-5">Booking Summary</SheetTitle>
        </SheetHeader>

        {/* Doctor Info */}
        <div className="flex items-center gap-4 py-5 border-y">
          <Image
            src="/fb4996dd2f3bece621cfd3cf3a8f5361a14ddc31.jpg"
            alt={'doctor'}
            width={112}
            height={112}
            className="w-[112px] h-[112px] rounded-full object-cover"
          />
          <div>
            <h2 className="text-[24px] font-semibold">Dr Young Savage</h2>
            <p className="text-[18px] font-light">Neurosurgery </p>
            <span className="text-[14px] text-[#A2A2A2] font-light">
              #A2A2A2
            </span>
          </div>
        </div>

        {/* Booking Info */}
        <div>
            <BookingInfoRow
                label="Date"
                value={
                <>
                    <Calendar1 className="w-[20px] h-[21px]" color="#007AFF" /> {'28 August 2025'}
                </>
                }
            />
            <BookingInfoRow
                label="Time"
                value={
                <>
                    <Clock className="w-[20px] h-[21px]" color="#FF9500" /> {'10:00 AM'}
                </>
                }
            />
            <BookingInfoRow
                label="File"
                value={
                <>
                    <Cloud className="w-[20px] h-[21px]" color="#00C7BE" /> {'1 Document Uploaded'}
                </>
                }
            />
            <BookingInfoRow
                label="Type"
                value={
                <>
                    <Video className="w-[20px] h-[21px]" color="#AF52DE" /> {'Telemedicine (Video Call)'}
                </>
                }
            />
            <BookingInfoRow
                label="Fee"
                value={
                <>
                    <Banknote className="w-[20px] h-[21px]" color="#34C759" /> {'NGN 10,000'}
                </>
                }
                borderBottom={false}
            />
        </div>

       {/* Action buttons */}
      <div className="w-full absolute bottom-5 left-0 mt-6 pb-4 px-5 pt-3">
            <Button className='w-full font-light text-[16px]'>Confirm & Proceed to Payment</Button>
      </div>

      </SheetContent>
    </Sheet>
  )
}

export default BookingSummery
