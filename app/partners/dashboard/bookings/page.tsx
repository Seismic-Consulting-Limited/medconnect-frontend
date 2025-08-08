import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings & Appointments</h1>
        <p className="text-gray-500">Manage patient bookings and appointments.</p>
      </div>

      <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-800" />
        <AlertTitle>Feature Unavailable</AlertTitle>
        <AlertDescription>
          The bookings feature will be available once your application is approved and your profile is published on
          MedConnect.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>No Bookings Yet</CardTitle>
          <CardDescription>
            You'll see patient bookings here once your profile is approved and published
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No bookings to display</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Once your profile is approved and published, patients will be able to book appointments with your
              facility.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
