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
import { Edit2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const EmergencyContactModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="font-light flex items-center gap-2">
          <Edit2 size={16} /> Edit Details
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] md:w-[80%] max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Emergency Contact</DialogTitle>
          <DialogDescription>
            Update your Emergency Contact below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="John" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input placeholder="Doe" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div>
                <Label>Email Address</Label>
                <Input placeholder="example@email.com" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
            </div>
            <div>
                <Label>Location</Label>
                <Input placeholder="Smith" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmergencyContactModal
