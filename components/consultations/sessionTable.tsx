'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import Paginations from "../hospital/pagination"
import ScheduleSummary from "./scheduleSummary"
import { Button } from '@/components/ui/button'
import { sessions } from "@/constant/consultationData"

const ITEMS_PER_PAGE = 4

const SessionTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [openSummary, setOpenSummary] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)

  const indexOfLast = currentPage * ITEMS_PER_PAGE
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE
  const currentSessions = sessions.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(sessions.length / ITEMS_PER_PAGE)

  const handleOpenSummary = (session: any) => {
    setSelectedSession(session)
    setOpenSummary(true)
  }

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
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium flex items-center gap-3">
                <Image
                  src={session.image}
                  alt={session.doctor}
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] rounded-full border border-[#E4E4E4]"
                />
                <h2 className="text-[16px] font-semibold">{session.doctor}</h2>
              </TableCell>

              <TableCell className="text-[16px] font-light">{session.specialty}</TableCell>

              <TableCell>
                <p className="text-[16px] font-light">{session.date}</p>
                <p className="text-[14px] text-[#717171]">{session.time}</p>
              </TableCell>

              <TableCell>
                <span className={`flex items-center justify-center w-[96px] h-[39px] text-[14px] rounded-full  ${getStatusStyle(session.status)}`}>
                  {session.status}
                </span>
              </TableCell>

              <TableCell className="flex items-center justify-end">
                <Button
                  variant={session.status === "In 15 Mins" ? "default" : "outline"}
                  className={`w-[120px] font-light rounded-[10px] h-[44px] flex items-center justify-center
                    ${session.status === "In 15 Mins" ? "bg-[#7E22CE] hover:bg-[#6B1CBF] text-white" : "bg-transparent"}
                  `}
                  onClick={() => handleOpenSummary(session)}
                >
                  {session.status === "In 15 Mins"
                    ? "Join Call"
                    : session.status === "Upcoming"
                    ? "Reschedule"
                    : session.status === "Ongoing"
                    ? "Mark Complete"
                    : session.status === "Completed" || session.status === "Canceled"
                    ? "Review"
                    : ""}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Paginations totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {/* Schedule Summary */}
      {selectedSession && (
        <ScheduleSummary
          open={openSummary}
          onOpenChange={setOpenSummary}
          data={selectedSession}
        />
      )}
    </div>
  )
}

export default SessionTable
