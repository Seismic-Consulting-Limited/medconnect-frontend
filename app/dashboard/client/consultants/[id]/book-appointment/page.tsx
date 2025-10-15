import DatePicker from '@/components/consultants/book-appointment/datePicker'
import ProfileData from '@/components/consultants/book-appointment/profileData'
import TimeComponent from '@/components/consultants/book-appointment/timeComponent'
import { ArrowLeft, Upload } from 'lucide-react'
import React from 'react'

const BookAppointmentPage = () => {
  return (
    <div>
        <div className='bg-white shadow flex items-center gap-5 h-[92px] p-[24px]'>
            <ArrowLeft className='w-[20px] h-[20px]' />
            <div>
                <span className='flex items-center gap-3 text-[#C0C0C0] text-[14px] font-light'>Consultants <div></div> <p className='text-text'>Dr. Zainab Aliyu</p></span>
            </div>
        </div>
        <div className='p-5 flex items-start gap-5'>
          <ProfileData />
          <div className='flex items-start gap-5'>
            <DatePicker />
            <TimeComponent />
          </div>
        </div>
    </div>
  )
}

export default BookAppointmentPage
