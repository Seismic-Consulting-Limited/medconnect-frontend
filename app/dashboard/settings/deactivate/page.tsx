import DeactivateEnterPasswordModal from '@/components/settings/deactivateEnterPasswordModal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const DeactivateAccountPage = () => {

  const paymentReasons = [
    { id: 'option-one', label: 'I no longer need the service' },
    { id: 'option-two', label: 'I’m concerned about privacy' },
    { id: 'option-three', label: 'Too many notifications' },
    { id: 'option-four', label: 'I no longer need the service' },
    { id: 'option-five', label: 'I have another account' },
  ]
  return (
    <div>
        <div className='w-[596px] mx-auto space-y-3 py-10'>
            <h2 className='text-[20px] font-bold'>Deactivate Your Account</h2>
            <p className='text-[#717171] text-[16px] font-light'>Deactivation is reversible within 30 days. If you signing in again within 30 days. After 30 days, your data may be permanently removed.</p>
            <div className='space-y-5'>
                <h4 className='text-[18px] font-semibold'>Select Reason</h4>

                <RadioGroup defaultValue={paymentReasons[0].id}>
                    {paymentReasons.map((reason) => (
                    <div key={reason.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={reason.id} id={reason.id} />
                        <Label
                        htmlFor={reason.id}
                        className="text-[18px] font-light text-[#A2A2A2]"
                        >
                        {reason.label}
                        </Label>
                    </div>
                    ))}
                </RadioGroup>
                <Textarea
                    placeholder="Type Your Reason Here..."
                    className="placeholder:text-[15px] placeholder:font-light placeholder:text-[#A2A2A2] h-32"
                />
                <div className='text-[#A2A2A2] space-y-3'>
                    <div className="flex items-center gap-3">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className='text-[14px] font-light'>I understand my profile will be hidden and notifications will stop.</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className='text-[14px] font-light'>I understand I can reactivate within 30 days by signing in.</Label>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3 mt-5'>
                    <DeactivateEnterPasswordModal />
                    <Button className='py-[24px]' variant={'outline'}>Cancel</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeactivateAccountPage
