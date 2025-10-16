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

const ConsultantAddedModal = ({open, setOpen}: any) => {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
            <DialogHeader className='space-y-3'>
                <DialogTitle className='text-center'>Consultant Added & Invite Sent</DialogTitle>
                <DialogDescription className='text-center'>
                    Dr. Zainab Aliyu has been successfully added to your hospital profile. An invitation email has been sent with login instructions.
                </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-2 gap-5'>
                <Button>View Consultants</Button>
                <Button variant={'outline'}>Add Another Consultant</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConsultantAddedModal
