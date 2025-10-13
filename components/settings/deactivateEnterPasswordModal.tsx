import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const DeactivateEnterPasswordModal = () => {
  return (
        <Dialog>
          <DialogTrigger>
                <Button className='w-full py-[16px] h-full'>
                    Continue <span className='text-[#B173E8]'>| Enter Password</span>
                </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Password</DialogTitle>
              <DialogDescription>
                Set a secure password to protect your account.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-5'>
                <div className='space-y-2'>
                    <Label>Confirm Your Password</Label>
                    <Input placeholder='*******' type='password' />
                </div>
                <p className='text-[14px] font-light text-[#717171]'>Passwords must be <b>case-sensitive</b>, include a mix of <b>uppercase</b> and <b>lowercase letters</b>, and be at <b>least 6 characters long</b>.</p>
                <div className='grid grid-cols-2 gap-3'>
                    <Button className='py-[24px]' variant={'outline'}>Keep My Account</Button>
                    <Button className='py-[16px] h-full'>Deactivate Account</Button>
                </div>
            </div>
          </DialogContent>
        </Dialog>
  )
}

export default DeactivateEnterPasswordModal
