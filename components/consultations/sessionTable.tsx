import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import Paginations from "../hospital/pagination"
import ScheduleSummary from "../consultants/book-appointment/scheduleSummary"
import { getStatusStyle } from "@/utils/statusStyle"
import { sessions } from "@/constant/consultationData"


// ✅ button config
const getButtonConfig = (status: string) => {
  switch (status) {
    case "Ongoing":
      return { label: "Mark Complete", variant: "border" }
    case "In 15 Mins":
      return { label: "Join Call", variant: "filled" }
    case "Upcoming":
      return { label: "Reschedule", variant: "border" }
    case "Completed":
      return { label: "Review", variant: "border" }
    case "Canceled":
      return { label: "Report", variant: "border" }
    default:
      return { label: "", variant: "border" }
  }
}

const ITEMS_PER_PAGE = 4

const SessionTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // ✅ Pagination logic
  const indexOfLast = currentPage * ITEMS_PER_PAGE
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE
  const currentSessions = sessions.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(sessions.length / ITEMS_PER_PAGE)

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Doctor</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentSessions.map((session) => {
            const button = getButtonConfig(session.status)
            return (
              <TableRow key={session.id}>
                <TableCell className="font-medium flex items-center gap-3">
                  <Image
                    src={session.image}
                    alt={session.doctor}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] rounded-full border border-[#E4E4E4] object-cover"
                  />
                  <h2 className="text-[16px] font-semibold">
                    {session.doctor}
                  </h2>
                </TableCell>

                <TableCell className="text-[16px] font-light">
                  {session.specialty}
                </TableCell>

                <TableCell className="space-y-1">
                  <p className="text-[16px] font-light">{session.date}</p>
                  <span className="text-[14px] font-light text-[#717171]">
                    {session.time}
                  </span>
                </TableCell>

                <TableCell className="font-light">
                  <span
                    className={`px-[14px] py-[8px] border text-[14px] rounded-full ${getStatusStyle(
                      session.status
                    )}`}
                  >
                    {session.status}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                    <ScheduleSummary
                        active={button.variant === "filled"}
                        type={session.status.toLocaleLowerCase()}
                        compact={true}
                        label={button.label}
                    />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* ✅ Pagination section */}
      <div className="flex justify-center mt-6">
        <Paginations
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}

export default SessionTable
