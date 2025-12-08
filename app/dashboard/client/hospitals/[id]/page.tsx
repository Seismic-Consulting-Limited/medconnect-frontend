'use client'
import Overview from '@/components/hospital/hospitalDetails/overview'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BadgeCheck, MapPin, Send, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Carousel from '@/components/hospital/hospitalDetails/Carousel'
import { Label } from '@radix-ui/react-menubar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Consultants from '@/components/hospital/hospitalDetails/consultants'
import Facilities from '@/components/hospital/hospitalDetails/facilities'
import { Card } from '@/components/ui/card'
import { fetchSingleHospital } from '@/service/hospital.service'
import { useParams } from 'next/navigation'

const tabs = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Consultants' },
  { id: 3, label: 'Facilities & Treatments' },
]

const imageList = [
  '/057c1e4d69c38ec739e42c86692353cc78f6b395 2.jpg',
  '/c11c496a5caf90bfb8f69a8785142b64662350dc 2.jpg',
  '/bjjjbui 2.jpg',
]

const HospitalDetailsPage = () => {
  const [loading, setLoading] = useState(false)
  const [hospitalDetails, setHospitalDetails] = useState<any>({})
  const [activeTab, setActiveTab] = useState('Overview')
  const { id } = useParams()

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      setLoading(true)
      try {
        const response = await fetchSingleHospital(id as any)
        if (response?.data) setHospitalDetails(response?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchHospitalDetails()
  }, [id])

  return (
    <div className="w-full min-h-screen bg-[#fafafa]">
      {/* Top Bar */}
      <div className="bg-white shadow flex items-center gap-3 sm:gap-5 h-[72px] sm:h-[92px] px-4 sm:px-6 lg:px-10">
        <ArrowLeft className="w-5 h-5 sm:w-[20px] sm:h-[20px]" />
        <div>
          <span className="flex items-center gap-2 sm:gap-3 text-[#C0C0C0] text-[12px] sm:text-[14px] font-light">
            Search <div className="w-1 h-1 rounded-full bg-[#C0C0C0]" />{' '}
            <p className="text-text">Details</p>
          </span>
        </div>
      </div>

      {/* Main Section */}
      {loading ? (
        <div className="flex justify-center py-10 text-gray-500">
          Loading...
        </div>
      ) : (
        hospitalDetails && (
          <div className="w-full">
            {/* Header Info */}
            <div className="relative p-4 sm:p-6 lg:p-10">
              <div className="w-full lg:w-1/2 space-y-3 sm:space-y-5">
                <h2 className="text-[32px] sm:text-[44px] lg:text-[60px] font-semibold leading-tight">
                  {hospitalDetails?.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                  {/* Location */}
                  <span className="py-2 px-4 flex items-center gap-2 w-fit bg-[#EDEDED] text-[13px] sm:text-[14px] font-light text-text border border-[#D7D7D7] rounded-full">
                    <MapPin className="w-[18px] h-[18px]" color="#2970FF" />
                    {hospitalDetails?.location?.state?.name}
                  </span>

                  {/* Rating */}
                  <span className="py-2 px-4 flex items-center gap-2 w-fit bg-[#EDEDED] text-[13px] sm:text-[14px] font-light text-text border border-[#D7D7D7] rounded-full">
                    <Star fill={'#F79009'} className="w-[18px] h-[18px]" color="#F79009" />
                    {hospitalDetails?.rating} (0 reviews)
                  </span>

                  {/* Verified */}
                  {hospitalDetails?.is_approved && (
                    <span className="py-2 px-4 flex items-center gap-2 w-fit bg-[#EDEDED] text-[13px] sm:text-[14px] font-light text-text border border-[#D7D7D7] rounded-full">
                      <BadgeCheck className="w-[18px] h-[18px]" color="#17B26A" />
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Share Button */}
              <Button className="absolute top-4 sm:top-5 lg:top-10 right-4 sm:right-8 lg:right-20 rounded-full bg-[#EDEDED] border border-[#D7D7D7] hover:bg-gray-200">
                <Send className="w-[20px] sm:w-[24px] h-[20px] sm:h-[24px] text-text" />
              </Button>
            </div>

            {/* Image Carousel */}
            <Carousel images={imageList} />

            {/* Tabs + Sidebar */}
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 p-4 sm:p-6 lg:p-10">
              {/* Left Section */}
              <div className="w-full lg:w-3/5">
                {/* Tabs */}
                <div className="grid grid-cols-3 text-center border-b border-gray-200">
                  {tabs.map((tab) => {
                    const active = tab.label === activeTab
                    return (
                      <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.label)}
                        className={`cursor-pointer py-3 text-sm sm:text-base ${
                          active
                            ? 'border-b-2 border-primary text-primary font-medium'
                            : 'text-gray-600'
                        }`}
                      >
                        {tab.label}
                      </div>
                    )
                  })}
                </div>

                {/* Tab Content */}
                <div className="mt-5">
                  {activeTab === 'Overview' && <Overview hospitalDetails={hospitalDetails} />}
                  {activeTab === 'Consultants' && <Consultants id={hospitalDetails.id as string} />}
                  {activeTab === 'Facilities & Treatments' && (
                    <Facilities hospitalDetails={hospitalDetails} />
                  )}
                </div>
              </div>

              {/* Contact Sidebar */}
              <Card className="w-full lg:w-1/3 rounded-[16px] overflow-hidden border">
                <div>
                  <div className="p-4 sm:p-5 border-b">
                    <h2 className="text-[16px] sm:text-[18px] font-semibold">
                      Contact This Hospital
                    </h2>
                  </div>

                  <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
                    <div className="space-y-2">
                      <Label className="text-[12px] sm:text-[13px] font-medium">Subject</Label>
                      <Input
                        placeholder="john.doe@gmail.com"
                        className="border border-[#D7D7D7] py-2 px-3 rounded-[12px] text-[14px] placeholder:text-[#C0C0C0]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[12px] sm:text-[13px] font-medium">Message</Label>
                      <Textarea
                        placeholder="Please describe your medical needs and any questions you have."
                        className="border border-[#D7D7D7] py-2 px-3 rounded-[12px] text-[14px] placeholder:text-[#C0C0C0]"
                      />
                    </div>

                    <Button className="w-full h-[52px] sm:h-[58px] rounded-[12px] text-[15px] sm:text-[16px] font-light">
                      Send Inquiry
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default HospitalDetailsPage
