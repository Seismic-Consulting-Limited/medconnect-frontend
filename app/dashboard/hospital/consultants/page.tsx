"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { dashboardService } from "@/lib/services/dashboard-service"

type Row = {
  id: string
  fullName: string
  specialty?: string
  fee?: number
  status?: "Profile Complete" | "Pending Update" | "Profile Archived"
  dateAdded?: string
  appointments?: number
  avatarUrl?: string | null
}

function formatNaira(n?: number) {
  if (typeof n !== "number") return "—"
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n)
  } catch {
    return `₦${n.toLocaleString()}`
  }
}

function formatDate(iso?: string) {
  if (!iso) return "—"
  try {
    const d = new Date(iso)
    const day = d.toLocaleString("en-GB", { day: "2-digit" })
    const mon = d.toLocaleString("en-GB", { month: "short" })
    const year = d.getFullYear()
    return `${day} ${mon}, ${year}`
  } catch {
    return iso
  }
}

export default function ConsultantsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  // header stats
  const doctorCount = rows.length
  const profileCompleted = rows.filter((r) => r.status === "Profile Complete").length
  const pendingUpdate = rows.filter((r) => r.status === "Pending Update").length
  const archived = rows.filter((r) => r.status === "Profile Archived").length

  // Fetch from hospital dashboard (we reuse your existing service)
  useEffect(() => {
    let off = false
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await dashboardService.getHospitalDashboard()
        if (off) return

        const mapped: Row[] =
          (data?.doctors ?? []).map((d, idx) => ({
            id: String(d.id ?? idx),
            fullName: d.full_name ?? ([d.first_name, d.last_name].filter(Boolean).join(" ") || d.name || "—"),
            specialty:
              d.primary_specialty ?? (Array.isArray((d as any).specialties) ? (d as any).specialties?.[0] : undefined),
            fee: (d as any)?.consultation_fee ?? (d as any)?.consultationFee,
            status:
              (d as any)?.profile_status === "archived"
                ? "Profile Archived"
                : (d as any)?.profile_status === "pending"
                  ? "Pending Update"
                  : "Profile Complete",
            dateAdded: (d as any)?.created_at ?? (d as any)?.createdAt,
            appointments: (d as any)?.appointments_count ?? (d as any)?.appointments ?? 0,
            avatarUrl: (d as any)?.profile_image ?? null,
          })) ?? []

        setRows(mapped)
      } catch (e: any) {
        setError(e?.message || "Failed to load consultants.")
      } finally {
        if (!off) setLoading(false)
      }
    }
    run()
    return () => {
      off = true
    }
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return rows
    const q = search.toLowerCase()
    return rows.filter((r) => r.fullName.toLowerCase().includes(q) || (r.specialty ?? "").toLowerCase().includes(q))
  }, [rows, search])

  const goAdd = () => router.push("/dashboard/hospital/consultants/new")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64">
          <h1 className="text-xl font-semibold text-gray-900">Consultants</h1>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6 ml-0 lg:ml-64">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Consultants</div>
                <div className="text-3xl font-bold mt-1">{doctorCount}</div>
                <div className="text-xs text-gray-400">Total number of consultants</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Profile Completed</div>
                <div className="text-3xl font-bold mt-1">{profileCompleted}</div>
                <div className="text-xs text-gray-400">Have updated their profiles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Pending Update</div>
                <div className="text-3xl font-bold mt-1">{pendingUpdate}</div>
                <div className="text-xs text-gray-400">Yet to update their profiles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Archived Consultants</div>
                <div className="text-3xl font-bold mt-1">{archived}</div>
                <div className="text-xs text-gray-400">Consultants data that are archived</div>
              </CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for name and specialty"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>

              {/* Show this Add button always on the Consultants page */}
              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={goAdd}>
                + Add Consultant
              </Button>
            </div>
          </div>

          {/* Empty state -> only show “Add First Consultant” when none */}
          {doctorCount === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">No Consultants yet</h3>
              <p className="text-gray-500 mb-6">Add your first consultant so patients can view and book them.</p>
              <Button variant="outline" className="bg-transparent" onClick={goAdd}>
                + Add First Consultant
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg border overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[60px_1.6fr_1.2fr_1.1fr_1.1fr_1.1fr_1fr_100px] px-4 py-3 text-xs font-medium text-gray-500 border-b">
                <div>S/N</div>
                <div>Consultant Name</div>
                <div>Primary Specialty</div>
                <div>Consultation Fee</div>
                <div>Profile Status</div>
                <div>Date Added</div>
                <div>Appointments</div>
                <div>Action</div>
              </div>

              {/* Rows */}
              {loading ? (
                <div className="p-6 text-sm text-gray-500">Loading…</div>
              ) : error ? (
                <div className="p-6 text-sm text-red-600">{error}</div>
              ) : (
                filtered.map((r, idx) => (
                  <div
                    key={r.id}
                    className="grid grid-cols-[60px_1.6fr_1.2fr_1.1fr_1.1fr_1.1fr_1fr_100px] items-center px-4 py-3 border-b last:border-b-0 text-sm"
                  >
                    <div className="text-gray-500">{idx + 1}</div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        {r.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.avatarUrl || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-600">DR</span>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{r.fullName}</span>
                    </div>

                    <div className="text-gray-700">{r.specialty ?? "—"}</div>
                    <div className="font-medium">{formatNaira(r.fee)}</div>

                    <div>
                      {r.status === "Profile Complete" && (
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200">Profile Complete</Badge>
                      )}
                      {r.status === "Pending Update" && (
                        <Badge className="bg-yellow-50 text-yellow-800 border-yellow-200">Pending Update</Badge>
                      )}
                      {r.status === "Profile Archived" && (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700">
                          Profile Archived
                        </Badge>
                      )}
                    </div>

                    <div className="text-gray-700">{formatDate(r.dateAdded)}</div>
                    <div className="text-gray-700">{r.appointments ?? 0}</div>

                    <div className="flex justify-end">
                      <Button variant="outline" className="h-8 bg-transparent">
                        View
                        <MoreHorizontal className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Simple pagination mock (visual only) */}
          {doctorCount > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button variant="outline" className="h-8 w-8 p-0 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Button
                  key={n}
                  variant={n === 1 ? "default" : "outline"}
                  className={`h-8 w-8 p-0 ${n === 1 ? "bg-primary text-white" : "bg-transparent"}`}
                >
                  {n}
                </Button>
              ))}
              <Button variant="outline" className="h-8 w-8 p-0 bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
