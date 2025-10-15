import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const TermsOfAgreementModal = ({open, setOpen}: any) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='mb-5'>Terms and Agreement</DialogTitle>
            </DialogHeader>
            <div className='space-y-5'>
                <div className="flex items-center gap-3">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className='text-[16px] font-light text-[#A2A2A2]'>I agree to <span>Terms of Service</span> and <span>Privacy Policy</span></Label>
                </div>
                <div className="flex items-start gap-3">
                    <Checkbox id="terms" className='mt-1' />
                    <Label htmlFor="terms" className='text-[16px] font-light text-[#A2A2A2]'>I consent to MedConnect processing my data as described in the <span>Privacy Policy</span> and in compliance with the Nigeria Data Protection Act (NDPA) 2023.</Label>
                </div>
                <div className="flex items-start gap-3">
                    <Checkbox id="terms" className='mt-1' />
                    <Label htmlFor="terms" className='text-[16px] font-light text-[#A2A2A2]'>I would like to receive marketing communications from MedConnect</Label>
                </div>
            </div>
            <div className='space-x-5 mt-5'>
                <Button className='text-[16px] font-light'>Submit Application</Button>
                <Button className='text-[16px] font-light' variant={'outline'}>Cancel</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default TermsOfAgreementModal
