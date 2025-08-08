"use client"

import { CheckCircle, Clock, HelpCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export type ApplicationStatus = "submitted" | "under_review" | "additional_info" | "approved" | "rejected"

interface ApplicationStatusTrackerProps {
  status: ApplicationStatus
  submittedDate: string
  estimatedCompletionDate: string
  additionalInfoRequested?: string
  rejectionReason?: string
  applicationId: string
  applicationType: "hospital" | "agent"
}

export function ApplicationStatusTracker({
  status,
  submittedDate,
  estimatedCompletionDate,
  additionalInfoRequested,
  rejectionReason,
  applicationId,
  applicationType,
}: ApplicationStatusTrackerProps) {
  // Calculate progress percentage based on status
  const getProgressPercentage = () => {
    switch (status) {
      case "submitted":
        return 25
      case "under_review":
        return 50
      case "additional_info":
        return 75
      case "approved":
        return 100
      case "rejected":
        return 100
      default:
        return 0
    }
  }

  // Get status badge
  const getStatusBadge = () => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Submitted
          </Badge>
        )
      case "under_review":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Under Review
          </Badge>
        )
      case "additional_info":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Info Requested
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Not Approved
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>
              {applicationType === "hospital" ? "Hospital" : "Travel Agent"} Application #{applicationId}
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Application Progress</span>
              <span>{getProgressPercentage()}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>

          {/* Status timeline */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Application Submitted</h4>
                <p className="text-sm text-gray-500">We received your application on {submittedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {status === "submitted" ? (
                  <Clock className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle className={`h-5 w-5 ${status === "rejected" ? "text-gray-400" : "text-green-500"}`} />
                )}
              </div>
              <div>
                <h4 className="font-medium">Application Review</h4>
                <p className="text-sm text-gray-500">
                  {status === "submitted"
                    ? "Your application is in the queue for review"
                    : "Our team has reviewed your application"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {status === "additional_info" ? (
                  <HelpCircle className="h-5 w-5 text-orange-500" />
                ) : status === "under_review" || status === "submitted" ? (
                  <Clock className="h-5 w-5 text-gray-300" />
                ) : status === "rejected" ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div>
                <h4 className="font-medium">
                  {status === "additional_info"
                    ? "Additional Information Requested"
                    : status === "rejected"
                      ? "Application Not Approved"
                      : "Final Review"}
                </h4>
                <p className="text-sm text-gray-500">
                  {status === "additional_info"
                    ? additionalInfoRequested
                    : status === "rejected"
                      ? rejectionReason
                      : status === "approved"
                        ? "Your application has passed all reviews"
                        : "This step will be updated once initial review is complete"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {status === "approved" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-gray-300" />
                )}
              </div>
              <div>
                <h4 className="font-medium">Application Approved</h4>
                <p className="text-sm text-gray-500">
                  {status === "approved"
                    ? "Congratulations! Your application has been approved."
                    : "This step will be updated once all reviews are complete"}
                </p>
              </div>
            </div>
          </div>

          {/* Estimated completion */}
          {status !== "approved" && status !== "rejected" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700">Estimated Completion</h4>
                  <p className="text-sm text-blue-600">
                    We expect to complete your application review by {estimatedCompletionDate}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional information request form would go here */}
          {status === "additional_info" && (
            <div className="border rounded-lg p-4 mt-4">
              <h4 className="font-medium mb-2">Please provide the requested information</h4>
              {/* Form would go here */}
              <p className="text-sm text-gray-500 mb-4">
                Please provide the additional information requested above to continue with your application.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium">
                Submit Additional Information
              </button>
            </div>
          )}

          {/* Approved next steps */}
          {status === "approved" && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-700">Next Steps</h4>
                  <p className="text-sm text-green-600 mb-2">
                    Your application has been approved! Here's what to do next:
                  </p>
                  <ul className="text-sm text-green-600 list-disc list-inside space-y-1">
                    <li>Complete your profile with additional details</li>
                    <li>Add your services and pricing information</li>
                    <li>Upload photos and media to showcase your facility</li>
                    <li>Set up your availability calendar</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
