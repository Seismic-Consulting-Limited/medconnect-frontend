"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, Filter, Search, Star, User, MapPin, Clock } from "lucide-react"

export default function ScheduleTelemedicinePage() {
  const [date, setDate] = useState<Date>()
  const [specialty, setSpecialty] = useState<string>("")
  const [language, setLanguage] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const doctors = [
    {
      id: "d1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "Lagos University Teaching Hospital",
      hospitalLocation: "Lagos, Nigeria",
      country: "Nigeria",
      languages: ["English", "Yoruba"],
      experience: "15 years",
      education: "MD, University of Lagos; Fellowship in Interventional Cardiology",
      image: "/placeholder.svg?height=96&width=96&text=SJ",
      rating: 4.9,
      reviewCount: 124,
      consultationFee: 25000,
      nextAvailable: "Today, 2:00 PM",
      isAvailableToday: true,
    },
    {
      id: "d2",
      name: "Dr. Raj Patel",
      specialty: "Orthopedics",
      hospital: "University College Hospital",
      hospitalLocation: "Ibadan, Nigeria",
      country: "Nigeria",
      languages: ["English", "Hindi"],
      experience: "12 years",
      education: "MBBS, University of Ibadan; MS Orthopedics",
      image: "/placeholder.svg?height=96&width=96&text=RP",
      rating: 4.7,
      reviewCount: 98,
      consultationFee: 20000,
      nextAvailable: "Tomorrow, 9:00 AM",
      isAvailableToday: false,
    },
    {
      id: "d3",
      name: "Dr. Mei Wong",
      specialty: "Neurology",
      hospital: "National Hospital Abuja",
      hospitalLocation: "Abuja, Nigeria",
      country: "Nigeria",
      languages: ["English", "Mandarin"],
      experience: "18 years",
      education: "MD, University of Abuja; Fellowship in Neurology",
      image: "/placeholder.svg?height=96&width=96&text=MW",
      rating: 4.8,
      reviewCount: 112,
      consultationFee: 30000,
      nextAvailable: "Today, 4:30 PM",
      isAvailableToday: true,
    },
    {
      id: "d4",
      name: "Dr. James Wilson",
      specialty: "Cardiology",
      hospital: "Federal Medical Centre",
      hospitalLocation: "Kano, Nigeria",
      country: "Nigeria",
      languages: ["English", "Hausa"],
      experience: "20 years",
      education: "MBBS, Ahmadu Bello University; Fellowship in Cardiology",
      image: "/placeholder.svg?height=96&width=96&text=JW",
      rating: 4.6,
      reviewCount: 87,
      consultationFee: 22000,
      nextAvailable: "Today, 6:00 PM",
      isAvailableToday: true,
    },
  ]

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialty = specialty === "" || doctor.specialty === specialty
    const matchesLanguage = language === "" || doctor.languages.includes(language)

    return matchesSearch && matchesSpecialty && matchesLanguage
  })

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-primary-50 py-8">
          <ResponsiveContainer>
            <div className="flex items-center">
              <Link href="/telemedicine" className="text-primary hover:underline flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Telemedicine
              </Link>
            </div>
            <h1 className="text-3xl font-bold mt-4">Schedule a Telemedicine Consultation</h1>
            <p className="text-gray-600 mt-2">
              Connect with specialists from leading Nigerian hospitals from the comfort of your home
            </p>
          </ResponsiveContainer>
        </section>

        <ResponsiveContainer className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg">Filters</h2>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      Clear All
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Specialty Filter */}
                    <div>
                      <Label htmlFor="specialty">Specialty</Label>
                      <Select value={specialty} onValueChange={setSpecialty}>
                        <SelectTrigger id="specialty" className="mt-1">
                          <SelectValue placeholder="All Specialties" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Specialties</SelectItem>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="Neurology">Neurology</SelectItem>
                          <SelectItem value="Oncology">Oncology</SelectItem>
                          <SelectItem value="Dermatology">Dermatology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Language Filter */}
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language" className="mt-1">
                          <SelectValue placeholder="All Languages" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Languages</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Yoruba">Yoruba</SelectItem>
                          <SelectItem value="Hausa">Hausa</SelectItem>
                          <SelectItem value="Igbo">Igbo</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Mandarin">Mandarin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date Filter */}
                    <div>
                      <Label>Available Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal mt-1 bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <Label htmlFor="price">Price Range (₦)</Label>
                      <Select>
                        <SelectTrigger id="price" className="mt-1">
                          <SelectValue placeholder="Any Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Price</SelectItem>
                          <SelectItem value="under15000">Under ₦15,000</SelectItem>
                          <SelectItem value="15000-25000">₦15,000 - ₦25,000</SelectItem>
                          <SelectItem value="25000-35000">₦25,000 - ₦35,000</SelectItem>
                          <SelectItem value="over35000">Over ₦35,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Updated Apply Filters button */}
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      <Filter className="mr-2 h-4 w-4" />
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search by doctor name, specialty, or hospital..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Doctors</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Results */}
              <div className="space-y-6">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Doctor Image */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                              <img
                                src={doctor.image || "/placeholder.svg"}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Doctor Info */}
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                              <div className="flex-grow">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                                    <p className="text-primary font-medium">{doctor.specialty}</p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {doctor.isAvailableToday && (
                                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        Available Today
                                      </Badge>
                                    )}
                                    <Button className="bg-primary text-white hover:bg-primary/90" asChild>
                                      <Link href={`/telemedicine/doctors/${doctor.id}`}>View Profile</Link>
                                    </Button>
                                  </div>
                                </div>

                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center text-gray-600">
                                    <User className="h-4 w-4 mr-2" />
                                    <span className="font-medium">{doctor.hospital}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{doctor.hospitalLocation}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>{doctor.experience} experience</span>
                                  </div>
                                </div>

                                <div className="flex items-center mt-3">
                                  <div className="flex items-center text-amber-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                                  </div>
                                  <span className="mx-2 text-gray-300">•</span>
                                  <span className="text-sm text-gray-600">{doctor.reviewCount} reviews</span>
                                </div>

                                <div className="flex flex-wrap gap-1 mt-3">
                                  {doctor.languages.map((lang) => (
                                    <Badge key={lang} variant="outline" className="text-xs">
                                      {lang}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="mt-4">
                                  <p className="text-sm text-gray-600">
                                    Next available:{" "}
                                    <span className="font-medium text-gray-900">{doctor.nextAvailable}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No doctors found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                    {/* Updated Clear All Filters button */}
                    <Button
                      className="bg-primary text-white hover:bg-primary/90"
                      onClick={() => {
                        setSearchQuery("")
                        setSpecialty("")
                        setLanguage("")
                        setDate(undefined)
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </main>

      <SiteFooter />
    </div>
  )
}
