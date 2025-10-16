import { GraduationCap } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import Image from 'next/image'

// Example data (you can later fetch this dynamically)
const educationData = [
  {
    degree: 'PhD in Neurosurgery Research',
    institution: 'Harvard Medical School, USA',
  },
  {
    degree: 'MSc in Neuroscience',
    institution: 'University College London (UCL), UK',
  },
  {
    degree: 'MBBS in Medicine & Surgery',
    institution: 'University of Lagos, Nigeria',
  },
]

const EducationalData = () => {
  return (
    <Card className="p-[24px] space-y-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold">Education</h3>
        <Button variant="outline" className="bg-transparent font-light">
          View All
        </Button>
      </div>

      {/* Education List */}
      {educationData.map((edu, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="bg-[#7E22CE] w-fit rounded-[8px] p-[8px]">
            <GraduationCap color="#E4CFF7" className="w-[18px] h-[18px]" />
          </div>
          <div>
            <h3 className="text-[14px] font-light">{edu.degree}</h3>
            <p className="text-[#A2A2A2] text-[12px] font-medium">
              {edu.institution}
            </p>
          </div>
        </div>
      ))}
      {/* <div className='text-center'>
        <Image src={'/656ace3343108ba489409295e4052a077b9fb31a.png'} alt={''} width={100} height={100} className='mx-auto' />
        <p className='text-[14px] font-light text-[#717171]'>This Consultant has not written their profile summary yet. Patients will see more value when Consultants share their expertise and experience.</p>
        <Button variant={'outline'} className='px-[24px] py-[16px] rounded-[16px] text-[16px] h-[58px] font-light'>Notify Consultant to Update Profile</Button>
      </div> */}
    </Card>
  )
}

export default EducationalData
