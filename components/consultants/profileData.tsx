import { Clock, Globe } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { Card } from '../ui/card'

const ProfileData = () => {
    const languages = ['English', 'Yoruba', 'Hausa']
  return (
               <Card className='p-[24px] space-y-2'>
                    <Image src={'/fb4996dd2f3bece621cfd3cf3a8f5361a14ddc31.jpg'} alt={''} width={0} height={0} className='object-cover w-[222px] h-[222px] rounded-[32px] border-[0.5px] border-[#D7D7D7] mx-auto' />
                    <h2 className='text-[24px] font-semibold'>Dr. Zainab Aliyu</h2>
                    <span className='text-[#717171] text-[18px] font-light flex items-center gap-5 justify-center'>Neurosurgery <span className='bg-[#E6E6E6] rounded-full w-[8px] h-[8px]'></span> Lagos State Teaching Hospital</span>
                    <div className='space-x-3'>
                        <span className='bg-[#ABEFC6] rounded-full text-[14px] font-light py-[4px] px-[12px]'>Brain Tumour Surgery</span>
                        <span className='bg-[#84FEFC] rounded-full text-[14px] font-light py-[4px] px-[12px]'>Spinal Disorders & Surgery</span>
                    </div>
                    <div className='flex items-center justify-center gap-10'>
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
                </Card>
  )
}

export default ProfileData
