"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { dashboardService } from "@/lib/services/dashboard-service"

interface HospitalFormData {
  name: string
  yearEstablished: string
  address: string
  country: string
  state: string
  postalCode: string
  phone: string
  email: string
  website: string
  numberOfDoctors: string
  numberOfNurses: string
  description: string
}

const initialFormData: HospitalFormData = {
  name: "",
  yearEstablished: "",
  address: "",
  country: "",
  state: "",
  postalCode: "",
  phone: "",
  email: "",
  website: "",
  numberOfDoctors: "",
  numberOfNurses: "",
  description: "",
}

export default function EditHospitalProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<HospitalFormData>(initialFormData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("[v0] Fetching hospital dashboard data...")
        const hospitalData = await dashboardService.getHospitalDashboard()
        console.log("[v0] Hospital data received:", hospitalData)

        const transformedData: HospitalFormData = {
          name: hospitalData.name || "",
          yearEstablished: "", // Not available in current API response
          address: hospitalData.location?.address_1 || "",
          country: "Nigeria", // Default based on API structure
          state: hospitalData.location?.state?.name || "",
          postalCode: "", // Not available in current API response
          phone: "", // Not available in current API response
          email: hospitalData.email || "",
          website: "", // Not available in current API response
          numberOfDoctors: "", // Not available in current API response
          numberOfNurses: "", // Not available in current API response
          description: hospitalData.description || "",
        }

        setFormData(transformedData)
        console.log("[v0] Form data populated:", transformedData)
      } catch (err) {
        console.error("[v0] Error fetching hospital data:", err)
        setError(err instanceof Error ? err.message : "Failed to load hospital data")
      } finally {
        setLoading(false)
      }
    }

    fetchHospitalData()
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    router.push("/dashboard/hospital/profile")
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving hospital data:", formData)
    router.push("/dashboard/hospital/profile")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4 ml-0 lg:ml-64">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Edit Profile Information</h1>
            </div>
          </div>
        </div>

        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6 ml-0 lg:ml-64 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading hospital information...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4 ml-0 lg:ml-64">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Edit Profile Information</h1>
            </div>
          </div>
        </div>

        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6 ml-0 lg:ml-64 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-red-600 mb-4">
                      <p className="text-lg font-semibold">Error Loading Data</p>
                      <p className="text-sm">{error}</p>
                    </div>
                    <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Edit Profile Information</h1>
          </div>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6 ml-0 lg:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Hospital Name and Year Established */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Established <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.yearEstablished}
                        onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Country, State, Postal Code */}
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Country <span className="text-red-500">*</span>
                      </label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nigeria">Nigeria</SelectItem>
                          <SelectItem value="Ghana">Ghana</SelectItem>
                          <SelectItem value="Kenya">Kenya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lagos">Lagos</SelectItem>
                          <SelectItem value="Abuja">Abuja</SelectItem>
                          <SelectItem value="Kano">Kano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <Input
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        placeholder="Enter postal code"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Phone, Email, Website */}
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <Input
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="www.yourhospital.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Number of Doctors and Nurses */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Doctors <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.numberOfDoctors}
                        onChange={(e) => handleInputChange("numberOfDoctors", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Nurses <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.numberOfNurses}
                        onChange={(e) => handleInputChange("numberOfNurses", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Hospital Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-6">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="px-12 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="px-12 py-2 bg-purple-600 hover:bg-purple-700 text-white">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
