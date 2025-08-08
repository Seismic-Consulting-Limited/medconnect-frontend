import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-gray-500">View performance metrics and insights for your profile.</p>
      </div>

      <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-800" />
        <AlertTitle>Feature Unavailable</AlertTitle>
        <AlertDescription>
          Analytics will be available once your application is approved and your profile is published on MedConnect.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Preview</CardTitle>
          <CardDescription>Here's a preview of the analytics you'll have access to</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Profile Views</h3>
              <p className="text-2xl font-bold text-gray-400">--</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Inquiries</h3>
              <p className="text-2xl font-bold text-gray-400">--</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</h3>
              <p className="text-2xl font-bold text-gray-400">--%</p>
            </div>
          </div>

          <div className="border rounded-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-gray-300 mb-4"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
              <p className="text-gray-500 max-w-md">
                Detailed analytics will be available once your profile is active on the platform.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
