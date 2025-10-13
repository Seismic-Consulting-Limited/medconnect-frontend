import React from 'react'
import { Button } from '../ui/button'

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
    <div className="p-[24px] rounded-[32px] bg-[#F7F7F7] border border-[#D7D7D7] space-y-3 text-left">
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
    </div>
  )
}

export default ExperienceData
