"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Loader2, Search, Building2 } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { authService } from "@/lib/auth"
import { dashboardService } from "@/lib/services/dashboard-service"

type FieldErrors = {
  name?: string
  category?: string
  otherCategory?: string
}

type SystemFacility = {
  id: number
  name: string
  description?: string
  category?: string
}

export default function AddFacilityPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [otherCategory, setOtherCategory] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [hospitalId, setHospitalId] = useState<string | null>(null)

  const [systemFacilities, setSystemFacilities] = useState<SystemFacility[]>([])
  const [systemFacilitiesLoading, setSystemFacilitiesLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"create" | "browse">("create")

  // Load hospital id and system facilities
  useEffect(() => {
    let off = false
    ;(async () => {
      try {
        const data = await dashboardService.getHospitalDashboard()
        if (off) return
        const id = String((data as any)?.id ?? (data as any)?.hospital_id ?? "")
        if (id) setHospitalId(id)
        else setError("Could not determine hospital id.")
      } catch (e: any) {
        setError(e?.message || "Could not load hospital info.")
      }
    })()
    return () => {
      off = true
    }
  }, [])

  useEffect(() => {
    const fetchSystemFacilities = async () => {
      setSystemFacilitiesLoading(true)
      try {
        const response = await apiRequest<{ data?: SystemFacility[] } | SystemFacility[]>(
          API_ENDPOINTS.META.FACILITIES,
          { method: HTTP_METHODS.GET },
          { auth: true, getToken: () => authService.getToken() },
        )

        const facilitiesData = Array.isArray(response) ? response : response?.data || []
        setSystemFacilities(facilitiesData)
      } catch (err: any) {
        console.error("[v0] Error fetching system facilities:", err)
      } finally {
        setSystemFacilitiesLoading(false)
      }
    }

    fetchSystemFacilities()
  }, [])

  const validate = (): boolean => {
    const errs: FieldErrors = {}

    if (!name.trim()) errs.name = "Name of facility is required."
    if (!category) errs.category = "Facility category is required."
    if (category === "Other" && !otherCategory.trim()) {
      errs.otherCategory = "Please specify the other category."
    }

    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const onSubmit = async () => {
    if (submitting) return
    setError(null)

    if (!hospitalId) {
      setError("Hospital id is missing.")
      return
    }
    if (!validate()) return

    const payload = {
      name: name.trim(),
      category: category === "Other" ? otherCategory.trim() : category,
    }

    setSubmitting(true)
    try {
      await apiRequest(
        API_ENDPOINTS.HOSPITAL.FACILITIES(hospitalId),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        { auth: true, getToken: () => authService.getToken() },
      )

      toast.success("Medical facility added successfully.")
      router.push("/dashboard/hospital/services")
    } catch (e: any) {
      const msg = e?.data?.message || e?.data?.detail || e?.message || "Could not add facility."
      setError(msg)
      toast.error(String(msg))
    } finally {
      setSubmitting(false)
    }
  }

  const addSystemFacilityToHospital = async (systemFacility: SystemFacility) => {
    if (!hospitalId) {
      toast.error("Hospital ID not found")
      return
    }

    try {
      await apiRequest(
        API_ENDPOINTS.HOSPITAL.FACILITIES(hospitalId),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            facility_id: systemFacility.id,
            name: systemFacility.name,
            description: systemFacility.description,
          }),
        },
        { auth: true, getToken: () => authService.getToken() },
      )

      toast.success(`${systemFacility.name} added to hospital successfully`)
      router.push("/dashboard/hospital/services")
    } catch (err: any) {
      console.error("[v0] Error adding facility to hospital:", err)
      toast.error(err?.message || "Failed to add facility")
    }
  }

  const filteredSystemFacilities = systemFacilities.filter(
    (facility) =>
      facility.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (facility.description && facility.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const onCancel = () => {
    router.push("/dashboard/hospital/services")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64 flex items-center gap-4">
          <Button variant="ghost" className="bg-transparent p-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-gray-500">Services • Add New Facility</div>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        {/* Main content */}
        <main className="flex-1 ml-0 lg:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Add Medical Facility</h1>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("create")}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "create"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Create New Facility
                </button>
                <button
                  onClick={() => setActiveTab("browse")}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "browse"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Browse System Facilities ({systemFacilities.length})
                </button>
              </div>
            </div>

            {activeTab === "create" ? (
              <Card>
                <CardContent className="p-6 space-y-6">
                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                      {error}
                    </div>
                  )}

                  {/* Name of Facility */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Name of Facility *</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Emergency Room"
                      className={`${fieldErrors.name ? "border-red-500 border-2" : "border-gray-300"}`}
                      aria-invalid={!!fieldErrors.name}
                    />
                    {fieldErrors.name && <p className="text-xs text-red-600">{fieldErrors.name}</p>}
                  </div>

                  {/* Facility Category */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Facility Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className={`${fieldErrors.category ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select a facility category" />
                      </SelectTrigger>
                      <SelectContent>
                        {systemFacilitiesLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading facilities...
                          </SelectItem>
                        ) : (
                          <>
                            {systemFacilities.map((facility) => (
                              <SelectItem key={facility.id} value={facility.name}>
                                {facility.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    {fieldErrors.category && <p className="text-xs text-red-600">{fieldErrors.category}</p>}
                  </div>

                  {/* Other Category (conditional) */}
                  {category === "Other" && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Other Category *</Label>
                      <Input
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        placeholder="Type your category here..."
                        className={`${fieldErrors.otherCategory ? "border-red-500" : ""}`}
                        aria-invalid={!!fieldErrors.otherCategory}
                      />
                      {fieldErrors.otherCategory && <p className="text-xs text-red-600">{fieldErrors.otherCategory}</p>}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={onSubmit}
                      disabled={submitting || !hospitalId}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search system facilities..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {systemFacilitiesLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : filteredSystemFacilities.length === 0 ? (
                  <div className="text-center py-16">
                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No system facilities found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSystemFacilities.map((facility) => (
                      <Card key={facility.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{facility.name}</h4>
                            {facility.category && (
                              <Badge variant="outline" className="text-xs">
                                {facility.category}
                              </Badge>
                            )}
                          </div>
                          {facility.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{facility.description}</p>
                          )}
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => addSystemFacilityToHospital(facility)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add to Hospital
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="flex justify-center pt-4">
                  <Button variant="outline" onClick={onCancel} className="bg-transparent">
                    Back to Services
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
