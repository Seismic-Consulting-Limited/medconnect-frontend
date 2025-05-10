import { ArrowRight, CheckCircle, Globe, ShieldCheck, Building2, Wallet, Laptop } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function VendorsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary-50 to-blue-50">
          <ResponsiveContainer>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Partner With Our <br />
                    <span className="text-primary">Global Network</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Join our affiliate program and connect with patients seeking quality healthcare services worldwide.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-primary-700">
                    Become a Partner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary-50">
                    View Our Partners
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mr-0">
                <img
                  alt="Medical partnership network"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                  src="/images/medical-partnership.jpg"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <ResponsiveContainer>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-700">
                  Why Partner With Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Benefits for Vendors</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join hundreds of healthcare service providers already benefiting from our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
              <Card className="group hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary-100 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Globe className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Global Exposure</h3>
                    <p className="text-gray-500">
                      Reach patients from around the world looking specifically for your services.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="group hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary-100 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Wallet className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Increased Revenue</h3>
                    <p className="text-gray-500">
                      Gain qualified leads and referrals from patients actively seeking medical services.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="group hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary-100 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Laptop className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Easy Integration</h3>
                    <p className="text-gray-500">
                      Simple affiliate tracking with detailed analytics on referrals and conversions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <ResponsiveContainer>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto lg:ml-0 order-2 lg:order-1">
                <Tabs defaultValue="hospitals" className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="hospitals"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      Hospitals
                    </TabsTrigger>
                    <TabsTrigger
                      value="travel"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      Travel
                    </TabsTrigger>
                    <TabsTrigger
                      value="insurance"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      Insurance
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="hospitals" className="p-4 border rounded-lg mt-2">
                    <div className="space-y-4">
                      <h3 className="font-medium">For Hospitals & Clinics</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Showcase your specialized treatments and facilities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Receive direct referrals from interested patients</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Highlight accreditations and success rates</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Transparent commission structure on completed treatments</span>
                        </li>
                      </ul>
                      <div className="pt-2">
                        <Button className="w-full bg-primary hover:bg-primary-700">Apply as a Hospital</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="travel" className="p-4 border rounded-lg mt-2">
                    <div className="space-y-4">
                      <h3 className="font-medium">For Travel Services</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Connect with patients needing travel arrangements</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Offer specialized medical travel packages</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Provide airport transfers and local transportation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Earn commissions on booked travel services</span>
                        </li>
                      </ul>
                      <div className="pt-2">
                        <Button className="w-full bg-primary hover:bg-primary-700">Apply as Travel Partner</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="insurance" className="p-4 border rounded-lg mt-2">
                    <div className="space-y-4">
                      <h3 className="font-medium">For Insurance Providers</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Offer medical travel insurance packages</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Connect with patients seeking coverage</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Provide specialized international healthcare coverage</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Transparent affiliate commission structure</span>
                        </li>
                      </ul>
                      <div className="pt-2">
                        <Button className="w-full bg-primary hover:bg-primary-700">Apply as Insurance Partner</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-700">
                    Partner Categories
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Multiple Partnership Opportunities
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Whether you're a hospital, travel service, or insurance provider, our platform connects you with
                    patients seeking your specific services.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Verified Partners</h3>
                      <p className="text-gray-500">
                        We carefully verify all partners to ensure the highest quality of service for our users.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Transparent Tracking</h3>
                      <p className="text-gray-500">
                        Our affiliate system provides clear tracking of referrals and conversions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <ResponsiveContainer>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-700">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Partnership Process</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our affiliate network in four easy steps and start receiving qualified patient referrals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <div className="flex flex-col items-center space-y-2 text-center group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="text-xl font-bold text-primary group-hover:text-white">1</span>
                </div>
                <h3 className="text-xl font-bold">Apply</h3>
                <p className="text-sm text-gray-500">
                  Complete our partnership application with your service details and credentials.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="text-xl font-bold text-primary group-hover:text-white">2</span>
                </div>
                <h3 className="text-xl font-bold">Verification</h3>
                <p className="text-sm text-gray-500">Our team verifies your credentials and service quality.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="text-xl font-bold text-primary group-hover:text-white">3</span>
                </div>
                <h3 className="text-xl font-bold">Integration</h3>
                <p className="text-sm text-gray-500">Set up your affiliate tracking and customize your profile.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="text-xl font-bold text-primary group-hover:text-white">4</span>
                </div>
                <h3 className="text-xl font-bold">Receive Referrals</h3>
                <p className="text-sm text-gray-500">
                  Start receiving qualified patient referrals and track your performance.
                </p>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <ResponsiveContainer>
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Ready to Expand Your Reach?
              </h2>
              <p className="text-white/80 md:text-xl">Join our network of healthcare service providers today.</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-primary"
                >
                  Learn More
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
