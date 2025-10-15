import React from 'react'

const TrustSecurity = () => {
  return (
    <div className='space-y-5'>
        <h2 className="text-[24px] font-bold mt-3">Trust & Safety</h2>
        <p className="text-[#717171] text-[18px] text-light">Your safety is our priority.</p>

        <div className='space-y-3'>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>1. Verified Providers</h3>
                <p className='text-[18px] font-light text-[#313131]'>All hospitals and Consultants go through a multi-step verification including licensing and accreditation checks.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>2. Data Protection</h3>
                <p className='text-[18px] font-light text-[#313131]'>We encrypt sensitive data and follow strict compliance standards to keep your records safe.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>3. Secure Payments</h3>
                <p className='text-[18px] font-light text-[#313131]'>Transactions are processed through secure gateways with fraud detection.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>4. Report Issues</h3>
                <p className='text-[18px] font-light text-[#313131]'>If you suspect fraud, impersonation, or unsafe behaviour, report it immediately via the support center.</p>
            </div>
        </div>
    </div>
  )
}

export default TrustSecurity
