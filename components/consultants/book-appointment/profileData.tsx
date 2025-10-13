import { Clock, Globe } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProfileData = () => {
    const languages = ['English', 'Yoruba', 'Hausa']
  return (
    <div className='w-[348px] bg-[#F7F7F7] space-y-5 border-[#D7D7D7] border-[1px] rounded-[32px] p-[24px]'>
            <div className='space-y-2'>
              <Image src={'/fb4996dd2f3bece621cfd3cf3a8f5361a14ddc31.jpg'} alt={''} width={100} height={100} className='w-[300px] h-[222px] object-cover' />
              <h2 className='font-semibold text-[24px]'>Dr. Zainab Aliyu</h2>
              <p className='text-[16px] font-light pb-2'>Neurosurgery </p>
            </div>
            <span className='text-[14px] text-[#A2A2A2] font-light'>Lagos State Teaching Hospital</span>
            <div className='flex flex-wrap gap-3'>
              <span className='bg-[#ABEFC6] rounded-full text-[14px] font-light py-[4px] px-[12px]'>Brain Tumour Surgery</span>
              <span className='bg-[#84FEFC] rounded-full text-[14px] font-light py-[4px] px-[12px]'>Spinal Disorders & Surgery</span>
            </div>
            <div className='space-y-3'>
              <span className='text-[14px] font-light flex items-center gap-2'>
                            <Globe className='w-[20px] h-[20px]' />                                 
                            {languages.map((lang, i) => (
                                <span key={i}>
                                    • {lang}
                                    {i !== languages.length - 1 && ' '}
                                </span>
                            ))}
              </span>
              <span className='text-[14px] font-light flex items-center gap-2'>
                <Clock className='w-[20px] h-[20px]' /> 12 Years of experience 
              </span>
            </div>
            <div className='w-full'>
              <div className='border-[#313131] flex items-center justify-center gap-3 border-[1px] p-[24px] py-[16px] rounded-[16px] h-[58px] w-full text-[16px] font-semibold'>
                ₦ 100,000<span className='text-[#A2A2A2] text-[10px] font-medium uppercase'>
                / Consultation</span>
              </div>
            </div>
          </div>
  )
}

export default ProfileData
