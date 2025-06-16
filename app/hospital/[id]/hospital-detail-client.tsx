"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  DollarSign,
  Globe,
  MapPin,
  MessageSquare,
  Star,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"

// Sample hospital data
const hospitals = [
  {
    id: "1",
    name: "Bangkok International Hospital",
    location: "Bangkok, Thailand",
    specialties: ["Cardiology", "Orthopedics", "Neurology"],
    rating: 4.8,
    reviews: 245,
    image: "/bangkok-hospital-exterior.png",
    description:
      "A leading medical facility in Southeast Asia offering comprehensive healthcare services with state-of-the-art technology and internationally trained physicians.",
    fullDescription:
      "Bangkok International Hospital is a premier healthcare provider in Thailand, offering world-class medical services to both local and international patients. With a team of internationally trained physicians and cutting-edge medical technology, the hospital provides comprehensive healthcare services across various specialties. The hospital's commitment to excellence has earned it numerous accreditations and a reputation for high-quality patient care.",
    accreditations: ["JCI", "ISO 9001", "HA"],
    founded: 1995,
    beds: 580,
    doctors: 200,
    internationalPatients: "15,000+ annually",
    languages: ["English", "Thai", "Arabic", "Chinese", "Japanese"],
  },
  {
    id: "2",
    name: "Indira Gandhi Memorial Hospital",
    location: "New Delhi, India",
    specialties: ["Oncology", "Cardiology", "Fertility"],
    rating: 4.7,
    reviews: 189,
    image: "/indira-gandhi-hospital-exterior.png",
    description:
      "Renowned for its advanced cancer treatments and cardiac care, this hospital provides high-quality healthcare at affordable prices.",
    fullDescription:
      "Indira Gandhi Memorial Hospital is one of India's leading medical institutions, known for its excellence in oncology, cardiology, and fertility treatments. The hospital combines cutting-edge technology with compassionate care to deliver exceptional medical services. With a focus on affordable healthcare, the hospital has become a popular destination for medical tourists seeking quality treatment at competitive prices.",
    accreditations: ["NABH", "ISO 9001", "NABL"],
    founded: 1984,
    beds: 650,
    doctors: 250,
    internationalPatients: "12,000+ annually",
    languages: ["English", "Hindi", "Bengali", "Arabic"],
  },
  {
    id: "3",
    name: "Bumrungrad International Hospital",
    location: "Bangkok, Thailand",
    specialties: ["Plastic Surgery", "Orthopedics", "Gastroenterology"],
    rating: 4.9,
    reviews: 312,
    image: "/modern-hospital-exterior.png",
    description:
      "One of Asia's premier medical facilities, serving over a million patients annually with cutting-edge treatments and multilingual staff.",
    fullDescription:
      "Bumrungrad International Hospital is one of the largest private hospitals in Southeast Asia, treating over a million patients annually from over 190 countries. The hospital is known for its world-class healthcare services, state-of-the-art facilities, and multilingual staff. With a focus on patient-centered care, Bumrungrad has become a global leader in medical tourism, offering a wide range of medical services from routine check-ups to complex surgeries.",
    accreditations: ["JCI", "ISO 9001", "HA", "GHA"],
    founded: 1980,
    beds: 580,
    doctors: 380,
    internationalPatients: "520,000+ annually",
    languages: ["English", "Thai", "Arabic", "Japanese", "Mandarin", "Cantonese", "Bengali"],
  },
]

// Sample treatments data
const treatments = [
  {
    id: "cardio-1",
    name: "Coronary Artery Bypass Grafting (CABG)",
    description:
      "A surgical procedure to improve blood flow to the heart in patients with severe coronary artery disease.",
    duration: "4-5 hours",
    hospitalStay: "5-7 days",
    recovery: "6-12 weeks",
    success: "95-98%",
    priceRange: "$12,000 - $15,000",
    comparisonPrice: "$70,000 - $200,000 in US",
  },
  {
    id: "cardio-2",
    name: "Angioplasty with Stent Placement",
    description: "A minimally invasive procedure to open blocked arteries and place a stent to keep the artery open.",
    duration: "1-2 hours",
    hospitalStay: "1-2 days",
    recovery: "1-2 weeks",
    success: "90-95%",
    priceRange: "$5,000 - $7,000",
    comparisonPrice: "$28,000 - $60,000 in US",
  },
  {
    id: "ortho-1",
    name: "Total Knee Replacement",
    description: "A surgical procedure to resurface damaged knee joints with artificial implants.",
    duration: "1-3 hours",
    hospitalStay: "3-5 days",
    recovery: "6-12 weeks",
    success: "90-95%",
    priceRange: "$8,000 - $12,000",
    comparisonPrice: "$35,000 - $60,000 in US",
  },
]

