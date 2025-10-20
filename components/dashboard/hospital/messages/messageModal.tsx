import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const MessageModal = ({openMessage, setOpenMessage, message}:  any) => {
  return (
    <Dialog open={openMessage} onOpenChange={() => setOpenMessage(false)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{message?.name}</DialogTitle>
                <DialogDescription>
                    <span>{message?.phone} | {message?.email}</span>
                </DialogDescription>
            </DialogHeader>
            <div className='space-y-3'>
                <DialogTitle>{message?.subject}</DialogTitle>
                <DialogDescription>
                    {message?.preview}
                </DialogDescription>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default MessageModal
