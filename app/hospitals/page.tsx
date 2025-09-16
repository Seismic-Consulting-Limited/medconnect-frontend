// app/(marketing)/hospitals/page.tsx
"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Globe,
  Heart,
  ImageIcon,
  MapPin,
  SearchIcon,
  Sliders,
  Star,
  Stethoscope,
  X,
  BarChart2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { SoftGate } from "@/components/soft-gate"
import { useViewTracker } from "@/hooks/use-view-tracker"
import { HospitalComparison } from "@/components/hospital-comparison"
import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"

// ---------- Hardcoded Top Filters ----------
const TOP_SPECIALTIES_PRESET = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Oncology",
  "Gastroenterology",
  "Fertility",
  "Pediatrics",
  "Obstetrics & Gynecology",
]

const TOP_LOCATIONS_PRESET = ["Lagos", "Abuja", "Ibadan", "Port Harcourt", "Kano", "Enugu", "Benin City", "Abeokuta"]

// ---------- Types ----------
type HospitalDTO = {
  id: string | number
  name: string
  description?: string
  city?: string
  state?: string
  country?: string
  address_1?: string
  rating?: number
  reviews_count?: number
  cover_image_url?: string
  logo_url?: string
  specialties?: Array<{ name: string } | string>
  accreditations?: Array<{ name: string } | string>
  price_tier?: 1 | 2 | 3 | "$" | "$$" | "$$$"
  languages?: string[]
}

type HospitalsListResponse = {
  data?:
    | {
        results?: HospitalDTO[]
        next?: string | null
        previous?: string | null
      }
    | HospitalDTO[]
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

function mapPriceTier(tier: HospitalDTO["price_tier"]): "$" | "$$" | "$$$" {
  if (tier === 1 || tier === "$") return "$"
  if (tier === 2 || tier === "$$") return "$$"
  if (tier === 3 || tier === "$$$") return "$$$"
  return "$$"
}

type HospitalUI = {
  id: string
  name: string
  description: string
  location: string
  image?: string
  rating: number
  reviews: number
  specialties: string[]
  accreditations: string[]
  price: "$" | "$$" | "$$$"
  languages?: string[]
}

function mapHospital(dto: HospitalDTO): HospitalUI {
  const locParts = [dto.city, dto.state, dto.country?.includes("Nigeria") ? "Nigeria" : dto.country].filter(Boolean)
  return {
    id: String(dto.id),
    name: dto.name,
    description: dto.description || "—",
    location: locParts.join(", ") || dto.address_1 || "—",
    image: dto.cover_image_url || dto.logo_url || "/placeholder.svg",
    rating: typeof dto.rating === "number" ? dto.rating : 0,
    reviews: typeof dto.reviews_count === "number" ? dto.reviews_count : 0,
    specialties: toArrayOfStrings(dto.specialties),
    accreditations: toArrayOfStrings(dto.accreditations),
    price: mapPriceTier(dto.price_tier),
    languages: dto.languages,
  }
}

// ---------- Component ----------
export default function HospitalsPage() {
  const [showGate, setShowGate] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([1, 3])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [searchMode, setSearchMode] = useState<"text" | "image">("text")
  const [imageSearchUrl, setImageSearchUrl] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const [hospitals, setHospitals] = useState<HospitalUI[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Hardcoded Top Filters (initialize from presets)
  const [topSpecialties] = useState<string[]>(TOP_SPECIALTIES_PRESET.slice(0, 6))
  const [topLocations] = useState<string[]>(TOP_LOCATIONS_PRESET.slice(0, 6))

  // Pagination
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)

  const [showComparison, setShowComparison] = useState(false)
  const [hospitalsToCompare, setHospitalsToCompare] = useState<string[]>([])
  const [visibleHospitals, setVisibleHospitals] = useState(12) // show 12 first

  const { trackView } = useViewTracker()

  // --------- Fetch hospitals ----------
  const fetchHospitals = async (opts?: { url?: string; page?: number; append?: boolean }) => {
    const url = opts?.url ?? `${API_ENDPOINTS.META.HOSPITALS}?page=${opts?.page ?? page}`
    setIsLoading(true)
    setLoadError(null)
    try {
      const res = await apiRequest<HospitalsListResponse>(url, { method: HTTP_METHODS.GET })

      // Normalize shape
      const results: HospitalDTO[] =
        (Array.isArray(res?.data) ? (res?.data as HospitalDTO[]) : res?.data?.results) ?? ([] as HospitalDTO[])

      const mapped = results.map(mapHospital)

      // Fix: ensure visible count is based on the *new* array length
      setHospitals((prev) => {
        const next = opts?.append ? [...prev, ...mapped] : mapped
        setVisibleHospitals((v) => (opts?.append ? Math.min(v + 12, next.length) : Math.min(12, next.length)))
        return next
      })

      // next URL detection
      const nextFromData = (res as any)?.data?.next ?? (res as any)?.next ?? null
      const nextPageFromData = (res as any)?.data?.next_page ?? (res as any)?.next_page ?? null

      if (nextFromData) {
        setNextUrl(nextFromData as string)
      } else if (nextPageFromData) {
        setNextUrl(`${API_ENDPOINTS.META.HOSPITALS}?page=${nextPageFromData}`)
      } else {
        setNextUrl(null)
      }
    } catch (err: any) {
      const m = err?.message || err?.detail || "Could not load hospitals. Please try again."
      setLoadError(m)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchHospitals({ page: 1, append: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLoadMore = async () => {
    if (hospitals.length >= 12) {
      const shouldPrompt = trackView("hospital", "load-more")
      if (shouldPrompt) {
        setShowGate(true)
        return
      }
    }
    if (nextUrl) {
      const nextPageMatch = /[?&]page=(\d+)/.exec(nextUrl)
      const nextP = nextPageMatch ? Number(nextPageMatch[1]) : undefined
      await fetchHospitals({ url: nextUrl, page: nextP, append: true })
      setVisibleHospitals((v) => Math.min(v + 12, hospitals.length + 12))
    } else {
      // no server next -> just reveal more if already loaded
      setVisibleHospitals((v) => Math.min(v + 12, hospitals.length))
    }
  }

  // --------- Filters / search (client-side) ----------
  const filteredHospitals = useMemo(() => {
    const priceMapping = { $: 1, $$: 2, $$$: 3 } as const

    return hospitals.filter((hospital) => {
      const matchesSearch =
        searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        hospital.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSpecialty =
        selectedSpecialties.length === 0 || hospital.specialties.some((s) => selectedSpecialties.includes(s))

      const matchesLocation =
        selectedLocations.length === 0 || selectedLocations.some((loc) => hospital.location.includes(loc))

      const matchesAccreditation =
        selectedAccreditations.length === 0 ||
        (hospital.accreditations && hospital.accreditations.some((acc) => selectedAccreditations.includes(acc)))

      const hospitalPrice = priceMapping[hospital.price]
      const matchesPrice = hospitalPrice >= priceRange[0] && hospitalPrice <= priceRange[1]

      return matchesSearch && matchesSpecialty && matchesLocation && matchesAccreditation && matchesPrice
    })
  }, [hospitals, searchQuery, selectedSpecialties, selectedLocations, selectedAccreditations, priceRange])

  // --------- UI handlers ----------
  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 800)
  }

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty],
    )
  }

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) => (prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]))
  }

  const toggleAccreditation = (accreditation: string) => {
    setSelectedAccreditations((prev) =>
      prev.includes(accreditation) ? prev.filter((a) => a !== accreditation) : [...prev, accreditation],
    )
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedSpecialties([])
    setSelectedLocations([])
    setSelectedAccreditations([])
    setPriceRange([1, 3])
    setImageSearchUrl("")
    setSearchMode("text")
  }

  const handleImageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) setImageSearchUrl(event.target.result as string)
    }
    reader.readAsDataURL(file)
  }

  const toggleHospitalComparison = (hospitalId: string) => {
    setHospitalsToCompare((prev) => {
      if (prev.includes(hospitalId)) return prev.filter((id) => id !== hospitalId)
      if (prev.length >= 6) return prev
      return [...prev, hospitalId]
    })
  }

  const removeFromComparison = (hospitalId: string) => {
    setHospitalsToCompare((prev) => prev.filter((id) => id !== hospitalId))
  }

  const handleAddHospital = () => {
    setShowComparison(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Advanced Search Section */}
        <section className="w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 md:py-16 lg:py-20">
          <ResponsiveContainer>
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-8">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Find Your Ideal Hospital in Nigeria
                </h1>
                <p className="text-gray-600 md:text-xl max-w-[85%] mx-auto">
                  Search our network of accredited hospitals across Nigeria to find the perfect match for your
                  healthcare needs.
                </p>
              </div>
            </div>
            <div className="max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center">
                      <Tabs defaultValue="text" className="w-[200px]">
                        <TabsList className="bg-white/30">
                          <TabsTrigger
                            value="text"
                            className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-700"
                            onClick={() => setSearchMode("text")}
                          >
                            <SearchIcon className="h-4 w-4 mr-1" />
                            Text Search
                          </TabsTrigger>
                          <TabsTrigger
                            value="image"
                            className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-700"
                            onClick={() => setSearchMode("image")}
                          >
                            <ImageIcon className="h-4 w-4 mr-1" />
                            Image Search
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 self-end sm:self-auto"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                      <Sliders className="h-4 w-4 mr-1" />
                      {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
                      <ChevronDown
                        className={`h-4 w-4 ml-1 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </div>
                  <div className="p-6">
                    {/* Text Search */}
                    <div className={`${searchMode === "text" ? "block" : "hidden"}`}>
                      <div className="flex flex-col sm:flex-row items-stretch gap-2">
                        <div className="relative flex-1">
                          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder="Search by hospital name, specialty, treatment, or location..."
                            className="pl-10 py-6 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                          />
                          {searchQuery && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                              onClick={() => setSearchQuery("")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <Button
                          className="bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 text-lg"
                          onClick={handleSearch}
                          disabled={isSearching}
                        >
                          {isSearching ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Searching...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <SearchIcon className="mr-2 h-5 w-5" />
                              Search
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                    {/* Image Search */}
                    <div className={`${searchMode === "image" ? "block" : "hidden"}`}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                          {imageSearchUrl ? (
                            <div className="relative w-full max-w-md">
                              <img
                                src={imageSearchUrl || "/placeholder.svg"}
                                alt="Uploaded image"
                                className="w-full h-auto rounded-lg"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => setImageSearchUrl("")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500 mb-4">Upload an image of a medical condition or hospital</p>
                              <div className="flex justify-center">
                                <label className="cursor-pointer">
                                  <input type="file" accept="image/*" className="hidden" onChange={handleImageSearch} />
                                  <span className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">
                                    Upload Image
                                  </span>
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                        {imageSearchUrl && (
                          <Button
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
                            onClick={handleSearch}
                            disabled={isSearching}
                          >
                            {isSearching ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Analyzing Image...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <SearchIcon className="mr-2 h-5 w-5" />
                                Search with this Image
                              </div>
                            )}
                          </Button>
                        )}
                        <p className="text-xs text-gray-500 text-center">
                          Our AI will analyze your image to find relevant hospitals and treatments.
                          <br />
                          Supported: Medical conditions, hospital facilities, medical equipment
                        </p>
                      </div>
                    </div>
                    {showAdvancedFilters && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                              <Stethoscope className="h-4 w-4 mr-2 text-purple-600" />
                              Specialties
                            </h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                              {topSpecialties.slice(0, 8).map((specialty) => (
                                <div key={specialty} className="flex items-center">
                                  <Checkbox
                                    id={`specialty-${specialty}`}
                                    checked={selectedSpecialties.includes(specialty)}
                                    onCheckedChange={() => toggleSpecialty(specialty)}
                                    className="border-gray-300 text-purple-600 focus:ring-purple-500"
                                  />
                                  <label
                                    htmlFor={`specialty-${specialty}`}
                                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                                  >
                                    {specialty}
                                  </label>
                                </div>
                              ))}
                              {topSpecialties.length === 0 && (
                                <div className="text-xs text-muted-foreground">No specialties available.</div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                              Locations
                            </h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                              {topLocations.slice(0, 8).map((loc) => (
                                <div key={loc} className="flex items-center">
                                  <Checkbox
                                    id={`location-${loc}`}
                                    checked={selectedLocations.includes(loc)}
                                    onCheckedChange={() => toggleLocation(loc)}
                                    className="border-gray-300 text-purple-600 focus:ring-purple-500"
                                  />
                                  <label
                                    htmlFor={`location-${loc}`}
                                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                                  >
                                    {loc}
                                  </label>
                                </div>
                              ))}
                              {topLocations.length === 0 && (
                                <div className="text-xs text-muted-foreground">No locations available.</div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                                Accreditations
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {["JCI", "ISO 9001", "MDCN", "NHIS", "COHSASA", "NMA"].slice(0, 6).map((acc) => (
                                  <Badge
                                    key={acc}
                                    variant={selectedAccreditations.includes(acc) ? "default" : "outline"}
                                    className={`cursor-pointer ${
                                      selectedAccreditations.includes(acc)
                                        ? "bg-purple-600 hover:bg-purple-700"
                                        : "hover:bg-purple-100"
                                    }`}
                                    onClick={() => toggleAccreditation(acc)}
                                  >
                                    {acc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                                <span className="h-4 w-4 mr-2 text-purple-600 flex items-center justify-center">$</span>
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
                            {selectedSpecialties.length > 0 && (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 gap-1">
                                Specialties: {selectedSpecialties.length}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedSpecialties([])} />
                              </Badge>
                            )}
                            {selectedLocations.length > 0 && (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 gap-1">
                                Locations: {selectedLocations.length}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocations([])} />
                              </Badge>
                            )}
                            {selectedAccreditations.length > 0 && (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 gap-1">
                                Accreditations: {selectedAccreditations.length}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedAccreditations([])} />
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
                  </div>
                </CardContent>
              </Card>

              {/* Search tips */}
              <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm text-gray-600">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-purple-600 mr-1" />
                  <span>Popular: </span>
                  <div className="flex gap-2 ml-1">
                    {["Cardiology", "Orthopedics", "Dental"].map((term) => (
                      <button
                        key={term}
                        className="underline hover:text-purple-600"
                        onClick={() => setSearchQuery(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-purple-600 mr-1" />
                  <span>Top destinations: </span>
                  <div className="flex gap-2 ml-1">
                    {["Lagos", "Abuja", "Ibadan"].map((term) => (
                      <button
                        key={term}
                        className="underline hover:text-purple-600"
                        onClick={() => setSearchQuery(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Search Results Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <ResponsiveContainer>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                {(isLoading || loadError || filteredHospitals.length > 0) && (
                  <p className="text-gray-500">
                    {loadError
                      ? "Unable to load hospitals"
                      : isLoading
                        ? "Loading hospitals…"
                        : `${filteredHospitals.length} ${filteredHospitals.length === 1 ? "result" : "results"} found`}
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
                  variant={hospitalsToCompare.length > 0 ? "default" : "outline"}
                  className={
                    hospitalsToCompare.length > 0
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "border-purple-200 text-purple-600 hover:bg-purple-50"
                  }
                  onClick={() => setShowComparison(true)}
                  disabled={hospitalsToCompare.length === 0}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Compare Hospitals {hospitalsToCompare.length > 0 && `(${hospitalsToCompare.length})`}
                </Button>
              </div>
            </div>

            {loadError && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <X className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Error loading hospitals</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">{loadError}</p>
                <Button
                  variant="outline"
                  onClick={() => fetchHospitals({ page: 1, append: false })}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Retry
                </Button>
              </div>
            )}

            {!loadError && filteredHospitals.length === 0 && !isLoading ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <SearchIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No hospitals found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any hospitals matching your search criteria. Try adjusting your filters or search
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
                {filteredHospitals.slice(0, visibleHospitals).map((hospital) => (
                  <Card key={hospital.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video w-full overflow-hidden relative">
                      <img
                        src={hospital.image || "/placeholder.svg"}
                        alt={`${hospital.name} exterior`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Button
                          variant={hospitalsToCompare.includes(hospital.id) ? "default" : "outline"}
                          size="sm"
                          className={`rounded-md ${
                            hospitalsToCompare.includes(hospital.id)
                              ? "bg-purple-600 text-white hover:bg-purple-700"
                              : "bg-white/90 border-gray-300 hover:bg-white"
                          }`}
                          onClick={() => toggleHospitalComparison(hospital.id)}
                        >
                          <BarChart2 className="h-4 w-4" />
                          <span className="sr-only">
                            {hospitalsToCompare.includes(hospital.id) ? "Selected for comparison" : "Compare"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{hospital.name}</h3>
                        <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-md">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{hospital.rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500">({hospital.reviews})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{hospital.location}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500 line-clamp-3">{hospital.description}</p>
                      </div>
                      {hospital.accreditations && hospital.accreditations.length > 0 && (
                        <div className="mt-3 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div className="flex flex-wrap gap-1">
                            {hospital.accreditations.map((acc) => (
                              <span key={acc} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                                {acc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {hospital.specialties.map((s) => (
                          <span key={s} className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700">
                            {s}
                          </span>
                        ))}
                      </div>
                      {hospital.languages && hospital.languages.includes("English") && (
                        <div className="mt-3 flex items-center gap-1">
                          <Globe className="h-4 w-4 text-purple-600" />
                          <span className="text-xs text-gray-500">English</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" asChild>
                        <Link href={`/hospitals/${hospital.id}`}>View Hospital</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Only show Load More if there's more to show */}
            {!loadError && (nextUrl || visibleHospitals < filteredHospitals.length) && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading…" : "Load More Hospitals"}
                </Button>
              </div>
            )}
          </ResponsiveContainer>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <ResponsiveContainer>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Are You a Hospital or Medical Practitioner in Nigeria?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Join our platform to connect with patients seeking care in Nigeria and expand your reach in the medical
                tourism market.
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

        {/* Modals / Floating Compare */}
        {showComparison && (
          <HospitalComparison
            hospitals={hospitals as any} // keep if HospitalComparison expects a different shape
            selectedHospitals={hospitalsToCompare}
            onClose={() => setShowComparison(false)}
            onRemoveHospital={removeFromComparison}
            onAddHospital={handleAddHospital}
          />
        )}
        {hospitalsToCompare.length > 0 && (
          <div className="fixed bottom-4 right-4 z-40">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg flex items-center gap-2 px-4 py-2"
              onClick={() => setShowComparison(true)}
            >
              <BarChart2 className="h-4 w-4" />
              <span>Compare ({hospitalsToCompare.length})</span>
            </Button>
          </div>
        )}
        {showGate && <SoftGate type="hospital" onClose={() => setShowGate(false)} />}
      </main>
      <SiteFooter />
    </div>
  )
}
