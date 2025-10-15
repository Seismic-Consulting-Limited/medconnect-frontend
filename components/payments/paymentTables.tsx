'use client'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { payments } from '@/constant/consultationData'
import Paginations from '../hospital/pagination'
import PaymentSummary from './paymentSummery'

const ITEMS_PER_PAGE = 4

const PaymentTables = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)

  // ✅ Pagination logic
  const indexOfLast = currentPage * ITEMS_PER_PAGE
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE
  const currentSessions = payments.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE)

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


  const getButtonLabel = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'View Receipt'
      case 'Pending':
        return 'Make Payment'
      case 'Failed':
        return 'Report'
      case 'Refunded':
        return 'Refunded'
      default:
        return 'View'
    }
  }

  const handleButtonClick = (payment: any) => {
    setSelectedPayment(payment)
    setIsSummaryOpen(true)
  }

  return (
    <>
      {/* ✅ Payment Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">SN</TableHead>
              <TableHead>Reference ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentSessions.map((payment, index) => (
              <TableRow key={payment.id}>
                <TableCell className="text-[12px] font-light">
                  {indexOfFirst + index + 1}
                </TableCell>
                <TableCell className="text-[16px] font-light">
                  {payment.referenceId}
                </TableCell>
                <TableCell className="text-[16px] font-light">
                  {payment.service}
                </TableCell>
                <TableCell className="text-[16px] font-semibold">
                  {payment.amount}
                </TableCell>
                <TableCell className="space-y-1">
                  <p className="text-[16px] font-light">{payment.date}</p>
                  <span className="text-[14px] font-light text-[#717171]">
                    {payment.time}
                  </span>
                </TableCell>
                <TableCell>
                    <div
                        className={`flex items-center justify-center w-[96px] h-[39px] text-[14px] rounded-full ${getStatusStyle(payment.status)}`}
                    >
                        {payment.status}
                    </div>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    className={`bg-transparent w-[120px] font-light ${
                      payment.status === 'Refunded'
                        ? 'opacity-60 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={payment.status === 'Refunded'}
                    onClick={() => handleButtonClick(payment)}
                  >
                    {getButtonLabel(payment.status)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center mt-6">
          <Paginations
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* ✅ Open Payment Summary Sheet */}
      {selectedPayment && (
        <PaymentSummary
          open={isSummaryOpen}
          onOpenChange={setIsSummaryOpen}
          payment={selectedPayment}
        />
      )}
    </>
  )
}

export default PaymentTables
