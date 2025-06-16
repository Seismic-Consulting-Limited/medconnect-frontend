"use client"

import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Globe,
  MessageSquare,
  Plane,
  Shield,
  Star,
  Video,
  CalendarClock,
  Stethoscope,
  Search,
  VideoIcon,
  Activity,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { HeroCarousel } from "@/components/hero-carousel"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero section - unchanged */}
        <section className="w-full bg-gradient-to-br from-primary-50 via-white to-primary-100">
          <div className="h-12 sm:h-16 md:h-24 lg:h-28"></div>
          <ResponsiveContainer>
            {/* Hero content - unchanged */}
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center md:pt-8">
              <div className="mx-auto lg:ml-0 w-full max-w-[90%] sm:max-w-[80%] lg:max-w-full order-2 lg:order-1">
                <HeroCarousel />
              </div>
              <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                    Global Healthcare, <br />
                    <span className="text-primary">Simplified</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-[90%] sm:max-w-[600px]">
                    One platform connecting you to world-class hospitals, telemedicine specialists, and travel support
                    worldwide.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary-700 text-white w-full sm:w-auto text-base"
                    onClick={() => document.getElementById("signup-modal-trigger")?.click()}
                  >
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary text-primary hover:bg-primary-50 w-full sm:w-auto text-base"
                    asChild
                  >
                    <Link href="/hospitals">Explore Hospitals</Link>
                  </Button>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
          <div className="py-8 md:py-12 lg:py-16"></div>
        </section>

        {/* REDESIGNED OUR SERVICES SECTION - SIMPLIFIED TO 4 CARDS */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 mb-2">
                Our Services
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
                Your Complete Healthcare Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-[800px] mx-auto">
                MedConnect provides everything you need for your medical travel experience, from finding the right
                hospital to post-treatment care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {/* Service Card 1 */}
              <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Search className="w-7 h-7 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Hospital Search</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Find the perfect hospital for your needs with our comprehensive database of international
                      healthcare facilities.
                    </p>
                    <Link
                      href="/hospitals"
                      className="inline-flex items-center text-primary font-medium hover:text-primary-700 transition-colors text-sm"
                    >
                      Find Hospitals
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Service Card 2 */}
              <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <VideoIcon className="w-7 h-7 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Telemedicine</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Connect with specialists worldwide for consultations, second opinions, and follow-up care from
                      anywhere.
                    </p>
                    <Link
                      href="/telemedicine"
                      className="inline-flex items-center text-primary font-medium hover:text-primary-700 transition-colors text-sm"
                    >
                      Schedule Consultation
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Service Card 3 */}
              <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Plane className="w-7 h-7 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Travel Support</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Our specialized travel agents handle all logistics including flights, accommodation, and local
                      assistance.
                    </p>
                    <Link
                      href="/travel-agents"
                      className="inline-flex items-center text-primary font-medium hover:text-primary-700 transition-colors text-sm"
                    >
                      Find Travel Agents
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Service Card 4 */}
              <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Activity className="w-7 h-7 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Post-Care Rehabilitation</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Comprehensive rehabilitation and follow-up care to ensure optimal recovery after your procedure.
                    </p>
                    <Link
                      href="/telemedicine#post-care"
                      className="inline-flex items-center text-primary font-medium hover:text-primary-700 transition-colors text-sm"
                    >
                      Explore Post-Care
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Rest of the page - unchanged except for CTA section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-primary-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden border-none shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary-100 rounded-full">
                          <Video className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold">Virtual Consultations</h3>
                        <p className="text-sm text-gray-500">
                          Speak with specialists worldwide to discuss your condition, treatment options, and get expert
                          opinions.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary-100 rounded-full">
                          <CalendarClock className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold">Scheduled Sessions</h3>
                        <p className="text-sm text-gray-500">
                          Book appointments with healthcare providers at times convenient for you, regardless of time
                          zones.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary-100 rounded-full">
                          <Stethoscope className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold">Therapy Sessions</h3>
                        <p className="text-sm text-gray-500">
                          Receive ongoing therapy and treatment guidance from specialists through secure video sessions.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary-100 rounded-full">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold">Secure Messaging</h3>
                        <p className="text-sm text-gray-500">
                          Communicate with your healthcare team through encrypted messaging for quick questions and
                          updates.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-700">
                    Virtual Healthcare
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
                    Expert Care From Anywhere
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-[90%] sm:max-w-[600px]">
                    Our telemedicine platform connects you with specialists worldwide for consultations and therapy
                    sessions, no matter where you are.
                  </p>
                </div>
                <ul className="grid gap-3">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary-100 p-1 mt-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base">Consult with specialists before committing to travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary-100 p-1 mt-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base">
                      Receive therapy and counseling from the comfort of your home
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary-100 p-1 mt-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base">
                      Access multilingual providers who understand your needs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary-100 p-1 mt-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base">Get second opinions from world-renowned specialists</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary-700 text-white" asChild>
                    <Link href="/telemedicine">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedDestinations />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-primary-100">
          <ResponsiveContainer>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-700">
                    Travel Agents
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-5xl">
                    Travel Logistics Experts
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 max-w-[90%] sm:max-w-[600px]">
                    Our travel agents handle all non-medical aspects of your journey, so you can focus on your health.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary-100 p-1">
                      <Plane className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base">Transportation arrangements and airport transfers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary-100 p-1">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base">Comfortable accommodation near your hospital</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary-100 p-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base">Local support, translation services, and assistance</span>
                  </li>
                </ul>
                <div>
                  <Button className="bg-primary hover:bg-primary-700 text-white w-full sm:w-auto" asChild>
                    <Link href="/travel-agents">
                      Find Travel Agents
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mr-0">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      alt="Medical travel agent assisting patient"
                      className="w-full object-cover"
                      height={400}
                      src="/placeholder.svg?key=medical-travel-agent"
                      width={600}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <ResponsiveContainer>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-700">
                  Complete Travel Support
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything Handled For You
                </h2>
                <p className="text-sm sm:text-base text-gray-500 max-w-[100%] sm:max-w-[90%] md:max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Focus on your health while your travel agent takes care of all the details.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              <Card className="group hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary-100 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Plane className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Travel Arrangements</h3>
                    <p className="text-sm text-gray-500">
                      Flight bookings, visa assistance, and airport transfers to make your journey smooth.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="group hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary-100 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Building2 className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Accommodation</h3>
                    <p className="text-sm text-gray-500">
                      Medical-friendly hotels and apartments near your treatment facility.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="group hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary-100 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Globe className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Local Support</h3>
                    <p className="text-sm text-gray-500">
                      Translation services, transportation, and 24/7 assistance during your stay.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="group hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary-100 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Shield className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Insurance</h3>
                    <p className="text-sm text-gray-500">
                      Travel and medical insurance options to ensure you're fully covered during your healthcare
                      journey.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <ResponsiveContainer>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-700">
                  Success Stories
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">What Our Patients Say</h2>
                <p className="text-sm sm:text-base text-gray-500 max-w-[100%] sm:max-w-[90%] md:max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Real experiences from patients who found quality healthcare through MedConnect.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-0.5">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      "MedConnect connected me with an amazing travel agent who handled everything for my knee
                      replacement in Thailand. From hospital selection to my return home, everything was seamless. I
                      saved over 60% compared to US costs."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
                        RJ
                      </div>
                      <div>
                        <p className="font-medium">Robert Johnson</p>
                        <p className="text-sm text-gray-500">United States</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-0.5">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      "I was hesitant about dental work abroad, but my travel agent through MedConnect made it so easy.
                      They arranged everything with a top clinic in Mexico, handled my accommodations, and even planned
                      some sightseeing. I saved thousands!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
                        SL
                      </div>
                      <div>
                        <p className="font-medium">Sarah Lewis</p>
                        <p className="text-sm text-gray-500">Canada</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-0.5">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-gray-500">
                      "My travel agent arranged everything for my heart procedure in India. They coordinated with the
                      hospital, arranged comfortable accommodations, and even provided a local guide. The telemedicine
                      follow-ups they arranged were invaluable."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
                        DM
                      </div>
                      <div>
                        <p className="font-medium">David Miller</p>
                        <p className="text-sm text-gray-500">United Kingdom</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ResponsiveContainer>
        </section>

        {/* FIXED CTA SECTION WITH PROPER BUTTON STYLING */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <ResponsiveContainer>
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-white md:text-4xl lg:text-5xl">
                Ready to Start Your Healthcare Journey?
              </h2>
              <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl">
                Let our specialized travel agents handle everything for your medical trip abroad.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row justify-center pt-4">
                <Button
                  size="default"
                  className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto"
                  onClick={() => document.getElementById("signup-modal-trigger")?.click()}
                >
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="default"
                  className="bg-primary-700 text-white hover:bg-primary-600 border-primary-700 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/travel-agents">Find Travel Agents</Link>
                </Button>
              </div>
            </div>
          </ResponsiveContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
