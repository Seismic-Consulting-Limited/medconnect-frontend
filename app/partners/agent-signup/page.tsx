"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Info, Upload } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"

// Define the steps for the travel agent onboarding process
const steps = [
  "Basic Information",
  "Services & Destinations",
  "Languages & Expertise",
  "Media & Photos",
  "Pricing & Packages",
  "Review & Submit",
]

export default function AgentSignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Basic Information
    agencyName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    yearEstablished: "",
    description: "",

    // Services & Destinations
    destinations: [] as string[],
    services: [] as string[],
    hospitalPartnerships: [] as string[],

    // Languages & Expertise
    languages: [] as string[],
    specializations: [] as string[],
    yearsInMedicalTourism: "",

    // Media & Photos
    logo: null as File | null,
    photos: [] as File[],
    testimonials: [] as any[],

    // Pricing & Packages
    pricingModel: "",
    paymentMethods: [] as string[],
    featuredPackages: [] as any[],

    // Terms & Agreements
    termsAgreed: false,
    dataPrivacyAgreed: false,
    marketingAgreed: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    // Redirect to success page or dashboard
    window.location.href = "/partners/signup-success"
  }

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50">
        <section className="py-8 md:py-12">
          <ResponsiveContainer>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                Travel Agent Partner Application
              </h1>
              <p className="text-gray-600 max-w-[800px]">
                Complete the following steps to join MedConnect as a travel agent partner. Our team will review your
                application and get back to you within 3-5 business days.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`text-xs text-center p-2 rounded-md cursor-pointer transition-colors ${
                      index === currentStep
                        ? "bg-primary text-white font-medium"
                        : index < currentStep
                          ? "bg-primary-100 text-primary font-medium"
                          : "bg-gray-100 text-gray-500"
                    }`}
                    onClick={() => index <= currentStep && setCurrentStep(index)}
                  >
                    {index < currentStep && <CheckCircle className="h-3 w-3 inline mr-1" />}
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-2 border-gray-100 shadow-md">
              <CardHeader>
                <CardTitle>{steps[currentStep]}</CardTitle>
                <CardDescription>
                  {currentStep === 0 && "Provide basic information about your travel agency."}
                  {currentStep === 1 && "Tell us about your services and destinations."}
                  {currentStep === 2 && "Share your language capabilities and expertise."}
                  {currentStep === 3 && "Upload photos and media for your agency profile."}
                  {currentStep === 4 && "Share information about your pricing and packages."}
                  {currentStep === 5 && "Review your information and submit your application."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basic Information */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="agencyName">
                            Agency Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="agencyName"
                            name="agencyName"
                            value={formData.agencyName}
                            onChange={handleInputChange}
                            placeholder="Enter agency name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="yearEstablished">Year Established</Label>
                          <Input
                            id="yearEstablished"
                            name="yearEstablished"
                            value={formData.yearEstablished}
                            onChange={handleInputChange}
                            placeholder="e.g., 2010"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Street address"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">
                            Country <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => handleSelectChange("country", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Thailand">Thailand</SelectItem>
                              <SelectItem value="India">India</SelectItem>
                              <SelectItem value="Singapore">Singapore</SelectItem>
                              <SelectItem value="Malaysia">Malaysia</SelectItem>
                              <SelectItem value="Turkey">Turkey</SelectItem>
                              <SelectItem value="Mexico">Mexico</SelectItem>
                              <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                              <SelectItem value="Brazil">Brazil</SelectItem>
                              <SelectItem value="South Korea">South Korea</SelectItem>
                              <SelectItem value="UAE">UAE</SelectItem>
                              {/* Add more countries as needed */}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="Postal code"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Include country code"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="contact@agency.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://www.youragency.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Agency Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Provide a detailed description of your agency, its history, mission, and what makes it unique for medical travelers."
                          className="min-h-[150px]"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Services & Destinations */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Destinations</h3>
                        <p className="text-sm text-gray-500">
                          Select all destinations where you provide travel services for medical tourists.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            "Thailand",
                            "India",
                            "Singapore",
                            "Malaysia",
                            "Turkey",
                            "Mexico",
                            "Costa Rica",
                            "Brazil",
                            "South Korea",
                            "UAE",
                            "Germany",
                            "Spain",
                            "Hungary",
                            "Poland",
                            "Czech Republic",
                            "Israel",
                          ].map((destination) => (
                            <div key={destination} className="flex items-center space-x-2">
                              <Checkbox
                                id={`destination-${destination}`}
                                checked={formData.destinations.includes(destination)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      destinations: [...prev.destinations, destination],
                                    }))
                                  } else {
                                    setFormData((prev) => ({
                                      ...prev,
                                      destinations: prev.destinations.filter((d) => d !== destination),
                                    }))
                                  }
                                }}
                              />
                              <Label htmlFor={`destination-${destination}`}>{destination}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Services Offered</h3>
                        <p className="text-sm text-gray-500">Select all services you provide to medical tourists.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            "Airport Transfers",
                            "Accommodation Booking",
                            "Hospital Appointments",
                            "Translation Services",
                            "Medical Visa Assistance",
                            "Insurance Coordination",
                            "Local Transportation",
                            "Sightseeing Tours",
                            "Post-Treatment Care",
                            "Family Accommodation",
                            "24/7 Support",
                            "Concierge Services",
                          ].map((service) => (
                            <div key={service} className="flex items-center space-x-2">
                              <Checkbox
                                id={`service-${service}`}
                                checked={formData.services.includes(service)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      services: [...prev.services, service],
                                    }))
                                  } else {
                                    setFormData((prev) => ({
                                      ...prev,
                                      services: prev.services.filter((s) => s !== service),
                                    }))
                                  }
                                }}
                              />
                              <Label htmlFor={`service-${service}`}>{service}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Languages & Expertise */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Languages Spoken</h3>
                        <p className="text-sm text-gray-500">Select all languages your staff can speak fluently.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            "English",
                            "Spanish",
                            "French",
                            "German",
                            "Arabic",
                            "Russian",
                            "Chinese (Mandarin)",
                            "Japanese",
                            "Korean",
                            "Hindi",
                            "Thai",
                            "Turkish",
                            "Portuguese",
                            "Italian",
                            "Hebrew",
                            "Dutch",
                          ].map((language) => (
                            <div key={language} className="flex items-center space-x-2">
                              <Checkbox
                                id={`language-${language}`}
                                checked={formData.languages.includes(language)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      languages: [...prev.languages, language],
                                    }))
                                  } else {
                                    setFormData((prev) => ({
                                      ...prev,
                                      languages: prev.languages.filter((l) => l !== language),
                                    }))
                                  }
                                }}
                              />
                              <Label htmlFor={`language-${language}`}>{language}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Medical Tourism Specializations</h3>
                        <p className="text-sm text-gray-500">Select the medical tourism areas you specialize in.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            "Dental Tourism",
                            "Cosmetic Surgery",
                            "Orthopedic Procedures",
                            "Cardiac Care",
                            "Fertility Treatments",
                            "Weight Loss Surgery",
                            "Cancer Treatment",
                            "Eye Surgery",
                            "General Surgery",
                            "Wellness & Spa",
                            "Alternative Medicine",
                            "Medical Check-ups",
                          ].map((specialization) => (
                            <div key={specialization} className="flex items-center space-x-2">
                              <Checkbox
                                id={`specialization-${specialization}`}
                                checked={formData.specializations.includes(specialization)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      specializations: [...prev.specializations, specialization],
                                    }))
                                  } else {
                                    setFormData((prev) => ({
                                      ...prev,
                                      specializations: prev.specializations.filter((s) => s !== specialization),
                                    }))
                                  }
                                }}
                              />
                              <Label htmlFor={`specialization-${specialization}`}>{specialization}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="yearsInMedicalTourism">Years in Medical Tourism</Label>
                        <Input
                          id="yearsInMedicalTourism"
                          name="yearsInMedicalTourism"
                          type="number"
                          value={formData.yearsInMedicalTourism}
                          onChange={handleInputChange}
                          placeholder="e.g., 5"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Media & Photos */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Agency Logo</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">
                            Drag and drop your agency logo here, or click to browse
                          </p>
                          <p className="text-xs text-gray-400">PNG, JPG or SVG, max 2MB</p>
                          <Input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFormData((prev) => ({
                                  ...prev,
                                  logo: e.target.files![0],
                                }))
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
                              if (fileInput) fileInput.click();
                            }}
                          >
                            Browse Files
                          </Button>
                        </div>
                      </div>

                      {/* Agency photos section would go here */}
                      {/* Testimonials section would go here */}
                    </div>
                  )}

                  {/* Step 5: Pricing & Packages */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="pricingModel">Pricing Model</Label>
                        <Select
                          value={formData.pricingModel}
                          onValueChange={(value) => handleSelectChange("pricingModel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select pricing model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed Fee</SelectItem>
                            <SelectItem value="percentage">Percentage of Total Cost</SelectItem>
                            <SelectItem value="hybrid">Hybrid (Fixed + Percentage)</SelectItem>
                            <SelectItem value="package">Package-Based</SelectItem>
                            <SelectItem value="custom">Custom Pricing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Methods Accepted</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {["Credit Card", "Debit Card", "Bank Transfer", "PayPal", "Cash", "Cryptocurrency"].map(
                            (method) => (
                              <div key={method} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`payment-${method}`}
                                  checked={formData.paymentMethods.includes(method)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setFormData((prev) => ({
                                        ...prev,
                                        paymentMethods: [...prev.paymentMethods, method],
                                      }))
                                    } else {
                                      setFormData((prev) => ({
                                        ...prev,
                                        paymentMethods: prev.paymentMethods.filter((m) => m !== method),
                                      }))
                                    }
                                  }}
                                />
                                <Label htmlFor={`payment-${method}`}>{method}</Label>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Featured packages section would go here */}
                    </div>
                  )}

                  {/* Step 6: Review & Submit */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex items-start gap-3">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium text-primary">Almost Done!</h3>
                          <p className="text-sm text-gray-600">
                            Please review all your information before submitting. Once submitted, our team will review
                            your application and get back to you within 3-5 business days.
                          </p>
                        </div>
                      </div>

                      {/* Summary of all entered information would go here */}

                      <div className="space-y-4 border-t pt-6">
                        <h3 className="text-lg font-medium">Terms and Agreements</h3>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="termsAgreed"
                            checked={formData.termsAgreed}
                            onCheckedChange={(checked) => handleCheckboxChange("termsAgreed", checked as boolean)}
                            required
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="termsAgreed"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the{" "}
                              <Link href="/terms" className="text-primary hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                              </Link>
                            </Label>
                            <p className="text-sm text-muted-foreground">You must agree to our terms to continue.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="dataPrivacyAgreed"
                            checked={formData.dataPrivacyAgreed}
                            onCheckedChange={(checked) => handleCheckboxChange("dataPrivacyAgreed", checked as boolean)}
                            required
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="dataPrivacyAgreed"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I consent to MedConnect processing my data as described in the{" "}
                              <Link href="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                              </Link>
                            </Label>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="marketingAgreed"
                            checked={formData.marketingAgreed}
                            onCheckedChange={(checked) => handleCheckboxChange("marketingAgreed", checked as boolean)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="marketingAgreed"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I would like to receive marketing communications from MedConnect
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              We'll send you updates about our services, new features, and promotional offers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary-700"
                    onClick={handleSubmit}
                    disabled={!formData.termsAgreed || !formData.dataPrivacyAgreed}
                  >
                    Submit Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </ResponsiveContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
