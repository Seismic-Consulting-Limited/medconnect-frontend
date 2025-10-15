import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import Image from 'next/image'
import BookingInfoRow from '@/components/consultants/book-appointment/InfoRow'
import { Banknote, Calendar1, Clock, Cloud, Video } from 'lucide-react'

const ReportAppointmentPage = () => {
      
    const paymentReasons = [
        { id: 'option-one', label: 'Doctor Did Not Show Up)' },
        { id: 'option-two', label: 'Appointment Cancelled Unexpectedly' },
        { id: 'option-three', label: 'Doctor Was Late' },
        { id: 'option-four', label: 'Technical Issues (Telemedicine)' },
        { id: 'option-five', label: 'Other (please specify)' },
    ]

    const status = 'Ongoing';

    const getStatusStyle = (status: string) => {
      const normalizedStatus = status.trim().toLowerCase()
    
      switch (normalizedStatus) {
        case "ongoing":
          return "text-[#079455] border border-[#079455] bg-[#dcfae6]"
        case "in 15 mins":
          return "text-[#7e22ce] border border-[#7e22ce] bg-[#e4cff7]"
        case "upcoming":
          return "text-[#b54708] border border-[#b54708] bg-[#fef0c7]"
        case "completed":
          return "text-[#155eef] border border-[#155eef] bg-[#d1e0ff]"
        case "canceled":
          return "text-[#d92d20] border border-[#d92d20] bg-[#fee4e2]"
        case "booking":
          return "text-[#007aff] border border-[#007aff] bg-[#e0f7ff]"
        case "confirmed":
          return "text-[#079455] border border-[#079455] bg-[#dcfae6]"
        case "pending":
          return "text-[#b54708] border border-[#b54708] bg-[#fef0c7]"
        case "failed":
          return "text-[#d92d20] border border-[#d92d20] bg-[#fee4e2]"
        case "refunded":
          return "text-[#155eef] border border-[#155eef] bg-[#d1e0ff]"
        default:
          return "text-[#555] border border-[#ccc] bg-[#eee]"
      }
    }
  return (
    <div className='flex items-start justify-center my-10 gap-5'>
        <Card className='w-[400px]'>
            <CardHeader>
                <div>
                    <CardTitle className='text-[16px] mb-3'>Appointment Details</CardTitle>
                </div>
                
                {/* Doctor Info */}
                <div className="flex items-center gap-4 py-5 border-y">
                    <Image
                        src="/fb4996dd2f3bece621cfd3cf3a8f5361a14ddc31.jpg"
                        alt={'doctor'}
                        width={112}
                        height={112}
                        className="w-[80px] h-[80px] rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-[16px] font-semibold">Dr. Zainab Aliyu</h2>
                        <p className="text-[14px] font-light">Neurosurgery </p>
                        <span className="text-[10px] text-[#A2A2A2] font-light">
                          Lagos State Teaching Hospital
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Booking Info */}
                    <div>
                        <div className="flex items-center justify-between py-[12px] border-b mt-5">
                            <span className="text-[18px] font-light text-[#A2A2A2]">Status</span>
                            <span
                            className={`text-[14px] py-[8px] px-[16px] rounded-full capitalize border-[0.5] ${getStatusStyle(
                                status
                            )}`}
                            >
                            {status}
                            </span>
                        </div>

                        <BookingInfoRow
                            label="Date"
                            value={
                            <>
                                <Calendar1 className="w-[20px] h-[21px]" color="#007AFF" /> 10 August 2025
                            </>
                            }
                        />
                        <BookingInfoRow
                            label="Time"
                            value={
                            <>
                                <Clock className="w-[20px] h-[21px]" color="#FF9500" /> 10:00 PM
                            </>
                            }
                        />
                        <BookingInfoRow
                                label="File"
                                value={
                                <>
                                    <Cloud className="w-[20px] h-[21px]" color="#00C7BE" /> {'1 Document Uploaded'}
                                </>
                                }
                            />
                            <BookingInfoRow
                                label="Type"
                                value={
                                <>
                                    <Video className="w-[20px] h-[21px]" color="#AF52DE" /> {'Telemedicine (Video Call)'}
                                </>
                                }
                            />
                        <BookingInfoRow
                            label="Fee"
                            value={
                            <>
                                <Banknote className="w-[20px] h-[21px]" color="#34C759" /> 1000
                            </>
                            }
                            borderBottom={false}
                        />
                    </div>
            </CardContent>
        </Card>
      {/* Report Form */}
      <div className="w-[466px]">
        <div className="p-5">
          <h2 className="text-[16px] font-semibold">
            Select issue with this appointment
          </h2>
        </div>

        <div className="px-5 space-y-5">
          <RadioGroup defaultValue={paymentReasons[0].id}>
            {paymentReasons.map((reason) => (
              <div key={reason.id} className="flex items-center space-x-2">
                <RadioGroupItem value={reason.id} id={reason.id} />
                <Label
                  htmlFor={reason.id}
                  className="text-[18px] font-light text-[#A2A2A2]"
                >
                  {reason.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Textarea
            placeholder="Type Your Reason Here..."
            className="placeholder:text-[15px] placeholder:font-light placeholder:text-[#A2A2A2] h-32"
          />

          <Button className="w-full h-[58px] rounded-[16px] text-[16px] font-light">
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReportAppointmentPage
