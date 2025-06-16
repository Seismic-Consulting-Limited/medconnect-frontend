"use client"

import Link from "next/link"
import { ArrowRight, Building2, CheckCircle, Globe, HeartPulse, LineChart, Plane, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-primary-900 text-white py-16 md:py-24 relative overflow-hidden">
          {/* Abstract background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
              {Array(20)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border-t border-l border-white/5"></div>
                ))}
            </div>
          </div>

          <ResponsiveContainer className="relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
                    Partner Program
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                    Join Our Global Healthcare Network
                  </h1>
                  <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-[90%] sm:max-w-[600px]">
                    Connect with international patients seeking quality healthcare and travel services. Expand your
                    reach and increase your revenue.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-white text-primary-900 hover:bg-gray-100 w-full sm:w-auto text-base"
                    asChild
                  >
                    <Link href="/partners/hospital-signup">
                      Join as Hospital
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    className="bg-primary-700 text-white hover:bg-primary-600 w-full sm:w-auto text-base"
                    asChild
                  >
                    <Link href="/partners/agent-signup">
                      Join as Travel Agent
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 relative">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-4 md:space-y-6 pt-12">
                    <div className="bg-white rounded-lg shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Hospital Partners</h3>
                          <p className="text-sm text-gray-500">300+ worldwide</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Patient Connections</h3>
                          <p className="text-sm text-gray-500">10,000+ annually</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Global Reach</h3>
                          <p className="text-sm text-gray-500">50+ countries</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-white rounded-lg shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Plane className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Travel Agents</h3>
                          <p className="text-sm text-gray-500">150+ specialists</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <LineChart className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Revenue Growth</h3>
                          <p className="text-sm text-gray-500">40% avg. increase</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <HeartPulse className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Specialties</h3>
                          <p className="text-sm text-gray-500">25+ treatment areas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <ResponsiveContainer>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                Why Partner With MedConnect?
              </h2>
              <p className="text-gray-600 max-w-[800px] mx-auto">
                Join our global network of healthcare providers and travel specialists to expand your reach and grow
                your business.
              </p>
            </div>

            <Tabs defaultValue="hospitals" className="w-full">
              <div className="flex justify-center mb-10">
                <div className="inline-flex items-center border-b border-gray-200 w-auto">
                  <TabsList className="bg-transparent h-auto p-0 flex gap-12">
                    <TabsTrigger
                      value="hospitals"
                      className="text-lg font-medium px-1 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent hover:text-primary/80 transition-colors"
                    >
                      For Hospitals
                    </TabsTrigger>
                    <TabsTrigger
                      value="agents"
                      className="text-lg font-medium px-1 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent hover:text-primary/80 transition-colors"
                    >
                      For Travel Agents
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="hospitals" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Global Reach</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Connect with patients from around the world seeking quality healthcare services at competitive
                        prices.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <LineChart className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Increased Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Boost your facility's occupancy and revenue by tapping into the growing medical tourism market.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Verified Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Receive pre-screened patient inquiries with complete medical information and payment
                        verification.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Coordinated Care</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Work with our network of travel agents who handle all non-medical aspects of patient journeys,
                        allowing you to focus on providing excellent care.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Brand Enhancement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Showcase your facilities, specialties, and success stories to a global audience through our
                        platform and marketing channels.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="agents" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Plane className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Specialized Market</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Focus on the growing medical tourism niche with clients who need comprehensive travel services.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <HeartPulse className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Hospital Partnerships</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Gain direct access to our network of verified international hospitals and healthcare providers.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Qualified Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Receive high-quality leads from patients who have already selected their medical providers and
                        treatments.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Global Clientele</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Expand your client base internationally with patients seeking medical care abroad who need
                        comprehensive travel assistance.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary-50 hover:border-primary-100 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <LineChart className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Higher Value Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Medical travelers typically book longer stays and require more comprehensive services, resulting
                        in higher-value bookings.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </ResponsiveContainer>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <ResponsiveContainer>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-[800px] mx-auto">
                Our streamlined onboarding process gets you connected with patients quickly and efficiently.
              </p>
            </div>

            <Tabs defaultValue="hospitals" className="w-full">
              <div className="flex justify-center mb-10">
                <div className="inline-flex items-center border-b border-gray-200 w-auto">
                  <TabsList className="bg-transparent h-auto p-0 flex gap-12">
                    <TabsTrigger
                      value="hospitals"
                      className="text-lg font-medium px-1 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent hover:text-primary/80 transition-colors"
                    >
                      For Hospitals
                    </TabsTrigger>
                    <TabsTrigger
                      value="agents"
                      className="text-lg font-medium px-1 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent hover:text-primary/80 transition-colors"
                    >
                      For Travel Agents
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="hospitals">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                      1
                    </div>
                    <h3 className="text-lg font-bold mb-2">Apply</h3>
                    <p className="text-gray-600">
                      Complete our comprehensive hospital application with details about your facilities, specialties,
                      and services.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                      2
                    </div>
                    <h3 className="text-lg font-bold mb-2">Verification</h3>
                    <p className="text-gray-600">
                      Our team reviews your credentials, accreditations, and quality standards to ensure excellence.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                      3
                    </div>
                    <h3 className="text-lg font-bold mb-2">Profile Creation</h3>
                    <p className="text-gray-600">
                      Build your comprehensive hospital profile with photos, videos, doctor bios, and treatment details.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                      4
                    </div>
                    <h3 className="text-lg font-bold mb-2">Start Receiving Patients</h3>
                    <p className="text-gray-600">
                      Begin receiving inquiries and bookings from international patients seeking your services.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="agents">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                      1
                    </div>
                    <h3 className="text-lg font-bold mb-2">Apply</h3>
                    <p className="text-gray-600">
                      Submit your application with information about your agency, services, and experience with medical
                      travelers.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                      2
                    </div>
                    <h3 className="text-lg font-bold mb-2">Verification</h3>
                    <p className="text-gray-600">
                      We verify your business credentials, insurance, and track record to ensure reliability.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                      3
                    </div>
                    <h3 className="text-lg font-bold mb-2">Profile Setup</h3>
                    <p className="text-gray-600">
                      Create your agency profile highlighting your services, destinations, languages, and specialties.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                      4
                    </div>
                    <h3 className="text-lg font-bold mb-2">Connect with Patients</h3>
                    <p className="text-gray-600">
                      Start receiving travel requests from patients who have selected their medical providers.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ResponsiveContainer>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <ResponsiveContainer>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                Partner Success Stories
              </h2>
              <p className="text-gray-600 max-w-[800px] mx-auto">
                Hear from hospitals and travel agents who have grown their business with MedConnect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 border-primary-50">
                <CardContent className="p-8">
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-600 italic text-lg">
                      "Joining MedConnect has transformed our international patient program. We've seen a 40% increase
                      in international patients, with the platform handling all the initial screening and coordination."
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src="/female-doctor-portrait.png"
                          alt="Hospital Director"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold">Dr. Sarah Chen</p>
                        <p className="text-gray-500">International Patient Director</p>
                        <p className="text-primary">Bangkok International Hospital</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary-50">
                <CardContent className="p-8">
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-600 italic text-lg">
                      "As a travel agency specializing in medical tourism, MedConnect has been invaluable. The direct
                      connection with verified hospitals and pre-qualified patients has streamlined our operations and
                      increased our bookings by 65%."
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src="/male-business-portrait.png"
                          alt="Travel Agency CEO"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold">Miguel Rodriguez</p>
                        <p className="text-gray-500">CEO</p>
                        <p className="text-primary">Global Health Journeys</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ResponsiveContainer>
        </section>

        {/* FAQ Section with Purple Background */}
        <section className="w-full py-16 md:py-24 bg-primary-50">
          <ResponsiveContainer>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-4 text-primary-900">
                Frequently Asked Questions
              </h2>
              <p className="text-primary-800/80 max-w-[800px] mx-auto">
                Get answers to common questions about joining the MedConnect partner network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 text-primary-900">
                    How long does the application process take?
                  </h3>
                  <p className="text-gray-700">
                    The typical application review process takes 2-3 weeks. Once approved, you can set up your profile
                    and start receiving patient inquiries within a month.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 text-primary-900">What accreditations do hospitals need?</h3>
                  <p className="text-gray-700">
                    We accept hospitals with JCI, ISO, national healthcare accreditations, or equivalent quality
                    certifications. Our team will review your credentials during the application process.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 text-primary-900">Are there any fees to join?</h3>
                  <p className="text-gray-700">
                    MedConnect operates on a commission-based model. There are no upfront fees to join the platform. We
                    only earn when you successfully treat patients or book travel.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 text-primary-900">How do patients find my hospital/agency?</h3>
                  <p className="text-gray-700">
                    Patients discover partners through our search platform, matching algorithm, and personalized
                    recommendations based on their medical needs, budget, and preferences.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 text-primary-900">Can I control which patients I accept?</h3>
                  <p className="text-gray-700">
                    Yes, you have full control over which patient inquiries you respond to and accept. You can set
                    parameters for the types of cases you want to receive.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2 text-primary-900">How do I get started?</h3>
                  <p className="text-gray-700">
                    Click on either "Join as Hospital" or "Join as Travel Agent" at the top of this page to begin the
                    application process. Our team will guide you through each step.
                  </p>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
