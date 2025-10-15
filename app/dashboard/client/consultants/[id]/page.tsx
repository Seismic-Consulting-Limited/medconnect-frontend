'use client'

import EducationalData from '@/components/consultants/educationalData'
import ExperienceData from '@/components/consultants/experienceData'
import ProfileData from '@/components/consultants/profileData'
import RatingData from '@/components/consultants/ratingData'
import RatingDistribution from '@/components/consultants/ratingDistribution'
import ReviewCard from '@/components/hospital/hospitalDetails/reviewCard'
import SectionHeader from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { reviews } from '@/constant/hospitalData'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ConsultantDetailsPage = () => {
    const router = useRouter()
    const handleSortChange = (value: string) => {
        console.log('Sort by:', value)
        // Add sorting logic here later
    }
  return (
    <div>
        <div className='bg-white shadow flex items-center gap-5 h-[92px] p-[24px]'>
            <ArrowLeft className='w-[20px] h-[20px]' />
            <div>
                <span className='flex items-center gap-3 text-[#C0C0C0] text-[14px] font-light'>Consultants <div></div> <p className='text-text'>Dr. Zainab Aliyu</p></span>
            </div>
        </div>
        <div className='p-5 flex gap-5'>
            <div className='w-[720px] text-center space-y-5'>
                <ProfileData />
                <Card className='p-[24px] space-y-3 text-left'>
                    <h2 className='text-[18px] font-semibold'>About</h2>
                    <p className='text-[16px] font-light'>
                        Dr. Zainab Aliyu is an accomplished neurosurgeon with expertise in treating disorders of the brain, spine, and nervous system. 
                        She is known for her precision in performing complex surgical procedures and her patient-centred approach to care. With years 
                        of clinical and surgical experience, Dr. Aliyu has supported both local and international patients, delivering world-class outcomes in neurosurgery.
                    </p>
                </Card>
            </div>
            <div className='w-[472px] space-y-5'>
                <EducationalData />
                <ExperienceData />
                <div className='grid grid-cols-2 gap-5'>
                    <span className='border-[#313131] border-[1px] p-[24px] py-[16px] rounded-[16px] h-[58px] text-[16px] font-semibold'>₦ 100,000<span className='text-[#A2A2A2] text-[10px] font-medium uppercase'>/ Consultation</span></span>
                    <Button onClick={() => router.push(`/dashboard/consultants/cbsjdh/book-appointment`)} className='px-[24px] py-[16px] rounded-[16px] text-[16px] h-[58px]'>Book an Appointment</Button>
                </div>
            </div>
        </div>
        <div className='p-5 flex items-start gap-5'>
            <RatingData rating={4.3} totalReviews={375} />
            <RatingDistribution />
        </div>
        <div className='p-5'>
            <div className='w-[1216px] space-y-5'>
                <SectionHeader
                    title="Review List"
                    totalCount={375}
                    visibleCount={reviews.length}
                    sortOptions={[
                    { value: 'rating', label: 'Top Rated' },
                    { value: 'location', label: 'Nearest' },
                    { value: 'reviews', label: 'Most Reviewed' },
                    ]}
                    onSortChange={handleSortChange}
                    defaultSort="Newest"
                />
                {/* Review Cards */}
                <div className="flex flex-wrap gap-6">
                    {reviews.map((review, i) => (
                        <ReviewCard key={i} {...review} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConsultantDetailsPage
