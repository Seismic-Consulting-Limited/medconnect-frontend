import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const DeleteTreatmentModal = ({open, setOpen}: any) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
            <DialogHeader className='space-y-3'>
                <Image src={'/dfc1a119b21c5048f523229125505a06823b5d9c.png'} alt={''} width={267} height={100} className='mx-auto w-[]' />
                <DialogTitle className='text-center'>Delete Treatment</DialogTitle>
                <DialogDescription className='text-center'>
                    Are you sure you want to delete this treatment? This action cannot be undone and the treatment will no longer appear on your hospital profile.
                </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-2 gap-5'>
                <Button className='bg-[#313131]'>Yes, Delete</Button>
                <Button variant={'outline'}>Cancel</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteTreatmentModal
