"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Reply, Mail, User, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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

// Mock data for contact messages (same as in main page)
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
    return d.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

export default function MessageDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [message, setMessage] = useState<Message | null>(null)

  useEffect(() => {
    const messageId = params.id as string
    const foundMessage = mockMessages.find((m) => m.id === messageId)
    if (foundMessage) {
      setMessage(foundMessage)
      // Mark as read when viewing
      if (foundMessage.status === "unread") {
        // In a real app, you would update this in the backend
        foundMessage.status = "read"
      }
    }
  }, [params.id])

  const handleReply = () => {
    if (!message) return

    const subject = `Re: ${message.subject}`
    const body = `\n\n--- Original Message ---\nFrom: ${message.senderName} <${message.senderEmail}>\nSubject: ${message.subject}\nDate: ${formatDate(message.dateReceived)}\n\n${message.message}`

    const mailtoLink = `mailto:${message.senderEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  const handleBack = () => {
    router.back()
  }

  if (!message) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4 ml-0 lg:ml-64">
            <h1 className="text-xl font-semibold text-gray-900">Message Not Found</h1>
          </div>
        </div>
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6 ml-0 lg:ml-64">
            <div className="text-center py-16">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Message Not Found</h3>
              <p className="text-gray-500 mb-4">The message you're looking for doesn't exist.</p>
              <Button onClick={handleBack}>Go Back</Button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleBack} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Message Details</h1>
          </div>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6 ml-0 lg:ml-64">
          <div className="max-w-4xl mx-auto">
            {/* Message Header */}
            <Card className="mb-6">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{message.subject}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{message.senderName}</span>
                        <span className="text-gray-400">({message.senderEmail})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(message.dateReceived)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </CardHeader>
            </Card>

            {/* Message Content */}
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{message.message}</div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Messages
              </Button>
              <Button onClick={handleReply} className="bg-primary hover:bg-primary/90 text-white">
                <Reply className="h-4 w-4 mr-2" />
                Reply via Email
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
