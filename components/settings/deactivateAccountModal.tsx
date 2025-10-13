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
import Image from 'next/image'
import Link from 'next/link'

const DeactivateAccountModal = () => {
  return (
        <Dialog>
          <DialogTrigger>
            <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent shrink-0"
            >
                Deactivate Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className='text-center space-y-6'>
                <Image src={'/acd9e3301ede049fc71fcebd691b1c21286c7f02.png'} alt={''} width={100} height={100} className='mx-auto w-[267px] h-[267px]' />
                <DialogTitle className='text-center'>Deactivate account?</DialogTitle>
                <DialogDescription className='text-center'>
                    This will disable your account and hide your profile and activity. 
                    You can reactivate by signing in again within 30 days. After 30 days, 
                    your data will be permanently removed.
                </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-2 gap-3 mt-5'>
                <Button className='py-[16px] h-full'>
                    <Link href={'settings/deactivate'}>
                        Continue Deactivation
                    </Link>
                </Button>
                <Button className='py-[24px]' variant={'outline'}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
  )
}

export default DeactivateAccountModal