// Sample doctors data
const doctors = [
  {
    id: "doc-1",
    name: "Dr. Somchai Panyasiri",
    specialty: "Cardiology",
    education: "Harvard Medical School",
    experience: "25+ years",
    languages: ["English", "Thai"],
    image: "/caring-doctor.png",
  },
  {
    id: "doc-2",
    name: "Dr. Priya Sharma",
    specialty: "Orthopedic Surgery",
    education: "Johns Hopkins University",
    experience: "18+ years",
    languages: ["English", "Hindi", "Thai"],
    image: "/female-doctor.png",
  },
  {
    id: "doc-3",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    education: "Stanford University",
    experience: "20+ years",
    languages: ["English", "Mandarin", "Thai"],
    image: "/asian-doctor.png",
  },
]

export function HospitalDetailClient({ hospitalId }: { hospitalId: string }) {
  const [showPricingDetails, setShowPricingDetails] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  // Add debugging on mount
  useEffect(() => {
    console.log("[HospitalDetailPage] Mounted with ID:", hospitalId)
  }, [hospitalId])

  const hospital = hospitals.find((h) => h.id === hospitalId) || hospitals[0]

  const handlePricingClick = () => {
    setShowPricingDetails(true)
  }

  const handleContactClick = () => {
    setShowContactForm(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-6 md:py-8 lg:py-12 bg-white border-b">
          <ResponsiveContainer>
            <div className="flex flex-col space-y-4">
              <div>
                <Link
                  href="/hospitals"
                  className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Hospitals
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12 items-start">
                <div className="space-y-4">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{hospital.name}</h1>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">{hospital.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{hospital.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({hospital.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {hospital.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block bg-primary-50 text-primary px-3 py-1 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700">{hospital.fullDescription || hospital.description}</p>
                </div>
                <div className="rounded-lg overflow-hidden border shadow-sm">
                  <img
                    src={hospital.image || "/placeholder.svg?height=400&width=600&query=hospital"}
                    alt={`${hospital.name} exterior`}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
          <ResponsiveContainer>
            <div className="grid gap-8 md:grid-cols-3 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary-50 rounded-full mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Accreditations</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {hospital.accreditations?.map((accreditation) => (
                        <span
                          key={accreditation}
                          className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700"
                        >
                          {accreditation}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary-50 rounded-full mb-4">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Hospital Stats</h3>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Founded:</span>
                        <span className="text-sm font-medium">{hospital.founded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Beds:</span>
                        <span className="text-sm font-medium">{hospital.beds}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Doctors:</span>
                        <span className="text-sm font-medium">{hospital.doctors}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary-50 rounded-full mb-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">International Patients</h3>
                    <p className="text-sm text-gray-500 mb-2">{hospital.internationalPatients}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {hospital.languages?.map((language) => (
                        <span
                          key={language}
                          className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="treatments" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="doctors">Doctors</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="treatments" className="p-4 border rounded-lg mt-2 bg-white">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Available Treatments</h3>
                    <Button variant="outline" size="sm" className="text-primary border-primary">
                      View All Treatments
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {treatments.map((treatment, index) => (
                      <div key={treatment.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-bold">{treatment.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{treatment.description}</p>
                            <div className="flex flex-wrap gap-4 mt-3">
                              <div>
                                <p className="text-xs text-gray-500">Duration</p>
                                <p className="text-sm font-medium">{treatment.duration}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Hospital Stay</p>
                                <p className="text-sm font-medium">{treatment.hospitalStay}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Recovery</p>
                                <p className="text-sm font-medium">{treatment.recovery}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Success Rate</p>
                                <p className="text-sm font-medium">{treatment.success}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Starting from</p>
                              <p className="text-lg font-bold text-primary">{treatment.priceRange}</p>
                              <p className="text-xs text-gray-500">{treatment.comparisonPrice}</p>
                            </div>
                            <Button size="sm" onClick={handlePricingClick}>
                              View Pricing Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="doctors" className="p-4 border rounded-lg mt-2 bg-white">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Medical Team</h3>
                    <Button variant="outline" size="sm" className="text-primary border-primary">
                      View All Doctors
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doctor) => (
                      <Card key={doctor.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                              <img
                                src={doctor.image || "/placeholder.svg?height=200&width=200&query=doctor"}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="text-lg font-bold">{doctor.name}</h4>
                            <p className="text-primary">{doctor.specialty}</p>
                            <div className="w-full space-y-2 mt-4">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Education:</span>
                                <span className="text-sm font-medium">{doctor.education}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Experience:</span>
                                <span className="text-sm font-medium">{doctor.experience}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Languages:</span>
                                <span className="text-sm font-medium">{doctor.languages.join(", ")}</span>
                              </div>
                            </div>
                            <Button size="sm" className="mt-4">
                              View Profile
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="facilities" className="p-4 border rounded-lg mt-2 bg-white">
                <div className="text-center py-8">
                  <h3 className="text-xl font-bold mb-2">Facilities Information</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Detailed information about the hospital's facilities is available upon request.
                  </p>
                  <Button className="mt-4" onClick={handleContactClick}>
                    Request Facilities Information
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-4 border rounded-lg mt-2 bg-white">
                <div className="text-center py-8">
                  <h3 className="text-xl font-bold mb-2">Patient Reviews</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Detailed patient reviews and testimonials are available upon request.
                  </p>
                  <Button className="mt-4" onClick={handleContactClick}>
                    Request Patient Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-8 md:py-12 lg:py-16 bg-white">
          <ResponsiveContainer>
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">Contact This Hospital</h2>
                <p className="text-gray-500">
                  Get in touch with {hospital.name} to discuss your treatment options, schedule a consultation, or
                  request a personalized quote.
                </p>
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary-50 rounded-full">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Virtual Consultation</h3>
                      <p className="text-sm text-gray-500">
                        Schedule a video call with a specialist to discuss your condition and treatment options.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary-50 rounded-full">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Send Inquiry</h3>
                      <p className="text-sm text-gray-500">
                        Submit your medical records and questions to receive a detailed response from the hospital.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary-50 rounded-full">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Request a Quote</h3>
                      <p className="text-sm text-gray-500">
                        Get a personalized cost estimate for your treatment based on your specific needs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary-700 text-white" onClick={handleContactClick}>
                    Contact Hospital
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 h-full">
                {showContactForm ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Contact Form</h3>
                    <p className="text-gray-500">
                      Fill out the form below and a representative from {hospital.name} will get back to you shortly.
                    </p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows={4}
                          placeholder="Please describe your medical needs and any questions you have."
                        ></textarea>
                      </div>
                      <Button className="w-full">Submit Inquiry</Button>
                    </div>
                  </div>
                ) : (
                  <img
                    src="/hospital-consultation.png"
                    alt="Contact the hospital"
                    className="w-full h-auto rounded-lg"
                  />
                )}
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
          <ResponsiveContainer>
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Similar Hospitals</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Compare other hospitals that offer similar treatments and specialties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals
                .filter((h) => h.id !== hospitalId)
                .slice(0, 3)
                .map((hospital) => (
                  <Card key={hospital.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={hospital.image || "/placeholder.svg?height=300&width=500&query=hospital"}
                        alt={`${hospital.name} exterior`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{hospital.name}</h3>
                        <div className="flex items-center gap-1 bg-primary-50 px-2 py-1 rounded-md">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{hospital.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{hospital.location}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500 line-clamp-2">{hospital.description}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {hospital.specialties.slice(0, 2).map((specialty) => (
                          <span
                            key={specialty}
                            className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700"
                          >
                            {specialty}
                          </span>
                        ))}
                        {hospital.specialties.length > 2 && (
                          <span className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700">
                            +{hospital.specialties.length - 2} more
                          </span>
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button className="w-full" variant="outline" asChild>
                          <Link href={`/hospital/${hospital.id}`}>View Hospital</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary-50">
                Compare Hospitals
              </Button>
            </div>
          </ResponsiveContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
