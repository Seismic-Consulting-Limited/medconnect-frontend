import React from 'react'

const PaymentBilling = () => {
  return (
    <div className='space-y-5'>
        <h2 className="text-[24px] font-bold mt-3">Payment & Billing</h2>
        <p className="text-[#717171] text-[18px] text-light">Secure and simple payments for peace of mind.</p>

        <div className='space-y-3'>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>1. Supported Methods</h3>
                <p className='text-[18px] font-light text-[#313131]'>Pay via credit/debit card, bank transfer.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>2. Payment Confirmation</h3>
                <ul className='space-y-2 list-disc ml-8'>
                    <li className='text-[18px] font-light text-[#313131]'>An on-screen confirmation</li>
                    <li className='text-[18px] font-light text-[#313131]'>Email receipt</li>
                    <li className='text-[18px] font-light text-[#313131]'>Status update in your dashboard</li>
                </ul>
            </div>
            <div className='space-y-2'>
                <h3 className='text-[18px] font-semibold'>3. Refunds & Cancellations</h3>
                <p className='text-[18px] font-light text-[#313131]'>Refunds are available in cases of cancelled appointments or failed Specialties. The amount and timeline depend on the provider’s refund policy.</p>
            </div>
        </div>
    </div>
  )
}

export default PaymentBilling
