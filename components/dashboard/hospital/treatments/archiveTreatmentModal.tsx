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

const ArchiveTreatmentModal = ({open, setOpen}: any) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
            <DialogHeader className='space-y-3'>
                <Image src={'/5d807e9efc4de8c42b0589ec1d63c3afe0a68b69.png'} alt={''} width={267} height={100} className='mx-auto w-[]' />
                <DialogTitle className='text-center'>Archive Treatment</DialogTitle>
                <DialogDescription className='text-center'>
                    Are you sure you want to archive this treatment? This treatment will no longer appear on your hospital profile. You can activate it later.
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

export default ArchiveTreatmentModal
