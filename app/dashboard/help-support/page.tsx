import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Stethoscope,
  Hospital,
  UserCog,
  Plane,
  CreditCard,
  Cross,
  ShieldCheck,
  Star,
  ShieldEllipsis,
} from 'lucide-react'
import React from 'react'

const HelpSupportPage = () => {
  // ✅ Array of help topics
  const helpTopics = [
    {
      id: 1,
      title: 'Getting Started',
      description:
        'Learn how to create your account, set up your profile, and start using MedKonnect.',
      icon: <Stethoscope color="white" />,
      bgColor: '#00C7BE',
    },
    {
      id: 2,
      title: 'Hospital & Consultants',
      description:
        'Guidance on searching, comparing, and booking hospitals and Consultants.',
      icon: <Hospital color="white" />,
      bgColor: '#7E22CE',
    },
    {
      id: 3,
      title: 'Telemedicine',
      description:
        'Step-by-step help for booking and attending video consultations.',
      icon: <Cross color="white" />,
      bgColor: '#00C7BE',
    },
    {
      id: 4,
      title: 'Travel Planning',
      description:
        'Assistance with travel agents, packages, visas, flights, and accommodation.',
      icon: <Plane color="white" />,
      bgColor: '#FF9500',
    },
    {
      id: 5,
      title: 'Payments & Billing',
      description:
        'Learn about supported payment methods, receipts, and refunds.',
      icon: <CreditCard color="white" />,
      bgColor: '#155EEF',
    },
    {
      id: 6,
      title: 'Account & Security',
      description:
        'Manage your account details, notifications, and login security.',
      icon: <ShieldCheck  color="white" />,
      bgColor: '#313131',
    },
    {
      id: 7,
      title: 'Reviews & Ratings',
      description:
        'How to leave feedback for hospitals, Consultants, and agents.',
      icon: <Star  color="white" />,
      bgColor: '#FF2D55',
    },
    {
      id: 8,
      title: 'Trust Safety',
      description:
        'See how MedKonnect protects your data and ensures secure healthcare Specialties.',
      icon: <ShieldEllipsis  color="white" />,
      bgColor: '#00C7BE',
    },
  ]

  return (
    <div className="p-5 flex flex-col lg:flex-row gap-5">
      {/* Contact Form Section */}
      <div className="w-full lg:w-[35%] space-y-5">
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
              placeholder="john.doe@gmail.com"
              className="border border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light placeholder:text-[#C0C0C0] placeholder:text-[14px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[12px] font-medium">Message</Label>
            <Textarea
              placeholder="Please describe your medical needs and any questions you have."
              className="border border-[#D7D7D7] py-[8px] px-[12px] rounded-[16px] font-light placeholder:text-[#C0C0C0] placeholder:text-[14px]"
            />
          </div>
          <Button className="w-full h-[58px] py-[16px] px-[24px] rounded-[16px] text-[16px] font-light">
            Send Inquiry
          </Button>
        </Card>
      </div>

      {/* Help Topics Section */}
      <div className="w-full lg:w-[65%]">
        <div className="space-y-2 mb-5">
          <h2 className="font-bold text-[20px]">Need Help Quickly?</h2>
          <p className="text-[#717171] text-[18px] font-light">
            Find answers instantly from our knowledge base.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {helpTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-md transition-shadow">
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
