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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'

const EditFacilityModal = () => {
  return (
    <Dialog>
        <DialogTrigger>
            <Button
                variant="outline"
                size="sm"
                className="text-[13px] font-light"
            >
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Facility</DialogTitle>
              <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-5'>
              <div className='space-y-3'>
                <Label>Name of Facility *</Label>
                <Input />
              </div>
              <div className='space-y-3'>
                <Label>Facility Category *</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <Button>Save Changes</Button>
              <Button variant={'outline'}>Cancel</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default EditFacilityModal
