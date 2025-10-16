import EducationalData from '@/components/consultants/educationalData'
import ExperienceData from '@/components/consultants/experienceData'
import ProfileData from '@/components/consultants/profileData'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ConsultantDetailsPage = () => {
  return (
    <div>
      <div className='bg-white shadow flex items-center gap-5 h-[92px] p-[24px]'> 
            <ArrowLeft className='w-[20px] h-[20px]' /> 
            <div> 
                <span className='flex items-center gap-3 text-[#C0C0C0] text-[14px] font-light'>
                    Consultants 
                    <div>
                    </div> 
                    <p className='text-text'>Dr. Zainab Aliyu</p>
                </span> 
            </div> 
        </div>

        <div className='p-5 flex gap-5'>
            <div className='w-[720px] text-center space-y-5'>
                <ProfileData />
                <Card className='p-[24px] space-y-3 text-left'>
                    <h2 className='text-[18px] font-semibold'>About</h2>
                    <p className='text-[16px] font-light text-[#717171]'>
                        Dr. Zainab Aliyu is an accomplished neurosurgeon with expertise in treating disorders of the brain, spine, and nervous system. 
                        She is known for her precision in performing complex surgical procedures and her patient-centred approach to care. With years 
                        of clinical and surgical experience, Dr. Aliyu has supported both local and international patients, delivering world-class outcomes in neurosurgery.
                    </p>
                    {/* <div className='text-center'>
                        <Image src={'/656ace3343108ba489409295e4052a077b9fb31a.png'} alt={''} width={100} height={100} className='mx-auto' />
                        <p className='text-[14px] font-light text-[#717171]'>This Consultant has not written their profile summary yet. Patients will see more value when Consultants share their expertise and experience.</p>
                        <Button variant={'outline'} className='px-[24px] py-[16px] rounded-[16px] text-[16px] h-[58px] font-light'>Notify Consultant to Update Profile</Button>
                    </div> */}
                </Card>
            </div>
            <div className='w-[472px] space-y-5'>
                <EducationalData />
                <ExperienceData />
                <div className='grid grid-cols-2 gap-5'>
                    <Button className='px-[24px] py-[16px] rounded-[16px] text-[16px] h-[58px] font-light'>Edit Profile</Button>
                    <Button variant={'outline'} className='px-[24px] py-[16px] rounded-[16px] text-[16px] h-[58px] text-[#F04438] border-[#F04438] font-light'>Archive Consultant</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConsultantDetailsPage
