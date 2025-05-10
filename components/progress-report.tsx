"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  BarChart4,
  Users,
  Building2,
  Laptop,
  Stethoscope,
  Plane,
} from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export function ProgressReport() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    completed: true,
    inProgress: true,
    planned: true,
    risks: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">MedConnect Project Progress Report</h1>
        <p className="text-gray-500">Project Status as of May 2, 2024</p>
      </div>

      {/* Project Overview */}
      <Card className="mb-6">
        <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("overview")}>
          <div className="flex justify-between items-center">
            <CardTitle>Project Overview</CardTitle>
            {expandedSections.overview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {expandedSections.overview && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">35%</div>
                <div className="text-sm text-gray-500">Overall Completion</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-amber-500 mb-2">4</div>
                <div className="text-sm text-gray-500">Weeks in Development</div>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">7</div>
                <div className="text-sm text-gray-500">Key Features Completed</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Frontend Development</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Backend Development</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">User Experience Design</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Content Development</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Completed Tasks */}
      <Card className="mb-6">
        <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("completed")}>
          <div className="flex justify-between items-center">
            <CardTitle>Completed Milestones</CardTitle>
            {expandedSections.completed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {expandedSections.completed && (
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Homepage Design and Implementation</h3>
                  <p className="text-sm text-gray-500">
                    Created responsive homepage with hero section, search functionality, featured destinations, and
                    testimonials.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Hospital Detail Page</h3>
                  <p className="text-sm text-gray-500">
                    Implemented detailed hospital view with information tabs, treatment options, doctor profiles, and
                    booking functionality.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Telemedicine Page</h3>
                  <p className="text-sm text-gray-500">
                    Designed and implemented telemedicine services page showcasing virtual consultation features.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Authentication Components</h3>
                  <p className="text-sm text-gray-500">
                    Created login and signup modals with form validation and state management.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Patient Dashboard Prototype</h3>
                  <p className="text-sm text-gray-500">
                    Developed initial patient dashboard with appointment tracking, treatment progress, and travel
                    details.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Responsive Navigation</h3>
                  <p className="text-sm text-gray-500">
                    Implemented responsive header and footer with mobile menu functionality.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Design System Foundation</h3>
                  <p className="text-sm text-gray-500">
                    Established color palette, typography, and component library using shadcn/ui.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* In Progress */}
      <Card className="mb-6">
        <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("inProgress")}>
          <div className="flex justify-between items-center">
            <CardTitle>In Progress</CardTitle>
            {expandedSections.inProgress ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {expandedSections.inProgress && (
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Provider Portal Development</h3>
                  <p className="text-sm text-gray-500">
                    Creating dedicated dashboards for healthcare providers and facilities with profile management,
                    appointment scheduling, and patient communication tools.
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs text-gray-500">40%</span>
                    </div>
                    <Progress value={40} className="h-1.5" />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Treatment Search and Comparison</h3>
                  <p className="text-sm text-gray-500">
                    Implementing advanced search functionality with filtering, sorting, and comparison features for
                    medical treatments across different providers and countries.
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs text-gray-500">65%</span>
                    </div>
                    <Progress value={65} className="h-1.5" />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">User Authentication System</h3>
                  <p className="text-sm text-gray-500">
                    Implementing secure authentication with role-based access control for patients, providers, and
                    administrators.
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs text-gray-500">50%</span>
                    </div>
                    <Progress value={50} className="h-1.5" />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Telemedicine Integration</h3>
                  <p className="text-sm text-gray-500">
                    Developing video consultation capabilities with scheduling, reminders, and secure messaging between
                    patients and providers.
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs text-gray-500">30%</span>
                    </div>
                    <Progress value={30} className="h-1.5" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Planned Next */}
      <Card className="mb-6">
        <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("planned")}>
          <div className="flex justify-between items-center">
            <CardTitle>Planned Next</CardTitle>
            {expandedSections.planned ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {expandedSections.planned && (
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium">Payment Processing System</h3>
                  <p className="text-sm text-gray-500">
                    Implement secure payment gateway integration for treatment deposits, full payments, and provider
                    payouts with multi-currency support.
                  </p>
                  <div className="mt-1 text-xs text-gray-500">Estimated start: May 15, 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium">Travel Booking Integration</h3>
                  <p className="text-sm text-gray-500">
                    Develop integration with travel booking APIs for flights, accommodations, and local transportation
                    to create comprehensive medical travel packages.
                  </p>
                  <div className="mt-1 text-xs text-gray-500">Estimated start: May 22, 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium">Medical Records Management</h3>
                  <p className="text-sm text-gray-500">
                    Create secure system for patients to upload, store, and share medical records with providers,
                    including document verification and translation services.
                  </p>
                  <div className="mt-1 text-xs text-gray-500">Estimated start: June 5, 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium">Provider Verification System</h3>
                  <p className="text-sm text-gray-500">
                    Implement robust verification process for healthcare providers and facilities, including credential
                    checking, accreditation verification, and review monitoring.
                  </p>
                  <div className="mt-1 text-xs text-gray-500">Estimated start: June 12, 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0"></div>
                <div>
                  <h3 className="font-medium">Multilingual Support</h3>
                  <p className="text-sm text-gray-500">
                    Add support for multiple languages throughout the platform with automatic translation for key
                    content and communication.
                  </p>
                  <div className="mt-1 text-xs text-gray-500">Estimated start: June 20, 2024</div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Risks and Challenges */}
      <Card className="mb-6">
        <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("risks")}>
          <div className="flex justify-between items-center">
            <CardTitle>Risks and Challenges</CardTitle>
            {expandedSections.risks ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        {expandedSections.risks && (
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Regulatory Compliance</h3>
                  <p className="text-sm text-gray-500">
                    Ensuring compliance with healthcare regulations across multiple countries, including HIPAA, GDPR,
                    and local medical tourism laws.
                  </p>
                  <div className="mt-1 text-xs font-medium text-amber-500">Medium Risk</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Provider Verification Complexity</h3>
                  <p className="text-sm text-gray-500">
                    Developing a scalable system to verify credentials and quality of international healthcare providers
                    across different regulatory environments.
                  </p>
                  <div className="mt-1 text-xs font-medium text-red-500">High Risk</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Payment Processing Across Borders</h3>
                  <p className="text-sm text-gray-500">
                    Managing secure international payments with multiple currencies, exchange rates, and varying banking
                    regulations.
                  </p>
                  <div className="mt-1 text-xs font-medium text-amber-500">Medium Risk</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Telemedicine Technical Challenges</h3>
                  <p className="text-sm text-gray-500">
                    Ensuring reliable video consultation capabilities across regions with varying internet connectivity
                    and technical infrastructure.
                  </p>
                  <div className="mt-1 text-xs font-medium text-green-600">Low Risk</div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics and Insights</CardTitle>
          <CardDescription>Development performance and project health indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="development">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="features">Feature Status</TabsTrigger>
              <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
            </TabsList>
            <TabsContent value="development" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Development Velocity</h3>
                  <div className="h-60 bg-gray-50 rounded-lg flex items-center justify-center">
                    <BarChart4 className="h-24 w-24 text-gray-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-3">Code Quality Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Test Coverage</span>
                        <span className="text-sm">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Code Review Completion</span>
                        <span className="text-sm">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Accessibility Compliance</span>
                        <span className="text-sm">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Technical Debt</span>
                        <span className="text-sm">Low</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">User Management</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Hospital Profiles</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Telemedicine</span>
                    </div>
                    <span className="text-sm font-medium text-amber-500">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Treatment Search</span>
                    </div>
                    <span className="text-sm font-medium text-amber-500">55%</span>
                  </div>
                  <Progress value={55} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Travel Integration</span>
                    </div>
                    <span className="text-sm font-medium text-red-500">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart4 className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Analytics Dashboard</span>
                    </div>
                    <span className="text-sm font-medium text-red-500">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="resources" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl font-bold text-primary mb-1">4</div>
                      <div className="text-sm font-medium">Frontend Developers</div>
                      <div className="text-xs text-gray-500 mt-1">85% Utilization</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl font-bold text-primary mb-1">2</div>
                      <div className="text-sm font-medium">Backend Developers</div>
                      <div className="text-xs text-gray-500 mt-1">90% Utilization</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl font-bold text-primary mb-1">2</div>
                      <div className="text-sm font-medium">UX/UI Designers</div>
                      <div className="text-xs text-gray-500 mt-1">75% Utilization</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Resource Allocation by Feature</h3>
                <div className="h-60 bg-gray-50 rounded-lg flex items-center justify-center">
                  <BarChart4 className="h-24 w-24 text-gray-300" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <Button className="bg-primary hover:bg-primary-700">Download Full Report</Button>
      </div>
    </div>
  )
}
