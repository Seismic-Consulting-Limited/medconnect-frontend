import React from 'react'

const HospitalConsultants = () => {
  return (
    <div className='space-y-5'>
        <h2 className="text-[24px] font-bold mt-3">Find the right care with confidence.</h2>
        <p className="text-[#717171] text-[18px] text-light">MedKonnect makes it easy to connect with accredited hospitals and qualified Consultants.</p>

        <div className='space-y-3'>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>1. Search Smarter</h3>
                <p className='text-[18px] font-light text-[#313131]'>Use filters for specialty, location, and rating to narrow your search. Patients can also search by hospital name or doctor’s name directly.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>2. Compare Hospitals</h3>
                <ul className='space-y-2 list-disc ml-8'>
                    <li className='text-[18px] font-light text-[#313131]'>Compare up to 3 hospitals side-by-side.</li>
                    <li className='text-[18px] font-light text-[#313131]'>See facilities, treatments, pricing, and reviews in one view.</li>
                </ul>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>3. Doctor Profiles. Each doctor’s profile includes:</h3>
                <ul className='space-y-2 list-disc ml-8'>
                    <li className='text-[18px] font-light text-[#313131]'>Specialty and qualifications.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Years of experience.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Consultation fee.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Consultation fee.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Patient reviews and ratings.</li>
                </ul>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>4. Your First Booking</h3>
                <p className='text-[18px] font-light text-[#313131]'>Choose a doctor or hospital, pick a date and time, and make payment to confirm. You’ll get instant confirmation and reminders.</p>
            </div>
        </div>
    </div>
  )
}

export default HospitalConsultants
