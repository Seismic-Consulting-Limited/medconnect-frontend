"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus, Check, ChevronsUpDown, X } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"

import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS } from "@/lib/constants"
import { dashboardService } from "@/lib/services/dashboard-service"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { authService } from "@/lib/auth"
import type { TreatmentApiPayload, SystemTreatment } from "@/lib/types/treatment"

type FieldErrors = Partial<{
  treatments: string
  priceFrom: string
  priceTo: string
  duration: string
  recoveryPeriod: string
  hospitalStay: string
}>

export default function AddTreatmentPage() {
  const router = useRouter()

  const [systemTreatments, setSystemTreatments] = useState<SystemTreatment[]>([])
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null)
  const [treatmentDropdownOpen, setTreatmentDropdownOpen] = useState(false)
  const [showCustomTreatment, setShowCustomTreatment] = useState(false)

  const [customName, setCustomName] = useState("")
  const [customDescription, setCustomDescription] = useState("")
  const [customAbbreviation, setCustomAbbreviation] = useState("")

  const [priceFrom, setPriceFrom] = useState("")
  const [priceTo, setPriceTo] = useState("")
  const [duration, setDuration] = useState("")
  const [recoveryPeriod, setRecoveryPeriod] = useState("")
  const [hospitalStay, setHospitalStay] = useState("")
  const [successRate, setSuccessRate] = useState("95")

  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [hospitalId, setHospitalId] = useState<string | null>(null)

  const selectedTreatmentName = useMemo(() => {
    return systemTreatments.find((t) => t.id === selectedTreatmentId)?.name || ""
  }, [systemTreatments, selectedTreatmentId])

  useEffect(() => {
    let off = false
    ;(async () => {
      try {
        const data = await dashboardService.getHospitalDashboard()
        if (off) return
        const id = String((data as any)?.id ?? (data as any)?.hospital_id ?? "")
        if (id) setHospitalId(id)
        else setError("Could not determine hospital id.")

        const treatmentsResponse = await apiRequest<{ data: SystemTreatment[] }>(
          API_ENDPOINTS.TREATMENTS.SYSTEM,
          { method: "GET" },
          { auth: true, getToken: () => authService.getToken() },
        )
        setSystemTreatments(treatmentsResponse.data || [])
      } catch (e: any) {
        console.log("[v0] Error loading data:", e)
        setError(e?.message || "Could not load required data.")
      } finally {
        if (!off) setLoading(false)
      }
    })()
    return () => {
      off = true
    }
  }, [])

  const validate = (): boolean => {
    const errs: FieldErrors = {}

    if (!selectedTreatmentId && !showCustomTreatment) {
      errs.treatments = "Please select a treatment or add a custom treatment."
    }

    if (showCustomTreatment) {
      if (!customName.trim()) errs.treatments = "Custom treatment name is required."
      if (!customDescription.trim()) errs.treatments = "Custom treatment description is required."
    }

    if (!priceFrom.trim()) errs.priceFrom = "Starting price is required."
    else if (!/^\d+$/.test(priceFrom.trim())) errs.priceFrom = "Price must be a valid number."
    else if (Number(priceFrom) < 0) errs.priceFrom = "Price cannot be negative."

    if (!priceTo.trim()) errs.priceTo = "Ending price is required."
    else if (!/^\d+$/.test(priceTo.trim())) errs.priceTo = "Price must be a valid number."
    else if (Number(priceTo) < 0) errs.priceTo = "Price cannot be negative."
    else if (Number(priceTo) < Number(priceFrom)) errs.priceTo = "Ending price must be greater than starting price."

    if (!duration.trim()) errs.duration = "Duration is required."
    if (!recoveryPeriod.trim()) errs.recoveryPeriod = "Recovery period is required."
    if (!hospitalStay.trim()) errs.hospitalStay = "Hospital stay is required."

    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const onCancel = () => router.back()

  const onSubmit = async () => {
    if (submitting) return
    setError(null)

    if (!hospitalId) {
      setError("Hospital id is missing.")
      return
    }
    if (!validate()) return

    const payload: TreatmentApiPayload = {
      treatments: selectedTreatmentId
        ? [
            {
              treatment: selectedTreatmentId,
              price_range_from: Number(priceFrom),
              price_range_to: Number(priceTo),
              currency: "NGN",
              duration_in_days: Number(duration),
              hospital_stay_period_in_days: Number(hospitalStay),
              recovery_period_in_days: Number(recoveryPeriod),
              success_rate_percentage: Number(successRate),
            },
          ]
        : [],
      extra_treatments: showCustomTreatment
        ? [
            {
              name: customName.trim(),
              description: customDescription.trim(),
              abbreviation:
                customAbbreviation.trim() ||
                customName
                  .trim()
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase(),
              price_range_from: Number(priceFrom),
              price_range_to: Number(priceTo),
              currency: "NGN",
              duration_in_days: Number(duration),
              hospital_stay_period_in_days: Number(hospitalStay),
              recovery_period_in_days: Number(recoveryPeriod),
              success_rate_percentage: Number(successRate),
            },
          ]
        : [],
    }

    setSubmitting(true)
    try {
      await apiRequest(
        API_ENDPOINTS.HOSPITAL.TREATMENTS(hospitalId),
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

      toast.success("Treatment added successfully.")
      router.push("/dashboard/hospital/treatments")
    } catch (e: any) {
      const msg = e?.data?.message || e?.data?.detail || e?.message || "Could not add treatment."
      setError(msg)
      toast.error(String(msg))
    } finally {
      setSubmitting(false)
    }
  }

  const toggleTreatmentSelection = (treatmentId: string) => {
    setSelectedTreatmentId((prev) => (prev === treatmentId ? null : treatmentId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-4 lg:p-6 ml-0 lg:ml-64">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="bg-transparent" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <div className="text-sm text-gray-500">Treatments • Add New Treatment</div>
              <h1 className="text-xl font-semibold text-gray-900">Add New Treatment</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 ml-0 lg:ml-64">
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
            <div className="w-full max-w-4xl">
              <Card>
                <CardContent className="p-6 space-y-6">
                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-medium">Select Treatment</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCustomTreatment(!showCustomTreatment)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        {showCustomTreatment ? "Hide Custom" : "Add Custom Treatment"}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Popover open={treatmentDropdownOpen} onOpenChange={setTreatmentDropdownOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={treatmentDropdownOpen}
                            className={`w-full justify-between ${fieldErrors.treatments ? "border-red-500" : ""}`}
                          >
                            {selectedTreatmentId ? selectedTreatmentName : "Select treatment"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                          <Command>
                            <CommandInput placeholder="Search treatments..." />
                            <CommandList>
                              {loading && (
                                <div className="py-6 text-center text-sm text-muted-foreground">Loading…</div>
                              )}
                              {!loading && (
                                <>
                                  <CommandEmpty>No treatment found.</CommandEmpty>
                                  <CommandGroup>
                                    {systemTreatments.map((treatment) => {
                                      const selected = selectedTreatmentId === treatment.id
                                      return (
                                        <CommandItem
                                          key={treatment.id}
                                          value={treatment.name}
                                          onSelect={() => {
                                            setSelectedTreatmentId(treatment.id)
                                            setTreatmentDropdownOpen(false)
                                          }}
                                        >
                                          <Check className={`mr-2 h-4 w-4 ${selected ? "opacity-100" : "opacity-0"}`} />
                                          <div className="flex-1">
                                            <div className="font-medium">{treatment.name}</div>
                                            {treatment.abbreviation && (
                                              <div className="text-sm text-gray-500">({treatment.abbreviation})</div>
                                            )}
                                            <div className="text-xs text-gray-600 line-clamp-1">
                                              {treatment.description}
                                            </div>
                                          </div>
                                        </CommandItem>
                                      )
                                    })}
                                  </CommandGroup>
                                </>
                              )}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {selectedTreatmentId && (
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          Selected: <span className="font-medium">{selectedTreatmentName}</span>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded hover:bg-gray-100 p-1"
                            onClick={() => setSelectedTreatmentId(null)}
                            aria-label="Clear treatment"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {fieldErrors.treatments && <p className="text-xs text-red-600">{fieldErrors.treatments}</p>}
                  </div>

                  {showCustomTreatment && (
                    <div className="space-y-4 border-t pt-6">
                      <Label className="text-lg font-medium">Custom Treatment Details</Label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Treatment Name *</Label>
                          <Input
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            placeholder="e.g., Advanced Cardiac Surgery"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Abbreviation</Label>
                          <Input
                            value={customAbbreviation}
                            onChange={(e) => setCustomAbbreviation(e.target.value)}
                            placeholder="e.g., ACS"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Description *</Label>
                        <Textarea
                          value={customDescription}
                          onChange={(e) => setCustomDescription(e.target.value)}
                          placeholder="Describe the treatment procedure, benefits, and what patients can expect..."
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Price range *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                        <Input
                          value={priceFrom}
                          onChange={(e) => setPriceFrom(e.target.value.replace(/\D/g, ""))}
                          placeholder="Starting Price (e.g., 120,000)"
                          className={`pl-8 ${fieldErrors.priceFrom ? "border-red-500" : ""}`}
                          inputMode="numeric"
                          aria-invalid={!!fieldErrors.priceFrom}
                        />
                        {fieldErrors.priceFrom && <p className="text-xs text-red-600 mt-1">{fieldErrors.priceFrom}</p>}
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                        <Input
                          value={priceTo}
                          onChange={(e) => setPriceTo(e.target.value.replace(/\D/g, ""))}
                          placeholder="To (e.g., 500,000)"
                          className={`pl-8 ${fieldErrors.priceTo ? "border-red-500" : ""}`}
                          inputMode="numeric"
                          aria-invalid={!!fieldErrors.priceTo}
                        />
                        {fieldErrors.priceTo && <p className="text-xs text-red-600 mt-1">{fieldErrors.priceTo}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Duration (days) *</Label>
                      <Input
                        value={duration}
                        onChange={(e) => setDuration(e.target.value.replace(/\D/g, ""))}
                        placeholder="e.g., 1"
                        className={fieldErrors.duration ? "border-red-500" : ""}
                        inputMode="numeric"
                        aria-invalid={!!fieldErrors.duration}
                      />
                      {fieldErrors.duration && <p className="text-xs text-red-600">{fieldErrors.duration}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Recovery Period (days) *</Label>
                      <Input
                        value={recoveryPeriod}
                        onChange={(e) => setRecoveryPeriod(e.target.value.replace(/\D/g, ""))}
                        placeholder="e.g., 14"
                        className={fieldErrors.recoveryPeriod ? "border-red-500" : ""}
                        inputMode="numeric"
                        aria-invalid={!!fieldErrors.recoveryPeriod}
                      />
                      {fieldErrors.recoveryPeriod && (
                        <p className="text-xs text-red-600">{fieldErrors.recoveryPeriod}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Hospital Stay (days) *</Label>
                      <Input
                        value={hospitalStay}
                        onChange={(e) => setHospitalStay(e.target.value.replace(/\D/g, ""))}
                        placeholder="e.g., 3"
                        className={fieldErrors.hospitalStay ? "border-red-500" : ""}
                        inputMode="numeric"
                        aria-invalid={!!fieldErrors.hospitalStay}
                      />
                      {fieldErrors.hospitalStay && <p className="text-xs text-red-600">{fieldErrors.hospitalStay}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Success Rate (%)</Label>
                      <Input
                        value={successRate}
                        onChange={(e) => setSuccessRate(e.target.value.replace(/\D/g, ""))}
                        placeholder="e.g., 95"
                        inputMode="numeric"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" className="bg-transparent" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button
                      onClick={onSubmit}
                      disabled={submitting || !hospitalId}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Adding Treatment...
                        </>
                      ) : (
                        "Add Treatment"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
