'use client'
import Overview from '@/components/hospital/hospitalDetails/overview'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BadgeCheck, MapPin, Send, Star } from 'lucide-react'
import React, { useState } from 'react'
import Carousel from '@/components/hospital/hospitalDetails/Carousel'
import { Label } from '@radix-ui/react-menubar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Consultants from '@/components/hospital/hospitalDetails/consultants'
import Facilities from '@/components/hospital/hospitalDetails/facilities'
import { Card } from '@/components/ui/card'

const tabs = [
    {
        id: 1,
        label: 'Overview',
    },
    {
        id: 2,
        label: 'Consultants',
    },
    {
        id: 3,
        label: 'Facilities & Treatments',
    }
]

const imageList = [
  '/057c1e4d69c38ec739e42c86692353cc78f6b395 2.jpg',
  '/c11c496a5caf90bfb8f69a8785142b64662350dc 2.jpg',
  '/bjjjbui 2.jpg',
]

const HospitalDetailsPage = () => {
    const [activeTab, setActiveTab] = useState('Overview')
  return (
    <div>
        <div className='bg-white shadow flex items-center gap-5 h-[92px] p-[24px]'>
            <ArrowLeft className='w-[20px] h-[20px]' />
            <div>
                <span className='flex items-center gap-3 text-[#C0C0C0] text-[14px] font-light'>Search <div></div> <p className='text-text'>Details</p></span>
            </div>
        </div>
        <div className='p-[24px] relative'>
            <div className='lg:w-[844px] space-y-5'>
                <h2 className='lg:text-[60px] text-[44px] font-semibold leading-tight'>LUTH (Lagos University Teaching Hospital)</h2>
                <div className='flex items-center gap-5'>
                    <span
                        className="py-[12px] px-[20px] flex items-center gap-2 w-fit bg-[#EDEDED] text-[14px] font-light text-text border border-[#D7D7D7] rounded-full"
                    >
                        <MapPin className='w-[20px] h-[20px]' color='#2970FF' />
                        Lekki, Lagos
                    </span>
                    <span
                        className="py-[12px] px-[20px] flex items-center gap-2 w-fit bg-[#EDEDED] text-[14px] font-light text-text border border-[#D7D7D7] rounded-full"
                    >
                        <Star fill={'#F79009'} className='w-[20px] h-[20px]' color='#F79009' />
                        4.9 (1.2k reviews)
                    </span>
                    <span
                        className="py-[12px] px-[20px] flex items-center gap-2 w-fit bg-[#EDEDED] text-[14px] font-light text-text border border-[#D7D7D7] rounded-full"
                    >
                        <BadgeCheck className='w-[20px] h-[20px]' color='#17B26A' />
                        Verified
                    </span>
                </div>
            </div>
            <Button className='absolute top-5 lg:top-10 right-5 lg:right-20 rounded-full bg-[#EDEDED] border-[0.5px] border-[#D7D7D7]'><Send className='w-[24px] h-[24px] text-text' /></Button>
        </div>
        {/* image Carousel */}
        <Carousel images={imageList} />

        <div className='lg:flex items-start'>
            <div className='lg:w-[768px] p-5'>
                <div className='grid grid-cols-3 items-center justify-between border-b'>
                    {
                        tabs.map((tab, index) => {
                            const active = tab.label === activeTab
                            return (
                                <div key={index} onClick={() => setActiveTab(tab.label)} className={`${active ? 'border-primary' : ''}  border-b-[3px] text-center py-3`}>
                                    <span className='text-[14px] items-center'>{tab.label}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        activeTab === 'Overview' && (
                            <Overview />
                        )
                    }
                    {
                        activeTab === 'Consultants' && (
                            <Consultants />
                        )
                    }
                    {
                        activeTab === 'Facilities & Treatments' && (
                            <Facilities />
                        )
                    }
                </div>
            </div>
            <Card className='w-[496px]'>
                <div className=''>
                    <div className='p-[16px] border-b'>
                        <h2 className='text-[16px] font-semibold'>Contact This Hospital</h2>
                    </div>
                    
                    <div className='p-[16px] space-y-3'>
                        <div className='space-y-2'>
                            <Label className='text-[12px] font-medium'>Subject</Label>
                            <Input placeholder='john.doe@gmail.com' className='border-[1px] border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light placeholder:text-[#C0C0C0] placeholder:text-[14px]' />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-[12px] font-medium'>Message</Label>
                            <Textarea placeholder='Please descibe your medical needs and any questions you have.' className='border-[1px] border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light placeholder:text-[#C0C0C0] placeholder:text-[14px]' />
                        </div>
                        <Button className='w-full h-[58px] py-[16px] px-[24px] rounded-[16px] text-[16px] font-light'>
                            Send Inquiry
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default HospitalDetailsPage
