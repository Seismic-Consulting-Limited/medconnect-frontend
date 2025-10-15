import React from 'react'

const TeleMedicine = () => {
  return (
    <div className='space-y-5'>
        <h2 className="text-[24px] font-bold mt-3">Healthcare from the comfort of your home.</h2>
        <p className="text-[#717171] text-[18px] text-light">Telemedicine on MedKonnect lets you meet Consultants online securely.</p>

        <div className='space-y-3'>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>1. Book a Session</h3>
                <ul className='space-y-2 list-disc ml-8'>
                    <li className='text-[18px] font-light text-[#313131]'>Pick your doctor and service type (telemedicine).</li>
                    <li className='text-[18px] font-light text-[#313131]'>Select a date and available time slot.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Upload any supporting documents (lab results, scans).</li>
                </ul>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>2. Payment & Confirmation</h3>
                <p className='text-[18px] font-light text-[#313131]'>Pay securely online. Once confirmed, you’ll get a calendar invite with session details.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>3. Attend Your Call</h3>
                <p className='text-[18px] font-light text-[#313131]'>Join through Google Meet or Zoho at the scheduled time. A reminder banner appears 15 minutes before your session.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>4. After Call</h3>
                <ul className='space-y-2 list-disc ml-8'>
                    <li className='text-[18px] font-light text-[#313131]'>Mark the session as complete.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Leave a review and rating.</li>
                    <li className='text-[18px] font-light text-[#313131]'>If the doctor doesn’t show up, report the appointment easily.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default TeleMedicine
