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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const MedicalInformationModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="font-light flex items-center gap-2">
          <Edit2 size={16} /> Edit Details
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] md:w-[80%] max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Medical Informations</DialogTitle>
          <DialogDescription>
            Update your Medical Informations below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Blood Group</Label>
            <Input placeholder="John" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
          <div>
            <Label>Genotype</Label>
            <Input placeholder="Doe" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>
        </div>

        <div>
            <Label>Allergies</Label>
            <Textarea placeholder="example@email.com" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
        </div>
        <div>
            <Label>Existing Condition</Label>
            <Textarea placeholder="Smith" className='placeholder:text-[14px] placeholder:text-[#C0C0C0]' />
          </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MedicalInformationModal
