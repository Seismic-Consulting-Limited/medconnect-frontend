import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

const ActivityCard = ({activity}: any) => {
  return (
    <div>
      <div
            className="py-[12px] space-y-1 px-[16px] h-[100px] flex flex-col justify-center hover:bg-[#FAFAFA] transition"
          >
            <h3 className="text-[15px] font-light text-text leading-snug">
              {activity.title}
            </h3>
            <small className="text-[14px] text-text">{activity.category}</small>
            <p className="text-[13px] font-extralight text-[#717171]">
              {activity.date}
            </p>
        </div>
    </div>
  )
}

export default ActivityCard
