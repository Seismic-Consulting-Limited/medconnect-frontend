"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { TreatmentsEmptyState } from "@/components/treatments/treatments-empty-state"
import { dashboardService } from "@/lib/services/dashboard-service"
import { apiRequest } from "@/lib/utils/api-request"
import { authService } from "@/lib/auth"
import { API_ENDPOINTS } from "@/lib/constants"
import type { Treatment } from "@/lib/types/treatment"

export default function TreatmentsPage() {
  const router = useRouter()
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [loading, setLoading] = useState(true)
  const [hospitalId, setHospitalId] = useState<string | null>(null)

  // Load hospital id and treatments
  useEffect(() => {
    let off = false
    ;(async () => {
      try {
        const data = await dashboardService.getHospitalDashboard()
        if (off) return
        const id = String((data as any)?.id ?? (data as any)?.hospital_id ?? "")
        if (id) {
          setHospitalId(id)
          // Load treatments for this hospital
          await loadTreatments(id)
        } else {
          toast.error("Could not determine hospital id.")
        }
      } catch (e: any) {
        toast.error(e?.message || "Could not load hospital info.")
      } finally {
        if (!off) setLoading(false)
      }
    })()
    return () => {
      off = true
    }
  }, [])

  const loadTreatments = async (hospitalId: string) => {
    try {
      const response = await apiRequest<{ data: any[] }>(
        API_ENDPOINTS.HOSPITAL.GET_TREATMENTS(hospitalId),
        { method: "GET" },
        { auth: true, getToken: () => authService.getToken() },
      )

      console.log("[v0] Raw treatments API response:", response)

      // Transform the API response to match our TypeScript types
      const transformedTreatments: Treatment[] = (response.data || []).map((item: any) => {
        // Parse duration strings to days
        const parseDuration = (durationStr: string): number => {
          if (!durationStr) return 0
          const match = durationStr.match(/(\d+)\s*(day|week|month)s?/i)
          if (!match) return 0

          const value = Number.parseInt(match[1])
          const unit = match[2].toLowerCase()

          switch (unit) {
            case "day":
              return value
            case "week":
              return value * 7
            case "month":
              return value * 30
            default:
              return value
          }
        }

        return {
          id: item.id,
          name: item.name,
          description: item.description || "",
          abbreviation: item.abbreviation,
          price_range_from: item.price_range?.min || 0,
          price_range_to: item.price_range?.max || 0,
          currency: item.currency || "NGN",
          duration_in_days: parseDuration(item.duration),
          hospital_stay_period_in_days: parseDuration(item.hospital_stay_period),
          recovery_period_in_days: parseDuration(item.recovery_period),
          success_rate_percentage: Number.parseFloat(item.success_rate_percentage) || 0,
          hospitalId: hospitalId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      })

      const uniqueTreatments = transformedTreatments.filter(
        (treatment, index, self) => index === self.findIndex((t) => t.id === treatment.id),
      )

      console.log("[v0] Transformed treatments:", transformedTreatments)
      console.log("[v0] Unique treatments after deduplication:", uniqueTreatments)

      if (transformedTreatments.length !== uniqueTreatments.length) {
        console.log("[v0] Removed", transformedTreatments.length - uniqueTreatments.length, "duplicate treatments")
      }

      setTreatments(uniqueTreatments)
    } catch (e: any) {
      console.log("[v0] Failed to load treatments:", e)
      toast.error("Failed to load treatments")
      setTreatments([])
    }
  }

  const filteredTreatments = treatments.filter((treatment) =>
    treatment.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddTreatment = () => {
    router.push("/dashboard/hospital/treatments/new")
  }

  const handleDeleteTreatment = async (id: string) => {
    if (!hospitalId) return

    try {
      await apiRequest(
        `${API_ENDPOINTS.HOSPITAL.GET_TREATMENTS(hospitalId)}${id}/`,
        { method: "DELETE" },
        { auth: true, getToken: () => authService.getToken() },
      )

      setTreatments((prev) => prev.filter((t) => t.id !== id))
      toast.success("Treatment deleted successfully")
    } catch (e: any) {
      toast.error("Failed to delete treatment")
    }
  }

  const formatPrice = (from: number, to: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency === "NGN" ? "NGN" : "USD",
      minimumFractionDigits: 0,
    })
    return `${formatter.format(from)} - ${formatter.format(to)}`
  }

  const formatDuration = (days: number) => {
    if (days === 1) return "1 day"
    if (days < 7) return `${days} days`
    const weeks = Math.floor(days / 7)
    const remainingDays = days % 7
    if (remainingDays === 0) return weeks === 1 ? "1 week" : `${weeks} weeks`
    return `${weeks}w ${remainingDays}d`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-4 lg:p-6 ml-0 lg:ml-64">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-4 lg:p-6 ml-0 lg:ml-64">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Treatments</h1>

            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for name of treatment"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddTreatment} className="gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4" />
                  Add Treatment
                </Button>
              </div>
            </div>
          </div>

          {filteredTreatments.length === 0 ? (
            <TreatmentsEmptyState onAddTreatment={handleAddTreatment} />
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="w-16">S/N</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Price Range</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Recovery Period</TableHead>
                      <TableHead>Hospital Stay</TableHead>
                      <TableHead className="w-16">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTreatments.map((treatment, index) => (
                      <TableRow key={`${treatment.id}-${index}`}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{treatment.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{treatment.description}</TableCell>
                        <TableCell>
                          {formatPrice(treatment.price_range_from, treatment.price_range_to, treatment.currency)}
                        </TableCell>
                        <TableCell>{formatDuration(treatment.duration_in_days)}</TableCell>
                        <TableCell>{formatDuration(treatment.recovery_period_in_days)}</TableCell>
                        <TableCell>{formatDuration(treatment.hospital_stay_period_in_days)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteTreatment(treatment.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
