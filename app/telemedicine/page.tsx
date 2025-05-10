import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  MessageSquare,
  ShieldCheck,
  Stethoscope,
  Video,
  Users,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TelemedicinePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Redesigned Hero Section with Neutral Colors */}
        <section className="w-full py-12 md:py-24 bg-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?key=medical-pattern')] opacity-5 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 py-1 px-3 rounded-full text-sm font-medium mb-2 w-fit">
                  <Video className="h-4 w-4" />
                  <span>Virtual Healthcare</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Connect With Specialists <span className="text-purple-600">Worldwide</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Our telemedicine platform bridges borders, connecting you with top international healthcare
                    providers before, during, and after your medical journey.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-2">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                    <Link href="/telemedicine/schedule">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    How It Works
                  </Button>
                </div>
              </div>
              <div className="relative lg:ml-auto">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-100 rounded-full opacity-70 blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-100 rounded-full opacity-70 blur-2xl"></div>
                <div className="relative z-10 bg-white p-2 rounded-2xl shadow-xl">
                  <div className="aspect-video overflow-hidden rounded-xl relative">
                    <img
                      alt="Telemedicine Consultation"
                      className="object-cover w-full h-full"
                      src="/telehealth-consultation.png"
                      width={600}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Video className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                          <p className="text-xs text-gray-500">Cardiology Specialist • Available Now</p>
                        </div>
                        <Button size="sm" className="ml-auto bg-purple-600 hover:bg-purple-700">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Global Network</p>
                  <p className="text-sm text-gray-500">50+ countries</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Specialists</p>
                  <p className="text-sm text-gray-500">2,000+ doctors</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Hospitals</p>
                  <p className="text-sm text-gray-500">300+ facilities</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Secure</p>
                  <p className="text-sm text-gray-500">HIPAA compliant</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mindiser Section - Moved up after hero */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700 mb-2">
                Mental Health Support
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Introducing Mindiser</h2>
              <p className="text-gray-500 md:text-lg max-w-3xl mx-auto">
                Our specialized mental health platform connecting you with therapists and psychiatrists to support your
                emotional wellbeing throughout your medical journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Comprehensive Mental Health Support</h3>
                <p className="text-gray-500">
                  Medical journeys can be emotionally challenging. Mindiser provides specialized support to help you
                  navigate anxiety, stress, and adjustment throughout your treatment process.
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Licensed therapists and psychiatrists specializing in medical journey support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Multilingual providers who understand cultural nuances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Flexible scheduling with sessions available 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Secure, HIPAA-compliant platform for complete privacy</span>
                  </li>
                </ul>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/telemedicine/schedule">
                    Explore Mindiser
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-100 rounded-full opacity-50"></div>
                <img
                  src="/placeholder.svg?key=u0pch"
                  alt="Mindiser therapy session"
                  className="rounded-xl shadow-lg relative z-10"
                  width={600}
                  height={500}
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-100 rounded-full opacity-50"></div>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-bold text-center mb-12">Our Mental Health Services</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-purple-100 rounded-full">
                        <MessageSquare className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-bold">AI Mental Health Assistant</h4>
                      <p className="text-gray-500">
                        Our 24/7 AI chatbot provides immediate support, coping strategies, and resources for managing
                        stress, anxiety, and other concerns during your medical journey.
                      </p>
                      <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        Chat Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-purple-100 rounded-full">
                        <FileText className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-bold">Mental Health Assessment</h4>
                      <p className="text-gray-500">
                        Take our comprehensive assessment to identify potential mental health concerns related to your
                        medical treatment and receive personalized recommendations.
                      </p>
                      <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        Start Assessment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Users className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-bold">Therapist Matching</h4>
                      <p className="text-gray-500">
                        Get matched with specialized therapists and access curated mental health resources tailored to
                        your specific medical journey and cultural background.
                      </p>
                      <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        Find Resources
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Treatment Consultation Section */}
        <section id="pre-treatment" className="w-full py-16 md:py-24 bg-white scroll-mt-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 mb-2">
                Pre-Treatment
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                Expert Consultation Before You Travel
              </h2>
              <p className="text-gray-500 md:text-lg max-w-3xl mx-auto">
                Connect with international specialists to discuss your condition, treatment options, and travel
                preparations before making any commitments.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:gap-16 items-center py-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Plan Your Medical Journey</h3>
                <p className="text-gray-500 md:text-lg">
                  Our pre-treatment consultations help you make informed decisions about your care abroad.
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Secure video consultations with specialists from top international hospitals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Review your medical records and get personalized treatment recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Discuss costs, travel logistics, and accommodation options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Get a second opinion before making your final decision</span>
                  </li>
                </ul>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/telemedicine/schedule">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-full opacity-50"></div>
                <img
                  src="/placeholder.svg?key=wnlt7"
                  alt="Pre-treatment consultation"
                  className="rounded-xl shadow-lg relative z-10"
                  width={600}
                  height={500}
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-100 rounded-full opacity-50"></div>
              </div>
            </div>

            <div className="py-12 mt-8">
              <h3 className="text-2xl font-bold text-center mb-12">How Pre-Treatment Consultation Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                  <h4 className="font-bold mb-2">Submit Records</h4>
                  <p className="text-gray-500 text-sm">
                    Upload your medical records and describe your condition through our secure portal.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Stethoscope className="h-8 w-8 text-gray-600" />
                  </div>
                  <h4 className="font-bold mb-2">Match with Specialists</h4>
                  <p className="text-gray-500 text-sm">
                    We'll match you with the best specialists for your condition from our global network.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Video className="h-8 w-8 text-gray-600" />
                  </div>
                  <h4 className="font-bold mb-2">Video Consultation</h4>
                  <p className="text-gray-500 text-sm">
                    Connect with your specialist through our secure video platform for a thorough discussion.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-gray-600" />
                  </div>
                  <h4 className="font-bold mb-2">Treatment Planning</h4>
                  <p className="text-gray-500 text-sm">
                    Receive a detailed treatment plan and travel recommendations for your medical journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Post-Care Section */}
        <section id="continuous-care" className="w-full py-16 md:py-24 bg-gray-50 scroll-mt-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-700 mb-2">
                Continuous Care
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Post-Treatment Follow-Up Care</h2>
              <p className="text-gray-500 md:text-lg max-w-3xl mx-auto">
                Your healing journey continues after you return home. Our post-care telemedicine services ensure
                seamless continuity with your international healthcare providers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative order-2 md:order-1">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gray-200 rounded-full opacity-50"></div>
                <img
                  src="/placeholder.svg?key=mqao2"
                  alt="Post-treatment follow-up"
                  className="rounded-xl shadow-lg relative z-10"
                  width={600}
                  height={500}
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-100 rounded-full opacity-50"></div>
              </div>
              <div className="space-y-4 order-1 md:order-2">
                <h3 className="text-2xl font-bold">Stay Connected with Your Care Team</h3>
                <p className="text-gray-500">
                  Our platform enables you to maintain regular contact with the same specialists who performed your
                  treatment, ensuring consistent care and monitoring of your recovery progress.
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Regular video check-ups with your international specialists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Secure messaging for non-urgent questions and concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Digital monitoring of vital signs and recovery metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Coordination with local healthcare providers when needed</span>
                  </li>
                </ul>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/telemedicine/schedule">
                    Schedule Follow-Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-bold text-center mb-12">Comprehensive Recovery Support</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <Video className="h-8 w-8 text-gray-600" />
                      </div>
                      <h4 className="text-xl font-bold">Virtual Physiotherapy</h4>
                      <p className="text-gray-500">
                        Guided rehabilitation sessions with specialized physiotherapists to ensure proper recovery and
                        mobility restoration.
                      </p>
                      <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <Clock className="h-8 w-8 text-gray-600" />
                      </div>
                      <h4 className="text-xl font-bold">Recovery Tracking</h4>
                      <p className="text-gray-500">
                        Digital tools to monitor your progress, track symptoms, and share real-time data with your
                        healthcare team for personalized adjustments.
                      </p>
                      <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <MessageSquare className="h-8 w-8 text-gray-600" />
                      </div>
                      <h4 className="text-xl font-bold">Nutrition & Lifestyle</h4>
                      <p className="text-gray-500">
                        Personalized guidance from nutritionists and lifestyle coaches to optimize your recovery and
                        maintain long-term health benefits.
                      </p>
                      <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Security & Privacy</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Your Data is Protected</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We take your privacy seriously with industry-leading security measures.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <ShieldCheck className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold">HIPAA Compliant</h3>
                    <p className="text-gray-500">
                      Our platform meets all healthcare privacy standards to protect your sensitive medical information.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Globe className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold">Global Standards</h3>
                    <p className="text-gray-500">
                      We comply with international data protection regulations including GDPR for European patients.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <ShieldCheck className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold">End-to-End Encryption</h3>
                    <p className="text-gray-500">
                      All video consultations and messages are encrypted to ensure your conversations remain private.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-purple-600">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Ready to Connect with Global Specialists?
              </h2>
              <p className="text-white/80 md:text-xl">Schedule your first telemedicine consultation today.</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                  <Link href="/telemedicine/schedule">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-purple-700">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
