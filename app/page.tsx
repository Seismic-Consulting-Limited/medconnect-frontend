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
        <section className="w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          {/* Reduced spacer div */}
          <div className="h-12 sm:h-16 md:h-24 lg:h-28"></div>

          <ResponsiveContainer>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center md:pt-8">
              {/* Swapped order - Image first */}
              <div className="mx-auto lg:ml-0 w-full max-w-[90%] sm:max-w-[80%] lg:max-w-full order-2 lg:order-1">
                <HeroCarousel />
              </div>

              {/* Text content second */}
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

          {/* Bottom padding for the section */}
          <div className="py-8 md:py-12 lg:py-16"></div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-700">
                  Our Services
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
                  Your Complete Healthcare Journey
                </h2>
                <p className="text-sm sm:text-base text-gray-500 max-w-[100%] sm:max-w-[90%] md:max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MedConnect provides everything you need for your medical travel experience
                </p>
              </div>
            </div>

            {/* Row 1 */}
            <div className="flex flex-wrap lg:flex-nowrap gap-8 mb-8">
              {/* Box 1 - Explore Hospitals (Image and Text) */}
              <div className="flex flex-col lg:flex-row border border-gray-200 shadow-md w-full lg:w-[713px] h-auto lg:h-[280px]">
                <img
                  src="/modern-hospital-exterior.png"
                  alt="Modern hospital building"
                  className="w-full lg:w-[50%] h-[200px] lg:h-full object-cover"
                />
                <div className="p-4 lg:p-6 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Explore Hospitals</h3>
                    <p className="text-gray-600 text-md leading-relaxed">
                      Find the perfect hospital for your needs by searching our comprehensive database. Filter by
                      treatment type, location, cost, and more to discover world-class healthcare facilities tailored to
                      your specific requirements.
                    </p>
                  </div>
                  <Link href="/hospitals" className="text-primary font-bold text-md flex items-center mt-2">
                    Find Hospitals
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Box 2 - Pre-Consultation (Text Only) */}
              <div className="border border-gray-200 p-4 lg:p-6 flex flex-col justify-between shadow-md w-full lg:w-[503px] h-auto lg:h-[280px]">
                <div>
                  <h3 className="text-lg font-bold mb-2">Pre-Consultation</h3>
                  <p className="text-gray-600 text-md leading-relaxed">
                    Connect with specialists for pre-consultation planning before your trip to discuss treatment options
                    and prepare for your procedure. Our telemedicine platform ensures you receive expert guidance from
                    the comfort of your home.
                  </p>
                </div>
                <Link
                  href="/telemedicine#pre-treatment"
                  className="text-primary font-bold text-md flex items-center mt-2"
                >
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap lg:flex-nowrap gap-8">
              {/* Box 3 - Travel Agents (Text Only) */}
              <div className="border border-gray-200 p-4 lg:p-6 flex flex-col justify-between shadow-md w-full lg:w-[503px] h-auto lg:h-[280px]">
                <div>
                  <h3 className="text-lg font-bold mb-2">Travel Agents</h3>
                  <p className="text-gray-600 text-md leading-relaxed">
                    Our specialized travel agents handle all non-medical aspects of your journey, including flights,
                    accommodation, and local support. Focus on your health while experienced professionals take care of
                    the logistics and cultural navigation.
                  </p>
                </div>
                <Link href="/travel-agents" className="text-primary font-bold text-md flex items-center mt-2">
                  Find Travel Agents
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Box 4 - Post-Care Rehab (Image and Text) */}
              <div className="flex flex-col lg:flex-row border border-gray-200 shadow-md w-full lg:w-[713px] h-auto lg:h-[280px]">
                <img
                  src="/placeholder.svg?key=r3h4b"
                  alt="Post-care rehabilitation session"
                  className="w-full lg:w-[50%] h-[200px] lg:h-full object-cover"
                />
                <div className="p-4 lg:p-6 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Post-Care Rehab</h3>
                    <p className="text-gray-600 text-md leading-relaxed">
                      Receive comprehensive rehabilitation and follow-up care after your procedure to ensure optimal
                      recovery and long-term results. Our post-care programs are designed to support your healing
                      journey every step of the way.
                    </p>
                  </div>
                  <Link
                    href="/telemedicine#continuous-care"
                    className="text-primary font-bold text-md flex items-center mt-2"
                  >
                    Explore Post-Care
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Telemedicine Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
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
                      src="/placeholder.svg?key=a7iim"
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
                  variant="outline"
                  className="text-white border-white hover:bg-primary-800 hover:text-white hover:border-transparent w-full sm:w-auto"
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
