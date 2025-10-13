import React from 'react'
import { Calendar1, Clock, Hash, Receipt } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import BookingInfoRow from '@/components/consultants/book-appointment/InfoRow'
import { Card } from '@/components/ui/card'

const ReportPaymentPage = () => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'text-[#079455] border border-[#079455] bg-[#DCFAE6]'
      case 'Pending':
        return 'text-[#DC6803] border border-[#DC6803] bg-[#FEF0C7]'
      case 'Failed':
        return 'text-[#D92D20] border border-[#B42318] bg-[#FEE4E2]'
      case 'Refunded':
        return 'text-[#155EEF] border border-[#155EEF] bg-[#E0EAFF]'
      default:
        return ''
    }
  }

  const paymentReasons = [
    { id: 'option-one', label: 'Payment stuck (Pending too long)' },
    { id: 'option-two', label: 'Payment failed but money debited' },
    { id: 'option-three', label: 'Wrong Amount Charged' },
  ]

  return (
    <div className="p-5 flex items-start justify-center gap-10">
      {/* Transaction Details Card */}
      <Card className="w-[348px] overflow-hidden">
        <div className="p-5">
          <h2 className="text-[16px] font-semibold">Transaction Details</h2>
        </div>

        <div className="bg-white px-5 pb-5">
          {/* Icon + Amount */}
          <div className="py-3 space-y-2 text-center">
            <div className="w-[60px] h-[61px] bg-[#F2F2F2] border border-[#D7D7D7] flex items-center justify-center mx-auto rounded-full">
              <Receipt />
            </div>
            <h2 className="text-[24px] font-semibold">₦100,000</h2>
          </div>

          {/* Status Row */}
          <div className="flex items-center justify-between py-[12px] border-b mt-5">
            <span className="text-[18px] font-light text-[#A2A2A2]">Status</span>
            <div
              className={`flex items-center justify-center w-[96px] h-[39px] text-[14px] rounded-full ${getStatusStyle('Pending')}`}
            >
              Pending
            </div>
          </div>

          {/* Payment Info Rows */}
          <BookingInfoRow
            label="Reference ID"
            value={
              <>
                <Hash className="w-[20px] h-[21px]" color="#00C7BE" />
                <p className="text-[14px]">GTE-79768</p>
              </>
            }
          />
          <BookingInfoRow
            label="Payment Date"
            value={
              <>
                <Calendar1 className="w-[20px] h-[21px]" color="#007AFF" />
                <p className="text-[14px]">10 Aug 2025</p>
              </>
            }
          />
          <BookingInfoRow
            label="Payment Time"
            value={
              <>
                <Clock className="w-[20px] h-[21px]" color="#FF9500" />
                <p className="text-[14px]">10:00 PM</p>
              </>
            }
          />
        </div>
      </Card>

      {/* Report Form */}
      <div className="w-[466px]">
        <div className="p-5">
          <h2 className="text-[16px] font-semibold">
            Select issue with this transaction
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

export default ReportPaymentPage
