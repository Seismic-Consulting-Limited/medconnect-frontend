import React from 'react'

const ReviewRating = () => {
  return (
    <div className='space-y-5'>
        <h2 className="text-[24px] font-bold mt-3">Your feedback matters.</h2>
        <p className="text-[#717171] text-[18px] text-light">Reviews help other patients choose wisely and keep providers accountable.</p>

        <div className='space-y-3'>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>1. Leave a Review</h3>
                <p className='text-[18px] font-light text-[#313131]'>After a consultation, you’ll be prompted to rate your doctor, hospital, or travel agent.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>2. Star Ratings</h3>
                <p className='text-[18px] font-light text-[#313131]'>After a consultation, you’ll be prompted to rate your doctor, hospital, or travel agent.</p>
            </div>
        </div>
    </div>
  )
}

export default ReviewRating
