import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Management</h1>
        <p className="text-gray-500">Manage and update your partner profile information.</p>
      </div>

      <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-800" />
        <AlertTitle>Profile Locked</AlertTitle>
        <AlertDescription>
          Your profile is currently locked while your application is under review. You'll be able to edit your profile
          once your application is approved.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Profile Preview</CardTitle>
          <CardDescription>This is how your profile will appear once approved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-1">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Hospital Name</p>
                  <p className="text-sm font-medium">Bangkok International Hospital</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year Established</p>
                  <p className="text-sm font-medium">1995</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-sm font-medium">Bangkok, Thailand</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="text-sm font-medium">www.bangkokinternational.com</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-1">Description</h3>
              <p className="text-sm text-gray-600">
                Bangkok International Hospital is a leading healthcare provider in Thailand, offering comprehensive
                medical services to both local and international patients. With state-of-the-art facilities and
                internationally trained medical professionals, we provide exceptional care across a wide range of
                specialties.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-1">Specialties</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Cardiology</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Orthopedics</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Neurology</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Oncology</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Plastic Surgery
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Dentistry</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-1">Accreditations</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  JCI Accredited
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">ISO 9001</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  GHA Certified
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
