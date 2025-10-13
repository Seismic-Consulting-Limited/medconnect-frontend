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

const ChangePasswordModal = () => {
  return (
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" className="border-gray-300 bg-transparent shrink-0">
                Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Set a secure password to protect your account.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-5'>
                <div className='space-y-2'>
                    <Label>Current Password</Label>
                    <Input placeholder='*******' type='password' />
                </div>
                <div className='space-y-2'>
                    <Label>New Password</Label>
                    <Input placeholder='*******' type='password' />
                </div>
                <p className='text-[14px] font-light text-[#717171]'>Passwords must be <b>case-sensitive</b>, include a mix of <b>uppercase</b> and <b>lowercase letters</b>, and be at <b>least 6 characters long</b>.</p>
                <div className='grid grid-cols-2 gap-3'>
                    <Button className='py-[16px] h-full'>Change Password</Button>
                    <Button className='py-[24px]' variant={'outline'}>Cancel</Button>
                </div>
            </div>
          </DialogContent>
        </Dialog>
  )
}

export default ChangePasswordModal
