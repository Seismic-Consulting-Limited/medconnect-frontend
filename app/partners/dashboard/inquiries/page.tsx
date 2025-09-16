import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient Inquiries</h1>
        <p className="text-gray-500">Manage and respond to inquiries from potential patients.</p>
      </div>

      <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-800" />
        <AlertTitle>Feature Unavailable</AlertTitle>
        <AlertDescription>
          The inquiries feature will be available once your application is approved and your profile is published on
          MedConnect.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>No Inquiries Yet</CardTitle>
          <CardDescription>
            You'll see patient inquiries here once your profile is approved and published
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No inquiries to display</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Once your profile is approved and published, patients will be able to send you inquiries about your
              services.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
