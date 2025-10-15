import React from 'react'

const GetStarted = () => {
  return (
    <div className='space-y-5'>
        <h2 className="text-[24px] font-bold mt-3">Welcome To MedKonnect</h2>
        <p className="text-[#717171] text-[18px] text-light">MedKonnect connects patients with top Nigerian hospitals, Consultants, and travel agents. If you’re new, here’s how to get up and running quickly.</p>

        <div className='space-y-3'>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>1: Create Your Account</h3>
                <p className='text-[18px] font-light text-[#313131]'>Sign up with your email address and a secure password. You’ll receive a verification link in your inbox — click it to confirm your email.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>2. Complete Your Profile</h3>
                <p className='text-[18px] font-light text-[#313131]'>After logging in, add your personal details such as name, gender, date of birth, and contact information. This makes your bookings smoother and ensures Consultants have the right context for consultations.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>3. Explore Core Specialties</h3>
                <ul className='space-y-2 list-disc ml-8'>
                    <li className='text-[18px] font-light text-[#313131]'>Book a Doctor → Search for specialists by name, specialty, or hospital.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Find a Hospital → Compare facilities, treatments, and reviews.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Plan Your Travel → Connect with agents for flights, visas, and accommodation.</li>
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

export default GetStarted
