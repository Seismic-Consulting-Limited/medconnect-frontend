import React from 'react'

const AccountSecurity = () => {
  return (
    <div className='space-y-5'>
        <h2 className="text-[24px] font-bold mt-3">Account & Security</h2>
        <p className="text-[#717171] text-[18px] text-light">Stay in control of your profile and data.</p>

        <div className='space-y-3'>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>1. Manage Your Profile</h3>
                <p className='text-[18px] font-light text-[#313131]'>Update your personal details, upload medical documents, and set preferences anytime.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>2. Stay Secure</h3>
                <ul className='space-y-2 list-disc ml-8'>
                    <li className='text-[18px] font-light text-[#313131]'>Change your password regularly.</li>
                    <li className='text-[18px] font-light text-[#313131]'>Monitor activity logs to spot unusual login attempts.</li>
                </ul>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>3. Notifications</h3>
                <p className='text-[18px] font-light text-[#313131]'>Control how you receive updates (email, SMS).</p>
            </div>
        </div>
    </div>
  )
}

export default AccountSecurity
