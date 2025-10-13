'use client'

import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface ReviewCardProps {
  name: string
  date: string
  rating: number
  title: string
  comment: string
  image: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  rating,
  title,
  comment,
  image,
}) => {
  return (
    <div className="w-[348px] bg-white shadow border border-[#D7D7D7]/70 p-6 rounded-[24px] space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-full w-[48px] h-[48px] object-cover border-[1px] border-[#717171]"
          />
          <div>
            <h3 className="text-[16px] font-semibold">{name}</h3>
            <p className="text-[12px] font-light text-[#A2A2A2]">{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[18px]">
          <span>{rating.toFixed(1)}</span>
          <Star className="w-[20px] h-[20px] text-[#F79009]" />
        </div>
      </div>

      {/* Review Content */}
      <div>
        <h4 className="text-[16px] font-semibold">{title}</h4>
        <p className="text-[15px] font-light mt-2 leading-relaxed text-[#333]">
          {comment}
        </p>
      </div>
    </div>
  )
}

export default ReviewCard
