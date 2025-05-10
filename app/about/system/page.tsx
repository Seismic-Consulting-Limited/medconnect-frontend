import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Globe, HeartPulse, MessageSquare, Plane, Users } from "lucide-react"

export default function SystemArchitecturePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-12">
        <ResponsiveContainer>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">MedConnect System Architecture</h1>
            <p className="text-gray-500">How our platform connects patients, hospitals, and travel agents</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>
                MedConnect is a comprehensive platform that connects three key stakeholders in the medical tourism
                ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Patients</h3>
                      <p className="text-gray-500">
                        Individuals seeking quality healthcare services abroad at competitive prices
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Hospitals</h3>
                      <p className="text-gray-500">
                        Healthcare providers offering medical treatments, consultations, and post-care services
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Plane className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Travel Agents</h3>
                      <p className="text-gray-500">
                        Logistics providers handling transportation, accommodation, and local support
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">System Flow Diagram</h3>
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-3xl">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                        <div className="flex flex-col items-center text-center">
                          <div className="p-4 bg-primary-100 rounded-full mb-2">
                            <Users className="h-8 w-8 text-primary" />
                          </div>
                          <div className="font-bold">Patients</div>
                        </div>
                        <div className="hidden md:block border-t-2 border-dashed border-gray-300 flex-grow"></div>
                        <div className="flex flex-col items-center text-center">
                          <div className="p-4 bg-primary-100 rounded-full mb-2">
                            <HeartPulse className="h-8 w-8 text-primary" />
                          </div>
                          <div className="font-bold">MedConnect Platform</div>
                        </div>
                        <div className="hidden md:block border-t-2 border-dashed border-gray-300 flex-grow"></div>
                        <div className="flex flex-col items-center text-center">
                          <div className="p-4 bg-primary-100 rounded-full mb-2">
                            <Building2 className="h-8 w-8 text-primary" />
                          </div>
                          <div className="font-bold">Hospitals</div>
                        </div>
                      </div>

                      <div className="flex justify-center mb-12">
                        <div className="border-l-2 border-dashed border-gray-300 h-12"></div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex-1"></div>
                        <div className="flex flex-col items-center text-center">
                          <div className="p-4 bg-primary-100 rounded-full mb-2">
                            <Plane className="h-8 w-8 text-primary" />
                          </div>
                          <div className="font-bold">Travel Agents</div>
                        </div>
                        <div className="flex-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="responsibilities">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
              <TabsTrigger value="user-journey">User Journey</TabsTrigger>
              <TabsTrigger value="data-flow">Data Flow</TabsTrigger>
            </TabsList>
            <TabsContent value="responsibilities" className="p-4 border rounded-lg mt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hospital Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <span>Medical consultations (in-person and telemedicine)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <HeartPulse className="h-4 w-4 text-primary" />
                        </div>
                        <span>Treatment and medical procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <span>Post-treatment care instructions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <span>Follow-up consultations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Travel Agent Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <Plane className="h-4 w-4 text-primary" />
                        </div>
                        <span>Transportation arrangements (flights, local transport)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <span>Accommodation booking near hospitals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <span>Translation and local support services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <span>Coordination with hospitals for appointments</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>MedConnect Platform Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <span>Connecting patients with suitable hospitals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <Plane className="h-4 w-4 text-primary" />
                        </div>
                        <span>Matching patients with travel agents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <span>Facilitating telemedicine consultations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary-100 p-1 mt-0.5">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <span>Tracking and managing affiliate relationships</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="user-journey" className="p-4 border rounded-lg mt-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Patient Journey Flow</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary font-bold">
                        1
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">Discovery Phase</h3>
                        <p className="text-gray-500">
                          Patient searches for medical treatments or hospitals on MedConnect
                        </p>
                        <p className="text-gray-500">
                          Patient browses hospital profiles, treatment options, and reviews
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary font-bold">
                        2
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">Consultation Phase</h3>
                        <p className="text-gray-500">Patient schedules telemedicine consultation with hospital</p>
                        <p className="text-gray-500">Hospital provides treatment plan and cost estimate</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary font-bold">
                        3
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">Planning Phase</h3>
                        <p className="text-gray-500">Patient browses travel agents on MedConnect</p>
                        <p className="text-gray-500">
                          Patient selects travel agent who creates custom package for transportation, accommodation, and
                          local support
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary font-bold">
                        4
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">Treatment Phase</h3>
                        <p className="text-gray-500">Travel agent handles transportation to destination</p>
                        <p className="text-gray-500">Hospital provides medical treatment</p>
                        <p className="text-gray-500">Travel agent provides local support during stay</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary font-bold">
                        5
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">Post-Care Phase</h3>
                        <p className="text-gray-500">Hospital provides post-care instructions</p>
                        <p className="text-gray-500">Travel agent arranges return transportation</p>
                        <p className="text-gray-500">Patient schedules follow-up consultations via telemedicine</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="data-flow" className="p-4 border rounded-lg mt-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Data Flow Architecture</h3>
                  <p className="text-gray-500 mb-4">
                    MedConnect's platform manages the flow of information between patients, hospitals, and travel agents
                    while maintaining data security and privacy.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Patient Data Flow</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="text-sm">
                            <span className="font-medium">→ To Platform:</span> Personal information, medical history,
                            treatment preferences
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">→ To Hospital:</span> Medical records, consultation requests
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">→ To Travel Agent:</span> Travel preferences, dates,
                            accommodation needs
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">← From Platform:</span> Hospital and travel agent
                            recommendations
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">← From Hospital:</span> Treatment plans, cost estimates,
                            post-care instructions
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">← From Travel Agent:</span> Travel packages, itineraries,
                            local support details
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Affiliate Tracking Flow</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="text-sm">
                            <span className="font-medium">Platform → Hospital:</span> Patient referrals, consultation
                            bookings
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Platform → Travel Agent:</span> Patient referrals, package
                            requests
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Hospital → Platform:</span> Conversion data, commission
                            information
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Travel Agent → Platform:</span> Booking confirmations,
                            commission data
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Platform → Analytics:</span> Referral tracking, conversion
                            rates, revenue metrics
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Security and Privacy Measures</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Medical Data Protection</h4>
                        <ul className="space-y-1 text-sm text-gray-500">
                          <li>• HIPAA compliance</li>
                          <li>• End-to-end encryption</li>
                          <li>• Access controls</li>
                          <li>• Data minimization</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Payment Security</h4>
                        <ul className="space-y-1 text-sm text-gray-500">
                          <li>• PCI DSS compliance</li>
                          <li>• Tokenization</li>
                          <li>• Fraud detection</li>
                          <li>• Secure payment processing</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">User Privacy</h4>
                        <ul className="space-y-1 text-sm text-gray-500">
                          <li>• Consent management</li>
                          <li>• Data retention policies</li>
                          <li>• Right to be forgotten</li>
                          <li>• Privacy by design</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center">
            <Button className="bg-primary hover:bg-primary-700">
              Learn More About Our Platform
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </ResponsiveContainer>
      </main>
      <SiteFooter />
    </div>
  )
}
