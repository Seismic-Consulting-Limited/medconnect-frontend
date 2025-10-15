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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PersonalDetailsModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="font-light flex items-center gap-2">
          <Edit2 size={16} /> Edit Details
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] md:w-[80%] max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Personal Details</DialogTitle>
          <DialogDescription>
            Update your personal details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>First Name</Label>
            <Input placeholder="John" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input placeholder="Doe" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Other Name</Label>
            <Input placeholder="Smith" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input placeholder="example@email.com" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Phone Number</Label>
            <Input placeholder="+234 801 234 5678" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
          <div>
            <Label>Gender</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className='text-[14px]'>Date Of Birth</Label>
            <Input type="date" className='placeholder:text-[14px] placeholder:text-[#C0C0C0] w-full' />
          </div>
          <div>
            <Label>Location</Label>
            <Input placeholder="Abuja, Nigeria" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
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

export default PersonalDetailsModal
