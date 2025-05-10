"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Home,
  Building2,
  Stethoscope,
  Video,
  Plane,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserOnboarding } from "@/components/user-onboarding"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { JourneyTracker } from "@/components/dashboard/journey-tracker"
import { RecommendedHospitals } from "@/components/dashboard/recommended-hospitals"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { RecentActivity } from "@/components/dashboard/recent-activity"

// Mock data
const mockStats = {
  savedHospitals: 3,
  upcomingAppointments: 2,
  openInquiries: 1,
  savedTreatments: 4,
}

const mockJourneySteps = [
  {
    id: "research",
    title: "Research",
    description: "Explore hospitals and treatments",
    status: "completed" as const,
    date: "Completed Apr 10, 2024",
  },
  {
    id: "consultation",
    title: "Initial Consultation",
    description: "Virtual consultation with specialist",
    status: "completed" as const,
    date: "Completed Apr 18, 2024",
  },
  {
    id: "planning",
    title: "Treatment Planning",
    description: "Select hospital and schedule procedure",
    status: "current" as const,
    date: "In progress",
  },
  {
    id: "travel",
    title: "Travel Arrangements",
    description: "Book flights and accommodation",
    status: "upcoming" as const,
  },
  {
    id: "treatment",
    title: "Treatment",
    description: "Undergo medical procedure",
    status: "upcoming" as const,
  },
]

const mockHospitals = [
  {
    id: "h1",
    name: "Bangkok International Hospital",
    location: "Bangkok",
    country: "Thailand",
    rating: 4.8,
    specialties: ["Cardiology", "Orthopedics", "Neurology"],
    image: "/modern-hospital-exterior.png",
    match: 95,
  },
  {
    id: "h2",
    name: "Apollo Hospitals",
    location: "Chennai",
    country: "India",
    rating: 4.6,
    specialties: ["Oncology", "Transplants", "Cardiology"],
    image: "/indira-gandhi-hospital-exterior.png",
    match: 87,
  },
]

const mockAppointments = [
  {
    id: "a1",
    title: "Pre-Surgery Consultation",
    doctorName: "Sarah Johnson",
    specialty: "Cardiology",
    date: "May 15, 2024",
    time: "10:00 AM",
    type: "virtual" as const,
    status: "confirmed" as const,
  },
  {
    id: "a2",
    title: "Heart Valve Replacement",
    doctorName: "Raj Patel",
    specialty: "Cardiothoracic Surgery",
    hospitalName: "Bangkok International Hospital",
    date: "June 10, 2024",
    time: "8:30 AM",
    type: "in-person" as const,
    status: "confirmed" as const,
  },
]

const mockActivities = [
  {
    id: "act1",
    type: "view" as const,
    title: "Viewed Hospital",
    description: "Bangkok International Hospital",
    time: "2 hours ago",
  },
  {
    id: "act2",
    type: "inquiry" as const,
    title: "Sent Inquiry",
    description: "Requested pricing for heart valve replacement",
    time: "Yesterday",
  },
  {
    id: "act3",
    type: "appointment" as const,
    title: "Scheduled Appointment",
    description: "Pre-surgery consultation with Dr. Sarah Johnson",
    time: "2 days ago",
  },
  {
    id: "act4",
    type: "save" as const,
    title: "Saved Hospital",
    description: "Apollo Hospitals, Chennai",
    time: "3 days ago",
  },
]

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState("John")

  useEffect(() => {
    // Check if this is the first time the user is visiting the dashboard
    const hasCompletedOnboarding = localStorage.getItem("medconnect_onboarding_completed")
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem("medconnect_onboarding_completed", "true")
    setShowOnboarding(false)
  }

  const handleOnboardingSkip = () => {
    localStorage.setItem("medconnect_onboarding_completed", "true")
    setShowOnboarding(false)
  }

  if (showOnboarding) {
    return <UserOnboarding onComplete={handleOnboardingComplete} onSkip={handleOnboardingSkip} />
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MedConnect</span>
          </Link>
        </div>

        <nav className="space-y-1 p-4">
          <Link
            href="/dashboard"
            className="flex items-center rounded-md bg-primary-50 px-3 py-2 text-sm font-medium text-primary"
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/hospitals"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
          >
            <Building2 className="mr-3 h-5 w-5" />
            Hospitals
          </Link>

          <Link
            href="/treatments"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
          >
            <Stethoscope className="mr-3 h-5 w-5" />
            Treatments
          </Link>

          <Link
            href="/telemedicine"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
          >
            <Video className="mr-3 h-5 w-5" />
            Telemedicine
          </Link>

          <Link
            href="/travel"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
          >
            <Plane className="mr-3 h-5 w-5" />
            Travel Planning
          </Link>

          <p className="px-3 pt-5 pb-2 text-xs font-semibold uppercase text-gray-500">Personal</p>

          <Link
            href="/messages"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            Messages
          </Link>

          <Link
            href="/saved"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
          >
            <Heart className="mr-3 h-5 w-5" />
            Saved Items
          </Link>

          <Link
            href="/settings"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>

          <Link
            href="/"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search hospitals, treatments..." className="pl-8" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              <span className="sr-only">Notifications</span>
            </Button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-medium">
                {userName.charAt(0)}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">{userName}</div>
                <div className="text-xs text-gray-500">Patient</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
              <p className="text-gray-500">Here's an overview of your healthcare journey</p>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={mockStats} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Journey Tracker */}
                <JourneyTracker steps={mockJourneySteps} currentStepIndex={2} overallProgress={40} />

                {/* Upcoming Appointments */}
                <UpcomingAppointments appointments={mockAppointments} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Recommended Hospitals */}
                <RecommendedHospitals hospitals={mockHospitals} />

                {/* Recent Activity */}
                <RecentActivity activities={mockActivities} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
