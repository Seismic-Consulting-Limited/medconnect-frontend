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
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Filter, Globe, Search, Star, User } from "lucide-react"

export default function ScheduleTelemedicinePage() {
  const [date, setDate] = useState<Date>()
  const [specialty, setSpecialty] = useState<string>("")
  const [language, setLanguage] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Mock data for doctors
  const doctors = [
    {
      id: "d1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "Bangkok International Hospital",
      country: "Thailand",
      languages: ["English", "Thai"],
      availableSlots: [
        { date: "2024-05-15", times: ["09:00", "10:30", "14:00", "16:30"] },
        { date: "2024-05-16", times: ["08:30", "11:00", "13:30", "15:00"] },
      ],
      image: "/female-doctor.png",
      rating: 4.9,
      reviewCount: 124,
      consultationFee: 150,
    },
    {
      id: "d2",
      name: "Dr. Raj Patel",
      specialty: "Orthopedics",
      hospital: "Apollo Hospitals",
      country: "India",
      languages: ["English", "Hindi", "Gujarati"],
      availableSlots: [
        { date: "2024-05-15", times: ["08:00", "11:30", "13:00", "15:30"] },
        { date: "2024-05-16", times: ["09:30", "12:00", "14:30", "16:00"] },
      ],
      image: "/male-doctor.png",
      rating: 4.7,
      reviewCount: 98,
      consultationFee: 125,
    },
    {
      id: "d3",
      name: "Dr. Mei Wong",
      specialty: "Neurology",
      hospital: "Bumrungrad International Hospital",
      country: "Thailand",
      languages: ["English", "Thai", "Mandarin"],
      availableSlots: [
        { date: "2024-05-15", times: ["10:00", "12:30", "15:00", "17:30"] },
        { date: "2024-05-16", times: ["09:00", "11:30", "14:00", "16:30"] },
      ],
      image: "/placeholder.svg?key=gf0lm",
      rating: 4.8,
      reviewCount: 112,
      consultationFee: 175,
    },
    {
      id: "d4",
      name: "Dr. James Wilson",
      specialty: "Cardiology",
      hospital: "Gleneagles Hospital",
      country: "Singapore",
      languages: ["English"],
      availableSlots: [
        { date: "2024-05-15", times: ["08:30", "11:00", "14:30", "16:00"] },
        { date: "2024-05-16", times: ["09:00", "12:30", "15:00", "17:30"] },
      ],
      image: "/male-doctor.png",
      rating: 4.6,
      reviewCount: 87,
      consultationFee: 200,
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
              Connect with specialists from around the world from the comfort of your home
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
                          <SelectItem value="Thai">Thai</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Mandarin">Mandarin</SelectItem>
                          <SelectItem value="Gujarati">Gujarati</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date Filter */}
                    <div>
                      <Label>Available Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
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
                      <Label htmlFor="price">Price Range</Label>
                      <Select>
                        <SelectTrigger id="price" className="mt-1">
                          <SelectValue placeholder="Any Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Price</SelectItem>
                          <SelectItem value="under100">Under $100</SelectItem>
                          <SelectItem value="100-150">$100 - $150</SelectItem>
                          <SelectItem value="150-200">$150 - $200</SelectItem>
                          <SelectItem value="over200">Over $200</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">
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
                  <TabsTrigger value="available">Available Today</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Results */}
              <div className="space-y-6">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Doctor Image */}
                            <div className="flex-shrink-0">
                              <div className="w-24 h-24 rounded-full overflow-hidden">
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
                                <div>
                                  <h3 className="text-xl font-bold">{doctor.name}</h3>
                                  <p className="text-gray-600">{doctor.specialty}</p>
                                  <div className="flex items-center mt-1">
                                    <div className="flex items-center text-amber-500">
                                      <Star className="h-4 w-4 fill-current" />
                                      <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                                    </div>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="text-sm text-gray-600">{doctor.reviewCount} reviews</span>
                                  </div>
                                  <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                      <User className="h-4 w-4 mr-1" />
                                      <span>{doctor.hospital}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Globe className="h-4 w-4 mr-1" />
                                      <span>{doctor.country}</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {doctor.languages.map((lang) => (
                                      <Badge key={lang} variant="outline" className="text-xs">
                                        {lang}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                  <p className="text-lg font-bold text-primary">${doctor.consultationFee}</p>
                                  <p className="text-sm text-gray-600">per consultation</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Available Slots */}
                          <div className="mt-6 pt-6 border-t">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium">Available Time Slots</h4>
                              <div className="flex items-center">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-medium mx-2">May 15, 2024</span>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                              {doctor.availableSlots[0].times.map((time) => (
                                <Button key={time} variant="outline" size="sm" className="h-9">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {time}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end mt-6">
                            <Button variant="outline" className="mr-3">
                              View Profile
                            </Button>
                            <Button>Book Appointment</Button>
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
                    <Button
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
