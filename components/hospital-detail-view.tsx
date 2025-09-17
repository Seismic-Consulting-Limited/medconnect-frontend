// components/hospital-detail-view.tsx
"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { HospitalUI } from "@/lib/types/hospital"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ResponsiveContainer } from "./responsive-container"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"

const ArrowLeft = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const MapPin = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

const Award = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

const Building2 = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

const Globe = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2h1.064M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

type Props = {
  hospital: HospitalUI
  similarHospitals?: HospitalUI[]
}

export default function HospitalDetailView({ hospital, similarHospitals = [] }: Props) {
  const [showContactForm, setShowContactForm] = useState(false)

  const locationLabel = useMemo(() => {
    const parts = [hospital.city, hospital.state, hospital.country].filter(Boolean)
    return parts.join(", ")
  }, [hospital.city, hospital.state, hospital.country])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero / header */}
        <section className="w-full py-6 md:py-8 lg:py-12 bg-white border-b">
          <ResponsiveContainer>
            <div className="flex flex-col space-y-4">
              <div>
                <Link
                  href="/hospitals"
                  className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  <ArrowLeft />
                  <span className="ml-1">Back to Hospitals</span>
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12 items-start">
                <div className="space-y-4">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{hospital.name}</h1>

                  {locationLabel && (
                    <div className="flex items-center gap-1">
                      <MapPin />
                      <span className="text-gray-500">{locationLabel}</span>
                    </div>
                  )}

                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 font-medium">
                      {typeof hospital.rating === "number" ? hospital.rating?.toFixed(1) : "—"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({typeof hospital.reviews === "number" ? hospital.reviews : 0} reviews)
                  </span>

                  {hospital.specialties?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {hospital.specialties.map((s, index) => (
                        <span
                          key={`specialty-${index}-${s}`}
                          className="inline-block bg-primary-50 text-primary px-3 py-1 text-sm rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-700">{hospital.fullDescription || hospital.description}</p>
                </div>

                <div className="rounded-lg overflow-hidden border shadow-sm">
                  <img
                    src={hospital.image || "/placeholder.svg"}
                    alt={`${hospital.name} exterior`}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Facts + Tabs */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
          <ResponsiveContainer>
            <div className="grid gap-8 md:grid-cols-3 mb-8">
              {/* Accreditations */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary-50 rounded-full mb-4">
                      <Award />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Accreditations</h3>
                    {hospital.accreditations?.length ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {hospital.accreditations.map((acc, index) => (
                          <span
                            key={`accreditation-${index}-${acc}`}
                            className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700"
                          >
                            {acc}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No accreditations listed.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary-50 rounded-full mb-4">
                      <Building2 />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Hospital Stats</h3>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Founded:</span>
                        <span className="text-sm font-medium">{hospital.founded ?? "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Beds:</span>
                        <span className="text-sm font-medium">{hospital.beds ?? "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Doctors:</span>
                        <span className="text-sm font-medium">{hospital.doctors ?? "—"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* International */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary-50 rounded-full mb-4">
                      <Globe />
                    </div>
                    <h3 className="text-lg font-bold mb-2">International Patients</h3>
                    <p className="text-sm text-gray-500 mb-2">{hospital.internationalPatients ?? "—"}</p>
                    {hospital.languages?.length ? (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {hospital.languages.map((lng, index) => (
                          <span
                            key={`language-${index}-${lng}`}
                            className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700"
                          >
                            {lng}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Languages not listed.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="treatments" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="treatments" className="p-4 border rounded-lg mt-2 bg-white">
                {hospital.treatments?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {hospital.treatments.map((t, index) => (
                      <span
                        key={`treatment-${index}-${t}`}
                        className="bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No treatments listed by the hospital.</p>
                )}
              </TabsContent>

              <TabsContent value="facilities" className="p-4 border rounded-lg mt-2 bg-white">
                {hospital.facilities?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {hospital.facilities.map((f, index) => (
                      <span
                        key={`facility-${index}-${f}`}
                        className="bg-gray-100 px-2 py-1 text-xs rounded-md text-gray-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No facilities listed by the hospital.</p>
                )}
              </TabsContent>

              <TabsContent value="gallery" className="p-4 border rounded-lg mt-2 bg-white">
                {hospital.images?.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {hospital.images.map((src, index) => (
                      <img
                        key={`image-${index}-${src}`}
                        src={src || "/placeholder.svg"}
                        alt="Hospital"
                        className="w-full h-40 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No images provided by the hospital.</p>
                )}
              </TabsContent>
            </Tabs>
          </ResponsiveContainer>
        </section>

        {/* Similar hospitals */}
        {similarHospitals.length > 0 && (
          <section className="w-full py-8 md:py-12 lg:py-16 bg-white">
            <ResponsiveContainer>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Similar Hospitals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarHospitals.map((h) => (
                  <div key={h.id} className="border rounded-lg overflow-hidden">
                    <img src={h.image || "/placeholder.svg"} alt={h.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{h.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm">{typeof h.rating === "number" ? h.rating.toFixed(1) : "—"}</span>
                        </div>
                      </div>
                      {h.city || h.state || h.country ? (
                        <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                          <MapPin />
                          <span>{[h.city, h.state, h.country].filter(Boolean).join(", ")}</span>
                        </div>
                      ) : null}
                      <div className="mt-3">
                        <Button variant="outline" asChild className="w-full bg-transparent">
                          <Link href={`/hospitals/${h.id}`}>View Hospital</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ResponsiveContainer>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
