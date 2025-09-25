"use client"

import { useState, useMemo } from "react"
import { Search, ChevronLeft, ChevronRight, Mail, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

type Message = {
  id: string
  senderName: string
  senderEmail: string
  subject: string
  message: string
  dateReceived: string
  status: "unread" | "read"
}

// Mock data for contact messages
const mockMessages: Message[] = [
  {
    id: "1",
    senderName: "Sarah Johnson",
    senderEmail: "sarah.johnson@email.com",
    subject: "Inquiry about Cardiology Services",
    message:
      "Hello, I would like to know more about your cardiology department and available specialists. Could you please provide more information about consultation fees and appointment availability? I have been experiencing some chest discomfort lately and would like to schedule a consultation with one of your cardiologists. Please let me know what documents I need to bring and if there are any specific preparations required for the initial consultation.",
    dateReceived: new Date(Date.now() - 86400000).toISOString(),
    status: "unread",
  },
  {
    id: "2",
    senderName: "Michael Chen",
    senderEmail: "m.chen@gmail.com",
    subject: "Medical Records Request",
    message:
      "I need to request copies of my medical records from my recent visit. Please let me know the process and any required documentation. I visited your facility last month for a routine check-up and some blood tests were conducted. I need these records for my insurance claim and would appreciate if you could expedite the process.",
    dateReceived: new Date(Date.now() - 172800000).toISOString(),
    status: "read",
  },
  {
    id: "3",
    senderName: "Emily Rodriguez",
    senderEmail: "emily.r@outlook.com",
    subject: "Appointment Rescheduling",
    message:
      "Due to an emergency, I need to reschedule my appointment scheduled for next week. Please let me know available alternative dates. I had an appointment scheduled for Tuesday, but due to a family emergency, I won't be able to make it. I would prefer a slot in the following week if possible.",
    dateReceived: new Date(Date.now() - 259200000).toISOString(),
    status: "read",
  },
  {
    id: "4",
    senderName: "David Wilson",
    senderEmail: "david.wilson@company.com",
    subject: "Insurance Coverage Question",
    message:
      "I wanted to confirm if my insurance plan covers the procedures offered at your facility. My insurance provider is HealthCare Plus. I'm particularly interested in knowing about coverage for diagnostic imaging and specialist consultations. Could you please provide me with a list of covered services?",
    dateReceived: new Date(Date.now() - 345600000).toISOString(),
    status: "read",
  },
  {
    id: "5",
    senderName: "Lisa Thompson",
    senderEmail: "lisa.thompson@email.com",
    subject: "Emergency Contact Information",
    message:
      "I need to update my emergency contact information in your system. How can I do this? Is there an online portal or do I need to visit in person? My previous emergency contact has moved and I need to update it with my sister's information instead. Please let me know the quickest way to make this change.",
    dateReceived: new Date(Date.now() - 432000000).toISOString(),
    status: "unread",
  },
]

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    const day = d.toLocaleString("en-GB", { day: "2-digit" })
    const mon = d.toLocaleString("en-GB", { month: "short" })
    const year = d.getFullYear()
    return `${day} ${mon}, ${year}`
  } catch {
    return iso
  }
}

function truncateMessage(message: string, maxLength = 80) {
  if (message.length <= maxLength) return message
  return message.substring(0, maxLength) + "..."
}

export default function MessagesPage() {
  const [messages] = useState<Message[]>(mockMessages)
  const [search, setSearch] = useState("")
  const router = useRouter()

  const totalMessages = messages.length
  const unreadMessages = messages.filter((m) => m.status === "unread").length
  const readMessages = messages.filter((m) => m.status === "read").length

  const filtered = useMemo(() => {
    if (!search.trim()) return messages
    const q = search.toLowerCase()
    return messages.filter(
      (m) =>
        m.senderName.toLowerCase().includes(q) ||
        m.senderEmail.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q),
    )
  }, [messages, search])

  const handleViewMessage = (messageId: string) => {
    router.push(`/dashboard/hospital/messages/${messageId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6 ml-0 lg:ml-64">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Total Messages</div>
                <div className="text-3xl font-bold mt-1">{totalMessages}</div>
                <div className="text-xs text-gray-400">All contact messages</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Unread Messages</div>
                <div className="text-3xl font-bold mt-1">{unreadMessages}</div>
                <div className="text-xs text-gray-400">Require attention</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Read Messages</div>
                <div className="text-3xl font-bold mt-1">{readMessages}</div>
                <div className="text-xs text-gray-400">Already viewed</div>
              </CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages by name, email, or subject"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Unread First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Messages Table */}
          {totalMessages === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
              <p className="text-gray-500">Contact messages from patients will appear here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="grid grid-cols-[60px_1.5fr_2.5fr_1fr_100px] px-4 py-3 text-xs font-medium text-gray-500 border-b">
                <div>S/N</div>
                <div>Sender</div>
                <div>Subject & Message</div>
                <div>Date Received</div>
                <div>Action</div>
              </div>

              {/* Message rows */}
              {filtered.map((message, idx) => (
                <div
                  key={message.id}
                  className={`grid grid-cols-[60px_1.5fr_2.5fr_1fr_100px] items-center px-4 py-4 border-b last:border-b-0 text-sm hover:bg-gray-50 cursor-pointer ${
                    message.status === "unread" ? "bg-blue-50/30" : ""
                  }`}
                  onClick={() => handleViewMessage(message.id)}
                >
                  <div className="text-gray-500">{idx + 1}</div>

                  <div>
                    <div
                      className={`font-medium ${message.status === "unread" ? "text-gray-900 font-semibold" : "text-gray-700"}`}
                    >
                      {message.senderName}
                      {message.status === "unread" && (
                        <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{message.senderEmail}</div>
                  </div>

                  <div>
                    <div
                      className={`font-medium ${message.status === "unread" ? "text-gray-900 font-semibold" : "text-gray-700"}`}
                    >
                      {message.subject}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{truncateMessage(message.message)}</div>
                  </div>

                  <div className="text-gray-700">{formatDate(message.dateReceived)}</div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className="h-8 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewMessage(message.id)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalMessages > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button variant="outline" className="h-8 w-8 p-0 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Button
                  key={n}
                  variant={n === 1 ? "default" : "outline"}
                  className={`h-8 w-8 p-0 ${n === 1 ? "bg-primary text-white" : "bg-transparent"}`}
                >
                  {n}
                </Button>
              ))}
              <Button variant="outline" className="h-8 w-8 p-0 bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
