"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS } from "@/lib/constants"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { authService } from "@/lib/auth"
import { dashboardService } from "@/lib/services/dashboard-service"

const FACILITY_CATEGORIES = [
  "Emergency Room",
  "ICU",
  "Operating Theater",
  "Laboratory",
  "Radiology",
  "Pharmacy",
  "Maternity Ward",
  "Pediatric Ward",
  "Outpatient Clinic",
  "Dialysis Center",
  "Physical Therapy",
  "Cafeteria",
  "Parking",
  "Other",
]

type FieldErrors = {
  name?: string
  category?: string
  otherCategory?: string
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

  // Load hospital id
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
      hospital_id: hospitalId,
    }

    setSubmitting(true)
    try {
      await apiRequest(
        API_ENDPOINTS.META.FACILITIES,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        {
          auth: true,
          getToken: () => authService.getToken(),
        },
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
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Add Medical Facility</h1>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
            </div>

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
                    className={`${fieldErrors.name ? "border-purple-500 border-2" : "border-gray-300"}`}
                    aria-invalid={!!fieldErrors.name}
                  />
                  {fieldErrors.name && <p className="text-xs text-red-600">{fieldErrors.name}</p>}
                </div>

                {/* Facility Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Facility Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className={`${fieldErrors.category ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Other" />
                    </SelectTrigger>
                    <SelectContent>
                      {FACILITY_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
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
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
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
          </div>
        </main>
      </div>
    </div>
  )
}
