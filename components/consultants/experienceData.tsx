import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import Image from 'next/image'

// Example experience data (can be fetched or imported later)
const experiences = [
  {
    role: 'Consultant Neurosurgeon',
    hospital: 'Lagos University Teaching Hospital (LUTH), Lagos',
    duration: '2016 - Present',
  },
  {
    role: 'Senior Registrar, Neurosurgery',
    hospital: 'University College Hospital (UCH), Ibadan',
    duration: '2012 - 2016',
  },
  {
    role: 'Resident Medical Officer',
    hospital: 'National Hospital, Abuja',
    duration: '2009 - 2012',
  },
]

const ExperienceData = () => {
  return (
    <Card className="p-[24px] space-y-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold">Experiences</h3>
        <Button variant="outline" className="bg-transparent font-light">
          View All
        </Button>
      </div>

      {/* Experiences list */}
      {experiences.map((exp, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="w-[8px] h-[8px] rounded-full bg-text mt-1"></span>
          <div>
            <h3 className="text-[14px] font-light">{exp.role}</h3>
            <p className="text-[#A2A2A2] text-[12px] font-medium">
              {exp.hospital}
            </p>
            <span className="text-[10px] font-semibold">{exp.duration}</span>
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

export default ExperienceData
