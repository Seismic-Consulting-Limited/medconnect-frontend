import IconInputField from '@/components/shared/IconInputField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Mail, Phone, Stethoscope, User, Wallet } from 'lucide-react'
import React from 'react'

const AddTreatmentPage = () => {
  return (
    <div>      
        {/* Header */}
        <div className='bg-white shadow flex items-center gap-5 h-[92px] p-[24px]'> 
            <ArrowLeft className='w-[20px] h-[20px]' /> 
            <div> 
                <span className='flex items-center gap-3 text-[#C0C0C0] text-[14px] font-light'>
                    Treatments
                    <div>
                    </div> 
                    <p className='text-text'>Add New Treatment</p>
                </span> 
            </div> 
        </div>
        <div className="max-w-[720px] mx-auto py-10 px-5 space-y-8">
            <h1 className="text-[28px] font-semibold text-gray-800">Add New Treatment</h1>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <Label>Name of Treatment *</Label>
                        <Input name='' placeholder='Spinal Fusion Surgery' />
                    </div>
                    <div className="space-y-1">
                        <Label>Description *</Label>
                        <Textarea name='' placeholder='Type decription here' />
                    </div>

                                        {/* Name fields */}
                    <div className="space-y-1">
                        <div>
                            <Label>Price range *</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input name='' placeholder='Starting Price (e.g., 120,000' />
                                <Input name='' placeholder='To (e.g., 120,000' />
                            </div>
                        </div>
                    </div>

                    {/* Name fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="space-y-1">
                            <Label>Duration</Label>
                            <Input name='' placeholder='4 to 6 hours' />
                        </div>
                        <div className="space-y-1">
                            <Label>Recovery Period</Label>
                            <Input name='' placeholder='1 - 2 days' />
                        </div>
                        <div className="space-y-1">
                            <Label>Hospital Stay</Label>
                            <Input name='' placeholder='4 - 6 weeks' />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <Button >Add Treatment</Button>
                        <Button variant={'outline'}>Cancel</Button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AddTreatmentPage
