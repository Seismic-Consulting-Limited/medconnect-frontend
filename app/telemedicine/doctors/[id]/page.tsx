"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, Star, User, MapPin, Clock, GraduationCap, Languages, Award, CalendarIcon } from "lucide-react"

export default function DoctorProfilePage() {
  const params = useParams()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")

  // Mock doctor data - in real app, fetch based on params.id
  const doctor = {
    id: params.id,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "Lagos University Teaching Hospital",
    hospitalLocation: "Lagos, Nigeria",
    country: "Nigeria",
    languages: ["English", "Yoruba"],
    experience: "15 years",
    education: "MD, University of Lagos; Fellowship in Interventional Cardiology",
    image: "/placeholder.svg?height=200&width=200&text=SJ",
    rating: 4.9,
    reviewCount: 124,
    consultationFee: 25000,
    about:
      "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 2,000 successful procedures. Dr. Johnson is committed to providing personalized care and staying updated with the latest medical advancements.",
    certifications: [
      "Board Certified Cardiologist",
      "Fellow of American College of Cardiology",
      "Advanced Cardiac Life Support (ACLS)",
    ],
    availableTimeSlots: {
      "2025-08-20": ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM"],
      "2025-08-21": ["09:00 AM", "11:00 AM", "01:00 PM", "04:00 PM"],
      "2025-08-22": ["10:00 AM", "02:30 PM", "04:00 PM"],
      "2025-08-23": ["09:30 AM", "11:30 AM", "03:00 PM"],
      "2025-08-24": ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM", "04:30 PM"],
    } as Record<string, string[]>,
  }

  // Mock doctor data - in real app, fetch based on params.id
  // const doctor = {
  //   id: params.id,
  //   name: "Dr. Sarah Johnson",
  //   specialty: "Cardiology",
  //   hospital: "Lagos University Teaching Hospital",
  //   hospitalLocation: "Lagos, Nigeria",
  //   country: "Nigeria",
  //   languages: ["English", "Yoruba"],
  //   experience: "15 years",
  //   education: "MD, University of Lagos; Fellowship in Interventional Cardiology",
  //   image: "/placeholder.svg?height=200&width=200&text=SJ",
  //   rating: 4.9,
  //   reviewCount: 124,
  //   consultationFee: 25000,
  //   about:
  //     "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in interventional cardiology and has performed over 2,000 successful procedures. Dr. Johnson is committed to providing personalized care and staying updated with the latest medical advancements.",
  //   certifications: [
  //     "Board Certified Cardiologist",
  //     "Fellow of American College of Cardiology",
  //     "Advanced Cardiac Life Support (ACLS)",
  //   ],
  // }

  const getAvailableSlots = (date: Date): string[] => {
    const dateKey = date.toISOString().split("T")[0]
    return doctor.availableTimeSlots?.[dateKey] || []
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-primary-50 py-8">
          <ResponsiveContainer>
            <div className="flex items-center">
              <Link href="/telemedicine/schedule" className="text-primary hover:underline flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Doctors
              </Link>
            </div>
          </ResponsiveContainer>
        </section>

        <ResponsiveContainer className="py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Doctor Profile - Takes more space */}
              <div className="lg:col-span-3">
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-grow text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                            <p className="text-primary font-medium text-lg mb-3">{doctor.specialty}</p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 mx-auto sm:mx-0 w-fit">
                            Available Today
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center justify-center sm:justify-start text-gray-600">
                            <User className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="font-medium">{doctor.hospital}</span>
                          </div>
                          <div className="flex items-center justify-center sm:justify-start text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{doctor.hospitalLocation}</span>
                          </div>
                          <div className="flex items-center justify-center sm:justify-start text-gray-600">
                            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{doctor.experience} experience</span>
                          </div>
                          <div className="flex items-center justify-center sm:justify-start text-gray-600">
                            <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{doctor.education}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start mt-4">
                          <div className="flex items-center text-amber-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="ml-1 font-medium">{doctor.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-gray-600">{doctor.reviewCount} reviews</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                          {doctor.languages.map((lang) => (
                            <Badge key={lang} variant="outline">
                              <Languages className="h-3 w-3 mr-1" />
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="about" className="mt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="certifications">Certifications</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>About Dr. {doctor.name.split(" ")[1]}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="certifications" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Certifications & Qualifications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {doctor.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center">
                              <Award className="h-5 w-5 text-primary mr-3" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Patient Reviews</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">Reviews will be displayed here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Booking Sidebar - Much wider with better calendar space */}
              <div className="lg:col-span-2">
                <Card className="sticky top-8">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-lg">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Book Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <p className="text-2xl font-bold text-primary">₦{doctor.consultationFee.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">per consultation</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Select Date</h3>
                      <div className="w-full">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="w-full mx-auto border rounded-lg p-4"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                    </div>

                    {selectedDate && (
                      <div>
                        <h3 className="font-medium mb-4">Available Time Slots</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {getAvailableSlots(selectedDate).map((slot: string) => (
                            <Button
                              key={slot}
                              variant={selectedTimeSlot === slot ? "default" : "outline"}
                              size="sm"
                              className={selectedTimeSlot === slot ? "bg-primary text-white" : ""}
                              onClick={() => setSelectedTimeSlot(slot)}
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full bg-primary text-white hover:bg-primary/90 mt-6"
                      disabled={!selectedDate || !selectedTimeSlot}
                    >
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </main>

      <SiteFooter />
    </div>
  )
}
