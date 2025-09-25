"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { ArrowLeft } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"
import { authService } from "@/lib/auth"

// ---- Types kept light/forgiving to handle mixed backend shapes
type RawAgent = Record<string, any>

type AgentProfile = {
  name: string
  state: string
  yearEstablished: string
  agentsCount: string
  officesCount: string
  about: string
  address: string
  email: string
  phone: string
  profileImage: string
  photos: string[]
}

/** Normalize whatever the dashboard returns into a stable shape */
function normalizeAgent(raw: RawAgent): AgentProfile {
  const src = raw?.data ?? raw ?? {}

  const name =
    src.name ??
    src.company_name ??
    src.agency_name ??
    ""

  const state =
    src.location?.state?.name ??
    src.location?.state_name ??
    src.state_name ??
    src.state ??
    ""

  const year =
    src.year_founded ??
    src.year_established ??
    src.established_year ??
    ""

  const agentsCount =
    src.stats?.number_of_agents ??
    src.number_of_agents ??
    src.staff_count ??
    src.employees_count ??
    ""

  const officesCount =
    src.stats?.number_of_offices ??
    src.number_of_offices ??
    src.branches_count ??
    ""

  const about =
    src.description ??
    src.about ??
    ""

  const address =
    src.location?.address_1 ??
    src.location?.address ??
    src.address_1 ??
    src.address ??
    ""

  const email =
    src.email ??
    src.contact_email ??
    ""

  const phone =
    src.phone_number ??
    src.contact_phone ??
    src.phone ??
    ""

  const profileImage =
    src.logo_url ??
    src.profile_image_url ??
    src.photo_url ??
    ""

  const photos: string[] =
    Array.isArray(src.photos)
      ? src.photos
      : Array.isArray(src.gallery)
        ? src.gallery
        : []

  return {
    name: String(name || ""),
    state: String(state || ""),
    yearEstablished: year ? String(year) : "",
    agentsCount: agentsCount ? String(agentsCount) : "",
    officesCount: officesCount ? String(officesCount) : "",
    about: String(about || ""),
    address: String(address || ""),
    email: String(email || ""),
    phone: String(phone || ""),
    profileImage: String(profileImage || ""),
    photos: photos.map(String),
  }
}

export default function TravelAgentProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [agent, setAgent] = useState<AgentProfile | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await apiRequest<RawAgent>(
          API_ENDPOINTS.DASHBOARD.TRAVEL_AGENT,
          { method: HTTP_METHODS.GET },
          { auth: true, getToken: () => authService.getToken() }
        )

        if (cancelled) return
        setAgent(normalizeAgent(res))
      } catch (e: any) {
        if (cancelled) return
        setError(e?.message || "Failed to load profile")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const photos = useMemo(() => agent?.photos?.slice(0, 6) ?? [], [agent])

  const handleBack = () => router.back()
  const handleEditProfile = () => router.push("/dashboard/travel-agent/profile/edit")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main */}
        <main className="flex-1 p-6 ml-0 lg:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Loading / Error states */}
            {loading && (
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6 mt-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i}>
                        <div className="h-3 w-28 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {error && !loading && (
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <p className="text-sm text-red-600">{error}</p>
                </CardContent>
              </Card>
            )}

            {!loading && !error && agent && (
              <>
                {/* Agency Information (mirrors Hospital UI) */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Agency Information</h2>
                      <p className="text-gray-600 text-sm">Basic information about your travel agency</p>
                    </div>
                    <Button onClick={handleEditProfile} className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                      Edit Profile
                    </Button>
                  </div>

                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                      {/* Profile Photo */}
                      <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-20 w-20 border border-gray-200">
                            <AvatarImage src={agent.profileImage || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                              </div>
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-gray-900">Profile Photo</h3>
                            <p className="text-sm text-gray-500">PNG, JPEG, Under 10MB</p>
                          </div>
                        </div>
                        <Button variant="outline" className="ml-auto bg-transparent">
                          Upload new picture
                        </Button>
                      </div>

                      {/* Details Grid (kept same structure) */}
                      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                        <div>
                          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            AGENCY NAME
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">{agent.name || "—"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">STATE</label>
                          <p className="mt-1 text-gray-900 font-medium">{agent.state || "—"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            YEAR ESTABLISHED
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">{agent.yearEstablished || "—"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            NUMBER OF AGENTS
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">{agent.agentsCount || "—"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            NUMBER OF OFFICES
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">{agent.officesCount || "—"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            REGISTRATION / LICENSE
                          </label>
                          <p className="mt-1 text-gray-900 font-medium">
                            {/* Pull from description if your API includes registration explicitly, adjust if needed */}
                            {agent.about?.match(/(RC|LIC|REG)[\s:-]?\w+/i)?.[0] ?? "—"}
                          </p>
                        </div>
                      </div>

                      {/* About section */}
                      <div className="mt-8">
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">ABOUT AGENCY</label>
                        <p className="mt-2 text-gray-900 leading-relaxed text-justify">
                          {agent.about || "—"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Information */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                    <p className="text-gray-600 text-sm">Description text goes here</p>
                  </div>

                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            AGENCY ADDRESS
                          </label>
                          <p className="mt-1 text-gray-900">{agent.address || "—"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-12">
                          <div>
                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                              EMAIL ADDRESS
                            </label>
                            <p className="mt-1 text-gray-900">{agent.email || "—"}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                              PHONE NUMBER
                            </label>
                            <p className="mt-1 text-gray-900">{agent.phone || "—"}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upload Photos (mirrors hospital UI) */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Upload Photos</h2>
                      <p className="text-gray-600 text-sm">
                        Showcase your services and team with great photos.{" "}
                        <span className="font-medium">6 photos maximum.</span>
                      </p>
                    </div>
                    <Button variant="outline">Change Photos</Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {(photos.length ? photos : Array.from({ length: 6 }).map(() => "/placeholder.svg")).map(
                      (photo, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`Agency photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
