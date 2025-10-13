import { Star } from 'lucide-react'
import React from 'react'
import { Card } from '../ui/card'

type RatingDataProps = {
  rating: number
  totalReviews: number
}

const RatingData: React.FC<RatingDataProps> = ({ rating, totalReviews }) => {
  // Get number of filled and unfilled stars
  const filledStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const totalStars = 5

  return (
    <Card className="w-full sm:w-[436px] p-[48px] text-center space-y-3">
      {/* Rating Number */}
      <h2 className="text-[48px] font-bold">
        {rating.toFixed(1)}
        <span className="text-[#A2A2A2] text-[24px] font-medium"> / 5</span>
      </h2>

      {/* Stars */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalStars }).map((_, index) => {
          const isFilled = index < filledStars
          const isHalf = hasHalfStar && index === filledStars
          return (
            <Star
              key={index}
              className="w-[32px] h-[32px]"
              color={isFilled || isHalf ? '#7E22CE' : '#D7D7D7'}
              fill={isFilled ? '#7E22CE' : isHalf ? 'url(#half)' : 'none'}
            />
          )
        })}
      </div>

      {/* Reviews */}
      <p className="text-[16px] font-semibold text-[#A2A2A2]">
        ({totalReviews.toLocaleString()} Verified Ratings)
      </p>
    </Card>
  )
}

export default RatingData
