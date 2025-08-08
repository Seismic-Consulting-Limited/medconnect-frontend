"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Award, Building2, DollarSign, Globe, MapPin, MessageSquare, Star, Video } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"

// Consistent Sample hospital data for Nigeria with original images
const hospitals = [
  {
    id: "1",
    name: "Lagos University Teaching Hospital (LUTH)",
    location: "Lagos, Nigeria",
    specialties: ["Cardiology", "Orthopedics", "Oncology", "Neurology"],
    rating: 4.5,
    reviews: 320,
    image: "/bangkok-hospital-exterior.png", // Original image path
    description:
      "A premier federal teaching hospital in Nigeria, offering comprehensive medical services with a focus on advanced research and patient care.",
    fullDescription:
      "Lagos University Teaching Hospital (LUTH) is a leading tertiary healthcare institution in Nigeria, renowned for its extensive range of medical services, cutting-edge research, and commitment to training future medical professionals. It serves as a major referral center for complex cases across West Africa, providing high-quality care with a dedicated team of specialists.",
    accreditations: ["MDCN", "NHIS", "ISO 9001"],
    founded: 1962,
    beds: 760,
    doctors: 450,
    internationalPatients: "500+ annually (from West Africa & beyond)",
    languages: ["English", "Yoruba", "Hausa", "Igbo"],
  },
  {
    id: "2",
    name: "Reddington Hospital",
    location: "Lagos, Nigeria",
    specialties: ["Cardiac Surgery", "Gastroenterology", "Fertility Treatment", "Cosmetic Surgery"],
    rating: 4.7,
    reviews: 210,
    image: "/indira-gandhi-hospital-exterior.png", // Original image path
    description:
      "A state-of-the-art private hospital in Lagos, known for its advanced cardiac care, minimally invasive surgeries, and personalized patient experience.",
    fullDescription:
      "Reddington Hospital is a multi-specialist private hospital in Lagos, Nigeria, offering world-class healthcare services. It is particularly recognized for its excellence in cardiac surgery, gastroenterology, and fertility treatments, utilizing modern technology and a patient-centric approach to deliver superior outcomes. The hospital caters to both local and international patients seeking premium medical care.",
    accreditations: ["MDCN", "NHIS", "COHSASA"],
    founded: 2006,
    beds: 120,
    doctors: 80,
    internationalPatients: "300+ annually (from West Africa & Europe)",
    languages: ["English", "French", "Igbo"],
  },
  {
    id: "3",
    name: "National Hospital Abuja",
    location: "Abuja, Nigeria",
    specialties: ["Pediatrics", "Obstetrics & Gynecology", "Neurosurgery", "Urology"],
    rating: 4.6,
    reviews: 155,
    image: "/modern-hospital-exterior.png", // Original image path
    description:
      "A leading federal hospital in Nigeria's capital, providing specialized medical services and a strong focus on maternal and child health.",
    fullDescription:
      "The National Hospital Abuja is a prominent federal government hospital in Nigeria, offering a wide array of specialized medical services. It is particularly known for its robust departments in pediatrics, obstetrics & gynecology, and neurosurgery. The hospital is committed to providing high-quality, accessible healthcare to all Nigerians and international visitors, leveraging modern medical practices and a compassionate approach.",
    accreditations: ["MDCN", "NHIS", "NMA"],
    founded: 1999,
    beds: 200,
    doctors: 150,
    internationalPatients: "200+ annually (from West Africa)",
    languages: ["English", "Hausa", "Yoruba", "French"],
  },
]

// Sample treatments data - Adjusted for Nigerian context
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
    priceRange: "₦2,500,000 - ₦4,000,000", // ~ $3,000 - $5,000 USD
    comparisonPrice: "($70,000 - $200,000 in US)",
  },
  {
    id: "cardio-2",
    name: "Angioplasty with Stent Placement",
    description: "A minimally invasive procedure to open blocked arteries and place a stent to keep the artery open.",
    duration: "1-2 hours",
    hospitalStay: "1-2 days",
    recovery: "1-2 weeks",
    success: "90-95%",
    priceRange: "₦1,500,000 - ₦2,500,000", // ~ $1,800 - $3,000 USD
    comparisonPrice: "($28,000 - $60,000 in US)",
  },
  {
    id: "ortho-1",
    name: "Total Knee Replacement",
    description: "A surgical procedure to resurface damaged knee joints with artificial implants.",
    duration: "1-3 hours",
    hospitalStay: "3-5 days",
    recovery: "6-12 weeks",
    success: "90-95%",
    priceRange: "₦3,000,000 - ₦5,000,000", // ~ $3,700 - $6,200 USD
    comparisonPrice: "($35,000 - $60,000 in US)",
  },
]

// Sample doctors data - Updated for Nigeria with original images
const doctors = [
  {
    id: "doc-1",
    name: "Dr. Ngozi Okoro",
    specialty: "Cardiology",
    education: "University of Ibadan, Nigeria",
    experience: "20+ years",
    languages: ["English", "Igbo"],
    image: "/caring-doctor.png", // Original image path
  },
  {
    id: "doc-2",
    name: "Dr. Adebayo Oladele",
    specialty: "Orthopedic Surgery",
    education: "University of Lagos, Nigeria",
    experience: "15+ years",
    languages: ["English", "Yoruba"],
    image: "/female-doctor.png", // Original image path
  },
  {
    id: "doc-3",
    name: "Dr. Fatima Abubakar",
    specialty: "Neurology",
    education: "Ahmadu Bello University, Nigeria",
    experience: "18+ years",
    languages: ["English", "Hausa"],
    image: "/asian-doctor.png", // Original image path
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
                  Back to Hospitals in Nigeria
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
                              <div>
                                <span className="text-sm text-gray-500">Experience:</span>
                                <span className="text-sm font-medium">{doctor.experience}</span>
                              </div>
                              <div>
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
                  request a personalized quote for medical tourism in Nigeria.
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
                          placeholder="+234 (XXX) XXX-XXXX"
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
              <h2 className="text-2xl md:text-3xl font-bold">Similar Hospitals in Nigeria</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Compare other hospitals in Nigeria that offer similar treatments and specialties for international
                patients.
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
                Compare Hospitals in Nigeria
              </Button>
            </div>
          </ResponsiveContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
