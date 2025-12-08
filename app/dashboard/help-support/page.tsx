'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Stethoscope,
  Hospital,
  Cross,
  Plane,
  CreditCard,
  ShieldCheck,
  Star,
  ShieldEllipsis,
  ArrowLeft,
  Zap,
} from 'lucide-react'
import GetStarted from '@/components/help-support/getStarted'
import HospitalConsultants from '@/components/help-support/hospitalConsultants'
import TeleMedicine from '@/components/help-support/teleMedicine'
import TrevelPlanning from '@/components/help-support/trevelPlanning'
import PaymentBilling from '@/components/help-support/paymentBilling'
import AccountSecurity from '@/components/help-support/accountSecurity'
import ReviewRating from '@/components/help-support/reviewRating'
import TrustSecurity from '@/components/help-support/trustSecurity'

const HelpSupportPage = () => {
  const searchParams = useSearchParams()
  const topicParam = searchParams.get('topic')

const helpTopics = [
  {
    id: 1,
    key: 'getting-started',
    title: 'Getting Started',
    description:
      'Learn how to create your account, set up your profile, and start using MedKonnect.',
    icon: <Stethoscope color="white" />,
    bgColor: '#7E22CE',
    image: '/5d2eb19a0c6f15af2be9f1e860e6a58af6cd29e2.jpg',
    content: <GetStarted />,
    tip: null
  },
  {
    id: 2,
    key: 'hospital-consultants',
    title: 'Hospital & Consultants',
    description:
      'Guidance on searching, comparing, and booking hospitals and consultants.',
    icon: <Hospital color="white" />,
    bgColor: '#007AFF',
    image: '/74f1cec4e3fc9ccb12b1f286e311c4639c560888.jpg',
    content: <HospitalConsultants />,
    tip: {
      message: 'A doctor’s profile only appears once their hospital has verified their credentials, giving you peace of mind.'
    }
  },
  {
    id: 3,
    key: 'telemedicine',
    title: 'Telemedicine',
    description:
      'Step-by-step help for booking and attending video consultations.',
    icon: <Cross color="white" />,
    bgColor: '#FF9500',
    image: '/c152951f8c2473b9114c19e0a69fa182a4090559.jpg',
    content: <TeleMedicine />,
    tip: {
      message: 'Keep your internet connection stable and join from a quiet place for the best experience.'
    }
  },
  {
    id: 4,
    key: 'travel-planning',
    title: 'Travel Planning',
    description:
      'Assistance with travel agents, packages, visas, flights, and accommodation.',
    icon: <Plane color="white" />,
    bgColor: '#17B26A',
    image: '/5e67b6eeb0298d9868a92c235a792e9f274c110d.jpg',
    content: <TrevelPlanning />,
    tip: {
      message: 'Look for agents with high ratings and positive patient reviews before booking.'
    }
  },
  {
    id: 5,
    key: 'payments-billing',
    title: 'Payments & Billing',
    description:
      'Learn about supported payment methods, receipts, and refunds.',
    icon: <CreditCard color="white" />,
    bgColor: '#155EEF',
    image: '/471d4447865ffb47f99f2b6ca381953c063a72ef.jpg',
    content: <PaymentBilling />,
    tip: {
      message: 'Always check that the payment status shows Confirmed in your dashboard before your appointment.'
    }
  },
  {
    id: 6,
    key: 'account-security',
    title: 'Account & Security',
    description:
      'Manage your account details, notifications, and login security.',
    icon: <ShieldCheck color="white" />,
    bgColor: '#313131',
    image: '/e865b72a5fc3fd8fc0511a14a6722c31894a1e3d.jpg',
    content: <AccountSecurity />,
    tip: {
      message: 'Always log out when using MedKonnect on a shared device.'
    }
  },
  {
    id: 7,
    key: 'rating-review',
    title: 'Reviews & Ratings',
    description:
      'How to leave feedback for hospitals, Consultants, and agents.',
    icon: <Star color="white" />,
    bgColor: '#FF2D55',
    image: '/83ba28b183da7927c40c328cd66d9abb209e177c.jpg',
    content: <ReviewRating />,
    tip: {
      message: 'Be honest and specific — it helps future patients most.'
    }
  },
  {
    id: 8,
    key: 'trust-safety',
    title: 'Trust Safety',
    description:
      'How MedKonnect ensures your data and experience are secure.',
    icon: <ShieldEllipsis color="white" />,
    bgColor: '#00C7BE',
    image: '/77ff4a3bc50fc28290402a27a0a9e0f377019ceb.jpg',
    content: <TrustSecurity />,
    tip: {
      message: 'Look for the Verified Badge on hospital and doctor profiles before booking.'
    }
  },
]


  // ✅ Selected topic if query param is set
  const selectedTopic = topicParam
    ? helpTopics.find((topic) => topic.key === topicParam)
    : null

  // ✅ Detail Page View
  if (selectedTopic) {
    return (
      <div className="">
        {/* Header */}
        <div className="bg-white shadow flex items-center gap-5 h-[92px] p-[24px]">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-[20px] h-[20px]" />
          </Button>
          <div>
            <p className="flex items-center gap-2 text-[#C0C0C0] text-[14px] font-light">
              Help Center | <span className="text-black">{selectedTopic.title}</span>
            </p>
          </div>
        </div>

        <div className='w-[720px] mx-auto my-10'>
            {/* Image */}
            {selectedTopic.image && (
              <img
                src={selectedTopic.image}
                alt={selectedTopic.title}
                className="w-full h-[300px] object-cover rounded-2xl shadow-sm"
              />
            )}
            <div className="mt-6">{selectedTopic.content}</div>
            {selectedTopic?.tip && (
              <Card className="mt-5">
                <CardHeader>
                  <CardTitle className="text-[18px] font-semibold flex items-center gap-3">
                    <div className="bg-[#155EEF] w-[24px] h-[24px] rounded-full flex items-center justify-center">
                      <Zap className="w-[16px] h-[16px]" color="white" />
                    </div>
                    Tip
                  </CardTitle>
                  <CardDescription className="text-[18px] font-light">
                    {selectedTopic.tip.message}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
        </div>
      </div>
    )
  }

  // ✅ Default Help Center Page
  return (
    <div className="p-5 flex flex-col lg:flex-row gap-5">
      {/* Contact Section */}
      <div className="w-full lg:w-1/3 space-y-5">
        <div className="space-y-2">
          <h2 className="font-bold text-[48px]">Contact Us</h2>
          <p className="text-[#717171] text-[18px] font-light">
            Need assistance? Our team is here to help.
          </p>
        </div>

        <Card className="p-[16px] space-y-3">
          <div className="space-y-2">
            <Label className="text-[12px] font-medium">Subject</Label>
            <Input
              placeholder="Subject"
              className="border border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[12px] font-medium">Message</Label>
            <Textarea
              placeholder="Describe your issue..."
              className="border border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light"
            />
          </div>
          <Button className="w-full h-[58px] py-[16px] rounded-[16px] text-[16px] font-light">
            Send Inquiry
          </Button>
        </Card>
      </div>

      {/* Help Topics */}
      <div className="w-full lg:w-[65%]">
        <div className="space-y-2 mb-5">
          <h2 className="font-bold text-[20px]">Need Help Quickly?</h2>
          <p className="text-[#717171] text-[18px] font-light">
            Find answers instantly from our knowledge base.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {helpTopics.map((topic) => (
            <Card
              key={topic.id}
              className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              onClick={() => (window.location.href = `?topic=${topic.key}`)}
            >
              <CardHeader className="space-y-3">
                <div
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: topic.bgColor }}
                >
                  {topic.icon}
                </div>
                <CardTitle className="text-[18px] font-medium">
                  {topic.title}
                </CardTitle>
                <CardDescription className="text-[#717171] text-[14px]">
                  {topic.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HelpSupportPage
