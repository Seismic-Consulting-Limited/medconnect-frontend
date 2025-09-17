"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Globe,
  MapPin,
  SearchIcon,
  Sliders,
  Star,
  Plane,
  X,
  BarChart2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { SoftGate } from "@/components/soft-gate"
import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"
import type { TravelAgentDTO, TravelAgentUI } from "@/lib/types/travel-agent"

const TOP_DESTINATIONS_PRESET = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Enugu", "Benin City", "Abeokuta"]

const TOP_SERVICES_PRESET = [
  "Flight Booking",
  "Hotel Reservations",
  "Airport Transfers",
  "Visa Assistance",
  "Travel Insurance",
  "Tour Packages",
  "Car Rentals",
  "Medical Travel Coordination",
]

// ---------- Types ----------
type TravelAgentsListResponse = {
  data?:
    | {
        results?: TravelAgentDTO[]
        next?: string | null
        previous?: string | null
      }
    | TravelAgentDTO[]
  next?: string | null
  previous?: string | null
  page?: number
  next_page?: number | null
  message?: string
  detail?: string
}

// ---------- Mapping helpers ----------
function toArrayOfStrings<T>(v: Array<{ name: string } | string> | undefined): string[] {
  if (!v) return []
  return v.map((x) => (typeof x === "string" ? x : x?.name)).filter(Boolean) as string[]
}

function mapPriceTier(tier: TravelAgentDTO["price_tier"]): "$" | "$$" | "$$$" {
  if (tier === 1 || tier === "$") return "$"
  if (tier === 2 || tier === "$$") return "$$"
  if (tier === 3 || tier === "$$$") return "$$$"
  return "$$"
}

function mapTravelAgent(dto: TravelAgentDTO): TravelAgentUI {
  const locationParts = [dto.location?.address_1, dto.location?.state?.name].filter(Boolean)

  return {
    id: String(dto.id),
    name: dto.name,
    description: dto.description || "—",
    fullDescription: dto.full_description || dto.description,
    location: locationParts.join(", ") || "—",
    address: dto.location?.address_1,
    state: dto.location?.state?.name,
    country: "Nigeria",
    image: dto.profile_image || dto.cover_image_url || dto.logo_url || "/placeholder.svg",
    rating: typeof dto.rating === "number" ? dto.rating : 0,
    reviews: typeof dto.reviews_count === "number" ? dto.reviews_count : 0,
    destinations: toArrayOfStrings(dto.destinations),
    services: toArrayOfStrings(dto.services),
    hospitalPartners: toArrayOfStrings(dto.hospital_partners),
    certifications: toArrayOfStrings(dto.certifications),
    price: mapPriceTier(dto.price_tier),
    languages: dto.languages,
    yearFounded: dto.year_founded,
    yearsOfExperience: dto.years_of_experience,
    phoneNumber1: dto.phone_number_1,
    phoneNumber2: dto.phone_number_2,
    websiteUrl: dto.website_url,
    registrationNumber: dto.registration_number,
    images: dto.images,
    internationalClients: dto.international_clients,
  }
}

