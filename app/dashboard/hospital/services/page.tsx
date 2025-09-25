"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Zap, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"
import { authService } from "@/lib/auth"

type Specialty = {
  id: number
  name: string
  description?: string
}

type Facility = {
  id: number
  name: string
  description?: string
}

export default function ServicesPage() {
  const router = useRouter()
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("specialties")

  // Fetch specialties and facilities
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [specialtiesRes, facilitiesRes] = await Promise.all([
          apiRequest<{ results?: Specialty[] } | Specialty[]>(
            API_ENDPOINTS.META.SPECIALTIES,
            { method: HTTP_METHODS.GET },
            { auth: true, getToken: () => authService.getToken() },
          ),
          apiRequest<{ results?: Facility[] } | Facility[]>(
            API_ENDPOINTS.META.FACILITIES,
            { method: HTTP_METHODS.GET },
            { auth: true, getToken: () => authService.getToken() },
          ),
        ])

        // Handle different response formats
        const specialtiesData = Array.isArray(specialtiesRes) ? specialtiesRes : specialtiesRes?.results || []
        const facilitiesData = Array.isArray(facilitiesRes) ? facilitiesRes : facilitiesRes?.results || []

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

  // Filter and sort specialties
  const filteredSpecialties = specialties
    .filter(
      (specialty) =>
        specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (specialty.description && specialty.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  // Filter and sort facilities
  const filteredFacilities = facilities
    .filter(
      (facility) =>
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (facility.description && facility.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  const EmptyState = ({ type }: { type: "specialties" | "facilities" }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-gray-400">
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 5L8 21l4-7 4 7-4-16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No {type === "specialties" ? "Specialties" : "Facilities"} Added
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        {type === "specialties"
          ? "You haven't added any medical specialties yet. Add specialties so patients can understand your hospital's areas of expertise."
          : "You haven't added any facilities yet. Add facilities to highlight your hospital's amenities and services available to patients."}
      </p>
      <Button className="bg-gray-600 hover:bg-gray-700 text-white" onClick={() => handleAddItem()}>
        <Plus className="w-4 h-4 mr-2" />
        Add {type === "specialties" ? "Specialty" : "Facility"}
      </Button>
    </div>
  )

  const ItemGrid = ({ items, type }: { items: (Specialty | Facility)[]; type: "specialties" | "facilities" }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            </div>
            {item.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const handleAddItem = () => {
    if (activeTab === "specialties") {
      router.push("/dashboard/hospital/services/add-specialty")
    } else {
      router.push("/dashboard/hospital/services/add-facility")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64">
          <h1 className="text-xl font-semibold text-gray-900">Services</h1>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6 ml-0 lg:ml-64">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for name of treatment"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Newest</SelectItem>
                    <SelectItem value="recent">Recently Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleAddItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add {activeTab === "specialties" ? "Specialties" : "Facilities"}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Medical Specialties ({specialties.length})</h2>
            </div>

            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("specialties")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-base font-medium transition-colors ${
                    activeTab === "specialties"
                      ? "bg-white text-gray-900 border-b-2 border-primary"
                      : "bg-gray-50 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  Medical Specialties
                </button>
                <button
                  onClick={() => setActiveTab("facilities")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-base font-medium transition-colors ${
                    activeTab === "facilities"
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  Medical Facilities
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "specialties" ? (
                isLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                      Try Again
                    </Button>
                  </div>
                ) : specialties.length === 0 ? (
                  <EmptyState type="specialties" />
                ) : (
                  <ItemGrid items={specialties} type="specialties" />
                )
              ) : isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              ) : facilities.length === 0 ? (
                <EmptyState type="facilities" />
              ) : (
                <ItemGrid items={facilities} type="facilities" />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
