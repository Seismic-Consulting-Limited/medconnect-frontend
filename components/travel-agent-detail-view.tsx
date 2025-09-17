"use client"
import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Globe,
  Calendar,
  Users,
  Award,
  CheckCircle,
  Heart,
  Share2,
  MessageCircle,
  Plane,
  Building2,
  Clock,
  Languages,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import type { TravelAgentUI } from "@/lib/types/travel-agent"

interface TravelAgentDetailViewProps {
  agent: TravelAgentUI
}

export function TravelAgentDetailView({ agent }: TravelAgentDetailViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const images = agent.images && agent.images.length > 0 ? agent.images : [agent.image]

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Header Section */}
        <section className="w-full bg-gradient-to-br from-primary/5 via-white to-primary/10 py-8">
          <ResponsiveContainer>
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="sm" asChild>
                <Link href="/travel-agents">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Travel Agents
                </Link>
              </Button>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={isFavorited ? "text-red-600 border-red-200" : ""}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-red-600" : ""}`} />
                  {isFavorited ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img
                    src={images[activeImageIndex] || "/placeholder.svg"}
                    alt={`${agent.name} - Image ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                          activeImageIndex === index ? "border-primary" : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Agent Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{agent.rating.toFixed(1)}</span>
                      <span className="text-gray-500">({agent.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="h-5 w-5" />
                    <span>{agent.location}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{agent.fullDescription || agent.description}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {agent.yearFounded && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Founded</p>
                        <p className="font-semibold">{agent.yearFounded}</p>
                      </div>
                    </div>
                  )}
                  {agent.yearsOfExperience && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-semibold">{agent.yearsOfExperience} years</p>
                      </div>
                    </div>
                  )}
                  {agent.internationalClients && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">International Clients</p>
                        <p className="font-semibold">{agent.internationalClients}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 text-primary flex items-center justify-center font-bold">$</span>
                    <div>
                      <p className="text-sm text-gray-500">Price Range</p>
                      <p className="font-semibold">{agent.price}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  {agent.phoneNumber1 && (
                    <Button variant="outline" className="flex-1 bg-transparent" asChild>
                      <a href={`tel:${agent.phoneNumber1}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Detailed Information */}
        <section className="w-full py-12 bg-white">
          <ResponsiveContainer>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="destinations">Destinations</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          About {agent.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {agent.fullDescription || agent.description}
                        </p>
                        {agent.registrationNumber && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="h-4 w-4" />
                            <span>Registration: {agent.registrationNumber}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {agent.certifications && agent.certifications.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Certifications & Accreditations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {agent.certifications.map((cert) => (
                              <Badge key={cert} variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {agent.hospitalPartners && agent.hospitalPartners.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            Hospital Partners
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {agent.hospitalPartners.map((partner) => (
                              <div key={partner} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <Building2 className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">{partner}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Facts</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {agent.yearFounded && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Founded</span>
                            <span className="font-semibold">{agent.yearFounded}</span>
                          </div>
                        )}
                        {agent.yearsOfExperience && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Experience</span>
                            <span className="font-semibold">{agent.yearsOfExperience} years</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price Range</span>
                          <span className="font-semibold">{agent.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{agent.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        {agent.internationalClients && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Int'l Clients</span>
                            <span className="font-semibold">{agent.internationalClients}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {agent.languages && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Languages className="h-5 w-5 text-primary" />
                            Languages
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {agent.languages.map((language) => (
                              <Badge key={language} variant="outline">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-primary" />
                      Services Offered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {agent.services && agent.services.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {agent.services.map((service) => (
                          <div key={service} className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="font-medium">{service}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No services information available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="destinations" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Destinations Covered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {agent.destinations && agent.destinations.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {agent.destinations.map((destination) => (
                          <div key={destination} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                            <MapPin className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="font-medium">{destination}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No destination information available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {agent.phoneNumber1 && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">Primary Phone</p>
                            <a href={`tel:${agent.phoneNumber1}`} className="font-semibold hover:text-primary">
                              {agent.phoneNumber1}
                            </a>
                          </div>
                        </div>
                      )}
                      {agent.phoneNumber2 && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">Secondary Phone</p>
                            <a href={`tel:${agent.phoneNumber2}`} className="font-semibold hover:text-primary">
                              {agent.phoneNumber2}
                            </a>
                          </div>
                        </div>
                      )}
                      {agent.websiteUrl && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <a
                              href={agent.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold hover:text-primary"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-semibold">{agent.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Get in Touch</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                        {agent.phoneNumber1 && (
                          <Button variant="outline" className="w-full bg-transparent" asChild>
                            <a href={`tel:${agent.phoneNumber1}`}>
                              <Phone className="h-4 w-4 mr-2" />
                              Call {agent.phoneNumber1}
                            </a>
                          </Button>
                        )}
                        {agent.websiteUrl && (
                          <Button variant="outline" className="w-full bg-transparent" asChild>
                            <a href={agent.websiteUrl} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4 mr-2" />
                              Visit Website
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </ResponsiveContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
