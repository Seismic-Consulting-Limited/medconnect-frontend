"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function SignupSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50">
        <section className="py-16 md:py-24">
          <ResponsiveContainer>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                Application Submitted Successfully!
              </h1>

              <p className="text-gray-600 mb-8">
                Thank you for applying to join the MedConnect partner network. Our team will review your application and
                get back to you within 3-5 business days.
              </p>

              <Card className="border-2 border-primary-50 mb-8">
                <CardHeader>
                  <CardTitle>What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium">Application Review</h3>
                        <p className="text-sm text-gray-500">
                          Our team will review your application details and verify your credentials.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium">Initial Contact</h3>
                        <p className="text-sm text-gray-500">
                          A member of our partner success team will reach out to you via email or phone to discuss your
                          application.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium">Onboarding Call</h3>
                        <p className="text-sm text-gray-500">
                          If approved, we'll schedule an onboarding call to set up your profile and walk you through our
                          platform.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold flex-shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <h3 className="font-medium">Go Live</h3>
                        <p className="text-sm text-gray-500">
                          Your profile will be published on our platform, and you'll start receiving patient inquiries.
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/">
                    Return to Homepage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline">
                  <Link href="/contact">Contact Support</Link>
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