export default function TravelAgentsPage() {
  const [showGate, setShowGate] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([1, 3])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const [travelAgents, setTravelAgents] = useState<TravelAgentUI[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Hardcoded Top Filters (initialize from presets)
  const [topDestinations] = useState<string[]>(TOP_DESTINATIONS_PRESET.slice(0, 6))
  const [topServices] = useState<string[]>(TOP_SERVICES_PRESET.slice(0, 6))

  // Pagination
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)

  const [showComparison, setShowComparison] = useState(false)
  const [agentsToCompare, setAgentsToCompare] = useState<string[]>([])
  const [visibleAgents, setVisibleAgents] = useState(12)

  // --------- Fetch travel agents ----------
  const fetchTravelAgents = async (opts?: { url?: string; page?: number; append?: boolean }) => {
    const url = opts?.url ?? `${API_ENDPOINTS.META.TRAVEL_AGENTS}?page=${opts?.page ?? page}`
    setIsLoading(true)
    setLoadError(null)
    try {
      const res = await apiRequest<TravelAgentsListResponse>(url, { method: HTTP_METHODS.GET })

      // Normalize shape
      const results: TravelAgentDTO[] =
        (Array.isArray(res?.data) ? (res?.data as TravelAgentDTO[]) : res?.data?.results) ?? ([] as TravelAgentDTO[])

      const mapped = results.map(mapTravelAgent)

      // Fix: ensure visible count is based on the *new* array length
      setTravelAgents((prev) => {
        const next = opts?.append ? [...prev, ...mapped] : mapped
        setVisibleAgents((v) => (opts?.append ? Math.min(v + 12, next.length) : Math.min(12, next.length)))
        return next
      })

      // next URL detection
      const nextFromData = (res as any)?.data?.next ?? (res as any)?.next ?? null
      const nextPageFromData = (res as any)?.data?.next_page ?? (res as any)?.next_page ?? null

      if (nextFromData) {
        setNextUrl(nextFromData as string)
      } else if (nextPageFromData) {
        setNextUrl(`${API_ENDPOINTS.META.TRAVEL_AGENTS}?page=${nextPageFromData}`)
      } else {
        setNextUrl(null)
      }
    } catch (err: any) {
      const m = err?.message || err?.detail || "Could not load travel agents. Please try again."
      setLoadError(m)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchTravelAgents({ page: 1, append: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLoadMore = async () => {
    if (travelAgents.length >= 12) {
      setShowGate(true)
      return
    }
    if (nextUrl) {
      const nextPageMatch = /[?&]page=(\d+)/.exec(nextUrl)
      const nextP = nextPageMatch ? Number(nextPageMatch[1]) : undefined
      await fetchTravelAgents({ url: nextUrl, page: nextP, append: true })
      setVisibleAgents((v) => Math.min(v + 12, travelAgents.length + 12))
    } else {
      // no server next -> just reveal more if already loaded
      setVisibleAgents((v) => Math.min(v + 12, travelAgents.length))
    }
  }

  // --------- Filters / search (client-side) ----------
  const filteredAgents = useMemo(() => {
    const priceMapping = { $: 1, $$: 2, $$$: 3 } as const

    return travelAgents.filter((agent) => {
      const matchesSearch =
        searchQuery === "" ||
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.destinations.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
        agent.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (agent.location && agent.location.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesDestination =
        selectedDestinations.length === 0 || agent.destinations.some((d) => selectedDestinations.includes(d))

      const matchesService = selectedServices.length === 0 || agent.services.some((s) => selectedServices.includes(s))

      const matchesCertification =
        selectedCertifications.length === 0 ||
        (agent.certifications && agent.certifications.some((cert) => selectedCertifications.includes(cert)))

      const agentPrice = priceMapping[agent.price]
      const matchesPrice = agentPrice >= priceRange[0] && agentPrice <= priceRange[1]

      return matchesSearch && matchesDestination && matchesService && matchesCertification && matchesPrice
    })
  }, [travelAgents, searchQuery, selectedDestinations, selectedServices, selectedCertifications, priceRange])

  // --------- UI handlers ----------
  const handleSearch = () => {}

  const toggleDestination = (destination: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination) ? prev.filter((d) => d !== destination) : [...prev, destination],
    )
  }

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const toggleCertification = (certification: string) => {
    setSelectedCertifications((prev) =>
      prev.includes(certification) ? prev.filter((c) => c !== certification) : [...prev, certification],
    )
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedDestinations([])
    setSelectedServices([])
    setSelectedCertifications([])
    setPriceRange([1, 3])
  }

  const handleImageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {}

  const toggleAgentComparison = (agentId: string) => {
    setAgentsToCompare((prev) => {
      if (prev.includes(agentId)) return prev.filter((id) => id !== agentId)
      if (prev.length >= 6) return prev
      return [...prev, agentId]
    })
  }

  const removeFromComparison = (agentId: string) => {
    setAgentsToCompare((prev) => prev.filter((id) => id !== agentId))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full bg-gradient-to-br from-purple-50 via-white to-green-50 py-8 md:py-12">
          <ResponsiveContainer>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Travel Agents in Nigeria</h1>
                <p className="text-gray-600 text-base max-w-2xl mx-auto">
                  Find certified travel agents to help with your medical tourism journey.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
                    <div className="relative flex-1">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search agents, destinations, or services..."
                        className="pl-9 py-3 border-gray-300 focus:border-primary focus:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary border-primary/20 hover:bg-primary/5 bg-transparent px-3"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                      <Sliders className="h-3 w-3 mr-1" />
                      Filters
                      <ChevronDown
                        className={`h-3 w-3 ml-1 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </div>

                  {/* Advanced filters */}
                  {showAdvancedFilters && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            Destinations
                          </h3>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                            {topDestinations.slice(0, 8).map((destination) => (
                              <div key={destination} className="flex items-center">
                                <Checkbox
                                  id={`destination-${destination}`}
                                  checked={selectedDestinations.includes(destination)}
                                  onCheckedChange={() => toggleDestination(destination)}
                                  className="border-gray-300 text-primary focus:ring-primary"
                                />
                                <label
                                  htmlFor={`destination-${destination}`}
                                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                                >
                                  {destination}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Plane className="h-4 w-4 mr-2 text-primary" />
                            Services
                          </h3>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                            {topServices.slice(0, 8).map((service) => (
                              <div key={service} className="flex items-center">
                                <Checkbox
                                  id={`service-${service}`}
                                  checked={selectedServices.includes(service)}
                                  onCheckedChange={() => toggleService(service)}
                                  className="border-gray-300 text-primary focus:ring-primary"
                                />
                                <label
                                  htmlFor={`service-${service}`}
                                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                                >
                                  {service}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                              Certifications
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {["IATA", "ASTA", "CLIA", "ABTA", "ATOL", "TAFI"].slice(0, 6).map((cert) => (
                                <Badge
                                  key={cert}
                                  variant={selectedCertifications.includes(cert) ? "default" : "outline"}
                                  className={`cursor-pointer ${
                                    selectedCertifications.includes(cert)
                                      ? "bg-primary hover:bg-primary/90"
                                      : "hover:bg-primary/10"
                                  }`}
                                  onClick={() => toggleCertification(cert)}
                                >
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                              <span className="h-4 w-4 mr-2 text-primary flex items-center justify-center">$</span>
                              Price Range
                            </h3>
                            <div className="px-2">
                              <Slider
                                defaultValue={[1, 3]}
                                min={1}
                                max={3}
                                step={1}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="my-4"
                              />
                              <div className="flex justify-between text-sm text-gray-500">
                                <span>Budget</span>
                                <span>Mid-range</span>
                                <span>Premium</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between mt-6 pt-4 border-t border-gray-200 gap-4">
                        <div className="flex flex-wrap gap-1">
                          {selectedDestinations.length > 0 && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 gap-1">
                              Destinations: {selectedDestinations.length}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDestinations([])} />
                            </Badge>
                          )}
                          {selectedServices.length > 0 && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 gap-1">
                              Services: {selectedServices.length}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedServices([])} />
                            </Badge>
                          )}
                          {selectedCertifications.length > 0 && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 gap-1">
                              Certifications: {selectedCertifications.length}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCertifications([])} />
                            </Badge>
                          )}
                          {(priceRange[0] !== 1 || priceRange[1] !== 3) && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 gap-1">
                              Price:{" "}
                              {Array(priceRange[1] - priceRange[0] + 1)
                                .fill("$")
                                .join("")}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([1, 3])} />
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetFilters}
                          className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-700 self-end sm:self-auto bg-transparent"
                        >
                          Reset All Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-8 md:py-12 bg-white">
          <ResponsiveContainer>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                {(isLoading || loadError || filteredAgents.length > 0) && (
                  <p className="text-gray-500">
                    {loadError
                      ? "Unable to load travel agents"
                      : isLoading
                        ? "Loading travel agents…"
                        : `${filteredAgents.length} ${filteredAgents.length === 1 ? "result" : "results"} found`}
                  </p>
                )}
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-end sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">Sort by:</p>
                  <Select defaultValue="rating">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="az">A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant={agentsToCompare.length > 0 ? "default" : "outline"}
                  className={
                    agentsToCompare.length > 0
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "border-primary/20 text-primary hover:bg-primary/5"
                  }
                  onClick={() => setShowComparison(true)}
                  disabled={agentsToCompare.length === 0}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Compare Agents {agentsToCompare.length > 0 && `(${agentsToCompare.length})`}
                </Button>
              </div>
            </div>

            {loadError && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <X className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Error loading travel agents</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">{loadError}</p>
                <Button
                  variant="outline"
                  onClick={() => fetchTravelAgents({ page: 1, append: false })}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Retry
                </Button>
              </div>
            )}

            {!loadError && filteredAgents.length === 0 && !isLoading ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <SearchIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No travel agents found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any travel agents matching your search criteria. Try adjusting your filters or search
                  terms.
                </p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.slice(0, visibleAgents).map((agent) => (
                  <Card key={agent.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video w-full overflow-hidden relative">
                      <img
                        src={agent.image || "/placeholder.svg"}
                        alt={`${agent.name} office`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Button
                          variant={agentsToCompare.includes(agent.id) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-md ${
                            agentsToCompare.includes(agent.id)
                              ? "bg-primary text-white hover:bg-primary/90"
                              : "bg-white/90 border-gray-300 hover:bg-white"
                          }`}
                          onClick={() => toggleAgentComparison(agent.id)}
                        >
                          <BarChart2 className="h-4 w-4" />
                          <span className="sr-only">
                            {agentsToCompare.includes(agent.id) ? "Selected for comparison" : "Compare"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{agent.name}</h3>
                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{agent.rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500">({agent.reviews})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-gray-500">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">{agent.location}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500 line-clamp-3">{agent.description}</p>
                      </div>
                      {agent.certifications && agent.certifications.length > 0 && (
                        <div className="mt-3 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div className="flex flex-wrap gap-1">
                            {agent.certifications.map((cert) => (
                              <span key={cert} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {agent.destinations.slice(0, 3).map((d) => (
                          <span key={d} className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700">
                            {d}
                          </span>
                        ))}
                        {agent.destinations.length > 3 && (
                          <span className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700">
                            +{agent.destinations.length - 3} more
                          </span>
                        )}
                      </div>
                      {agent.languages && agent.languages.includes("English") && (
                        <div className="mt-3 flex items-center gap-1">
                          <Globe className="h-4 w-4 text-primary" />
                          <span className="text-xs text-gray-500">English</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex gap-2">
                      <Button className="flex-1 bg-primary hover:bg-primary/90 text-white" asChild>
                        <Link href={`/travel-agents/${agent.id}`}>View Agent</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More button */}
            {!loadError && (nextUrl || visibleAgents < filteredAgents.length) && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  className="border-primary/20 text-primary hover:bg-primary/5 bg-transparent"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading…" : "Load More Travel Agents"}
                </Button>
              </div>
            )}
          </ResponsiveContainer>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <ResponsiveContainer>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Are You a Travel Agent in Nigeria?</h2>
              <p className="text-white/80 text-lg mb-8">
                Join our platform to connect with international patients seeking medical care in Nigeria and expand your
                reach in the medical tourism market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Apply to Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {showGate && <SoftGate type="travel-agent" onClose={() => setShowGate(false)} />}
      </main>
      <SiteFooter />
    </div>
  )
}
