import React from 'react'
import Image from 'next/image'
import { Calendar, Clock, Video } from 'lucide-react'
import { Button } from '../ui/button'

const AppointmentCard = () => {
  return (
<div className="my-5 space-y-5">
            <div className="w-full flex items-center gap-5 max-h-[76px] px-5">
              <div className="w-[76px] h-[76px] rounded-full overflow-hidden">
                <Image src={'/Doctor.svg'} width={100} height={100} alt={""} className="rounded-full"  />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold">Dr. Stephen Strange</h3>
                <p className="text-[16px] font-light text-[#717171]">Cardiologist</p>
              </div>
            </div>
            <div className="grid grid-cols-2 px-5 gap-3">
              <div className="flex items-center gap-2 border-[0.5px] border-[#D7D7D7] bg-[#EDEDED] rounded-[8px] h-[39px] p-[8px]">
                <Calendar className="w-[20px] h-[20px]" color="#717171" />
                <h3 className="text-[14px] font-light text-[#717171]">25th AUG 25</h3>
              </div>
              <div className="flex items-center gap-2 border-[0.5px] border-[#D7D7D7] bg-[#EDEDED] rounded-[8px] h-[39px] p-[8px]">
                <Clock className="w-[20px] h-[20px]" color="#717171" />
                <h3 className="text-[14px] font-light text-[#717171]">2:00 PM</h3>
              </div>
            </div>

            <div className='grid grid-cols-2 px-5 gap-3'>
                <Button className='px-[20px] py-[12px] h-[47px] rounded-[12px]'>
                    <Video className='w-[20px] h-[20px]' />
                    Join Video Call
                </Button>
                <Button variant={'outline'} className='px-[20px] py-[12px] h-[47px] rounded-[12px]'>
                    Reschedule
                </Button>
            </div>
          </div>
  )
}

export default AppointmentCard
