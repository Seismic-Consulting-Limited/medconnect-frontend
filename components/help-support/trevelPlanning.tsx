import React from 'react'

const TrevelPlanning = () => {
  return (
    <div className='space-y-5'>
        <h2 className="text-[24px] font-bold mt-3">Plan your medical journey without stress.</h2>
        <p className="text-[#717171] text-[18px] text-light">If you’re travelling for treatment, MedKonnect connects you with trusted travel agents.</p>

        <div className='space-y-3'>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>1. Find Travel Agents</h3>
                <p className='text-[18px] font-light text-[#313131]'>Browse accredited agents who specialise in medical travel.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>2. Explore Packages</h3>
                <ul className='space-y-2 list-disc ml-8'>
                    <li className='text-[18px] font-light text-[#313131]'>Flights (local & international)</li>
                    <li className='text-[18px] font-light text-[#313131]'>Hotels or serviced apartments</li>
                    <li className='text-[18px] font-light text-[#313131]'>Airport transfers</li>
                    <li className='text-[18px] font-light text-[#313131]'>Visa assistance</li>
                </ul>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>3. Book & Confirm</h3>
                <p className='text-[18px] font-light text-[#313131]'>Choose the package that suits your needs and budget. Pay securely and get a full itinerary from your agent.</p>
            </div>
        </div>
    </div>
  )
}

export default TrevelPlanning
