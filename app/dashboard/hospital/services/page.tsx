"use client"

import { useState, useEffect } from "react"
import { Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"
import { authService } from "@/lib/auth"
import { dashboardService } from "@/lib/services/dashboard-service"

type Specialty = {
  id: number
  name: string
  description?: string
}

type Facility = {
  id: number
  facility_id: number
  facility_name: string
  facility_description?: string
}

export default function ServicesPage() {
  const router = useRouter()
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("specialties")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const dashboardData = await dashboardService.getHospitalDashboard()
        const hospitalId = dashboardData?.id
        if (!hospitalId) {
          throw new Error("Hospital ID not found")
        }

        const [specialtiesRes, facilitiesRes] = await Promise.all([
          apiRequest<{ data?: Specialty[] } | Specialty[]>(
            API_ENDPOINTS.HOSPITAL.GET_SPECIALTIES(hospitalId),
            { method: HTTP_METHODS.GET },
            { auth: true, getToken: () => authService.getToken() },
          ),
          apiRequest<{ data?: Facility[] } | Facility[]>(
            API_ENDPOINTS.HOSPITAL.GET_FACILITIES(hospitalId),
            { method: HTTP_METHODS.GET },
            { auth: true, getToken: () => authService.getToken() },
          ),
        ])

        const specialtiesData = Array.isArray(specialtiesRes) ? specialtiesRes : specialtiesRes?.data || []
        const facilitiesData = Array.isArray(facilitiesRes) ? facilitiesRes : facilitiesRes?.data || []

        setSpecialties(specialtiesData)
        setFacilities(facilitiesData)
      } catch (err: any) {
        setError(err?.message || "Failed to load services data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const currentData = activeTab === "specialties" ? specialties : facilities
  const filteredData = currentData
    .filter((item) => {
      const name = activeTab === "specialties" ? (item as Specialty).name : (item as Facility).facility_name
      const description =
        activeTab === "specialties" ? (item as Specialty).description : (item as Facility).facility_description

      return (
        name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (description && description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id
      const nameA = activeTab === "specialties" ? (a as Specialty).name : (a as Facility).facility_name
      const nameB = activeTab === "specialties" ? (b as Specialty).name : (b as Facility).facility_name
      return (nameA || "").localeCompare(nameB || "")
    })

  const handleAddItem = () => {
    if (activeTab === "specialties") {
      router.push("/dashboard/hospital/services/add-specialty")
    } else {
      router.push("/dashboard/hospital/services/add-facility")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-4 lg:p-6 ml-0 lg:ml-64">
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab("specialties")}
                className={`flex-1 px-6 py-4 text-center font-medium rounded-tl-lg transition-colors ${
                  activeTab === "specialties"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ⚡ Medical Specialties
              </button>
              <button
                onClick={() => setActiveTab("facilities")}
                className={`flex-1 px-6 py-4 text-center font-medium rounded-tr-lg transition-colors ${
                  activeTab === "facilities"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🏥 Medical Facilities
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                  {activeTab === "specialties" ? "Medical Specialties" : "Medical Facilities"} ({filteredData.length})
                </h1>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search for name of treatment"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleAddItem} className="gap-2 bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                    Add {activeTab === "specialties" ? "Specialty" : "Facility"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 mb-4">
                    No {activeTab === "specialties" ? "specialties" : "facilities"} found
                  </p>
                  <Button onClick={handleAddItem} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add {activeTab === "specialties" ? "Specialty" : "Facility"}
                  </Button>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        S/N
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {activeTab === "specialties" ? "Specialty Name" : "Facility Name"}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item, index) => {
                      const name =
                        activeTab === "specialties" ? (item as Specialty).name : (item as Facility).facility_name
                      const category =
                        activeTab === "specialties"
                          ? (item as Specialty).description || "General"
                          : (item as Facility).facility_description || "General"

                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
