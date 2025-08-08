"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, CheckCircle, Clock, HelpCircle, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ApplicationStatusTracker } from "@/components/application-status-tracker"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data - in a real app, this would come from an API
const mockApplicationData = {
  id: "APP-2023-05-12",
  type: "hospital" as const,
  status: "under_review" as const,
  submittedDate: "May 12, 2023",
  estimatedCompletionDate: "May 19, 2023",
  additionalInfoRequested: "We need more information about your accreditations and certifications.",
}

export default function PartnerDashboardPage() {
  // In a real app, we would fetch this data from an API
  const [applicationData] = useState(mockApplicationData)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Partner Dashboard</h1>
        <p className="text-gray-500">Track your application status and manage your MedConnect partner account.</p>
      </div>

      {/* Application Status */}
      <ApplicationStatusTracker
        status={applicationData.status}
        submittedDate={applicationData.submittedDate}
        estimatedCompletionDate={applicationData.estimatedCompletionDate}
        additionalInfoRequested={applicationData.additionalInfoRequested}
        applicationId={applicationData.id}
        applicationType={applicationData.type}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Need Help?</CardTitle>
            <CardDescription>Contact our partner support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Our dedicated partner support team is available to assist you with any questions about your application.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Application Tips</CardTitle>
            <CardDescription>Improve your chances of approval</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Provide detailed and accurate information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Upload high-quality images of your facility</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>List all relevant accreditations and certifications</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="w-full justify-start p-0 text-primary">
              View all tips
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Important Notices */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Due to high application volume, review times may be slightly longer than usual. We appreciate your patience.
        </AlertDescription>
      </Alert>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates on your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b">
              <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full">
                <Clock className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Application Status Updated</h4>
                <p className="text-xs text-gray-500">Your application status changed to "Under Review"</p>
                <p className="text-xs text-gray-400 mt-1">May 13, 2023 • 10:23 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b">
              <div className="mt-0.5 bg-green-100 p-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Application Received</h4>
                <p className="text-xs text-gray-500">We've received your application and it's in our queue</p>
                <p className="text-xs text-gray-400 mt-1">May 12, 2023 • 3:45 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-purple-100 p-1.5 rounded-full">
                <HelpCircle className="h-4 w-4 text-purple-700" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Account Created</h4>
                <p className="text-xs text-gray-500">Your MedConnect partner account has been created</p>
                <p className="text-xs text-gray-400 mt-1">May 12, 2023 • 3:30 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
