"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Info, Upload } from "lucide-react"

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

// Define the steps for the hospital onboarding process
const steps = [
  "Basic Information",
  "Facilities & Services",
  "Specialties & Treatments",
  "Accreditations",
  "Staff & Doctors",
  "Media & Photos",
  "Pricing & Packages",
  "Review & Submit",
]

export default function HospitalSignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Basic Information
    hospitalName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    yearEstablished: "",
    description: "",

    // Facilities & Services
    totalBeds: "",
    privateRooms: false,
    icu: false,
    emergencyServices: false,
    pharmacy: false,
    laboratory: false,
    imaging: false,
    ambulance: false,
    cafeteria: false,
    wifi: false,
    translation: false,
    internationalDesk: false,

    // Specialties & Treatments
    specialties: [] as string[],
    featuredTreatments: [] as string[],

    // Accreditations
    accreditations: [] as string[],
    certifications: [] as string[],

    // Staff & Doctors
    doctorsCount: "",
    nursesCount: "",
    featuredDoctors: [] as any[],

    // Media & Photos
    logo: null as File | null,
    photos: [] as File[],
    videos: [] as File[],
    virtualTour: "",

    // Pricing & Packages
    currency: "USD",
    paymentMethods: [] as string[],
    insuranceAccepted: false,
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
                Hospital Partner Application
              </h1>
              <p className="text-gray-600 max-w-[800px]">
                Complete the following steps to join MedConnect as a hospital partner. Our team will review your
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

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
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
                  {currentStep === 0 && "Provide basic information about your hospital."}
                  {currentStep === 1 && "Tell us about your facilities and services."}
                  {currentStep === 2 && "List your medical specialties and featured treatments."}
                  {currentStep === 3 && "Share your accreditations and certifications."}
                  {currentStep === 4 && "Provide information about your medical staff."}
                  {currentStep === 5 && "Upload photos and videos of your facility."}
                  {currentStep === 6 && "Share information about your pricing and packages."}
                  {currentStep === 7 && "Review your information and submit your application."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basic Information */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="hospitalName">
                            Hospital Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="hospitalName"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleInputChange}
                            placeholder="Enter hospital name"
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
                            placeholder="e.g., 1985"
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
                            placeholder="contact@hospital.com"
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
                          placeholder="https://www.yourhospital.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Hospital Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Provide a detailed description of your hospital, its history, mission, and what makes it unique."
                          className="min-h-[150px]"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Facilities & Services */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="totalBeds">Total Number of Beds</Label>
                          <Input
                            id="totalBeds"
                            name="totalBeds"
                            type="number"
                            value={formData.totalBeds}
                            onChange={handleInputChange}
                            placeholder="e.g., 250"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Facilities Available</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="privateRooms"
                              checked={formData.privateRooms}
                              onCheckedChange={(checked) => handleCheckboxChange("privateRooms", checked as boolean)}
                            />
                            <Label htmlFor="privateRooms">Private Rooms</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="icu"
                              checked={formData.icu}
                              onCheckedChange={(checked) => handleCheckboxChange("icu", checked as boolean)}
                            />
                            <Label htmlFor="icu">Intensive Care Unit (ICU)</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="emergencyServices"
                              checked={formData.emergencyServices}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("emergencyServices", checked as boolean)
                              }
                            />
                            <Label htmlFor="emergencyServices">Emergency Services</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="pharmacy"
                              checked={formData.pharmacy}
                              onCheckedChange={(checked) => handleCheckboxChange("pharmacy", checked as boolean)}
                            />
                            <Label htmlFor="pharmacy">Pharmacy</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="laboratory"
                              checked={formData.laboratory}
                              onCheckedChange={(checked) => handleCheckboxChange("laboratory", checked as boolean)}
                            />
                            <Label htmlFor="laboratory">Laboratory</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="imaging"
                              checked={formData.imaging}
                              onCheckedChange={(checked) => handleCheckboxChange("imaging", checked as boolean)}
                            />
                            <Label htmlFor="imaging">Imaging Services</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="ambulance"
                              checked={formData.ambulance}
                              onCheckedChange={(checked) => handleCheckboxChange("ambulance", checked as boolean)}
                            />
                            <Label htmlFor="ambulance">Ambulance Services</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="cafeteria"
                              checked={formData.cafeteria}
                              onCheckedChange={(checked) => handleCheckboxChange("cafeteria", checked as boolean)}
                            />
                            <Label htmlFor="cafeteria">Cafeteria</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="wifi"
                              checked={formData.wifi}
                              onCheckedChange={(checked) => handleCheckboxChange("wifi", checked as boolean)}
                            />
                            <Label htmlFor="wifi">Free Wi-Fi</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">International Patient Services</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="translation"
                              checked={formData.translation}
                              onCheckedChange={(checked) => handleCheckboxChange("translation", checked as boolean)}
                            />
                            <Label htmlFor="translation">Translation Services</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="internationalDesk"
                              checked={formData.internationalDesk}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("internationalDesk", checked as boolean)
                              }
                            />
                            <Label htmlFor="internationalDesk">International Patient Desk</Label>
                          </div>
                        </div>
                      </div>

                      {/* Additional services section would go here */}
                    </div>
                  )}

                  {/* Step 3: Specialties & Treatments */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Medical Specialties</h3>
                        <p className="text-sm text-gray-500">
                          Select all medical specialties available at your hospital.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            "Cardiology",
                            "Orthopedics",
                            "Oncology",
                            "Neurology",
                            "Gastroenterology",
                            "Dermatology",
                            "Ophthalmology",
                            "Dentistry",
                            "Plastic Surgery",
                            "Fertility Treatment",
                            "Urology",
                            "Gynecology",
                            "Pediatrics",
                            "Psychiatry",
                            "Endocrinology",
                            "Nephrology",
                            "Pulmonology",
                            "Rheumatology",
                            "Hematology",
                            "Immunology",
                            "Otolaryngology",
                            "Physical Therapy",
                            "Radiology",
                            "Vascular Surgery",
                          ].map((specialty) => (
                            <div key={specialty} className="flex items-center space-x-2">
                              <Checkbox
                                id={`specialty-${specialty}`}
                                checked={formData.specialties.includes(specialty)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      specialties: [...prev.specialties, specialty],
                                    }))
                                  } else {
                                    setFormData((prev) => ({
                                      ...prev,
                                      specialties: prev.specialties.filter((s) => s !== specialty),
                                    }))
                                  }
                                }}
                              />
                              <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Featured treatments section would go here */}
                      {/* This would be a more complex form with the ability to add multiple treatments */}
                    </div>
                  )}

                  {/* Step 4: Accreditations */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Accreditations</h3>
                        <p className="text-sm text-gray-500">Select all accreditations your hospital has received.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            "JCI (Joint Commission International)",
                            "ISO 9001",
                            "NABH (National Accreditation Board for Hospitals)",
                            "GHA (Global Healthcare Accreditation)",
                            "ACHSI (Australian Council on Healthcare Standards International)",
                            "CCHSA (Canadian Council on Health Services Accreditation)",
                            "HAS (Haute Autorité de Santé)",
                            "QHA Trent Accreditation",
                            "MTQUA (Medical Travel Quality Alliance)",
                          ].map((accreditation) => (
                            <div key={accreditation} className="flex items-center space-x-2">
                              <Checkbox
                                id={`accreditation-${accreditation}`}
                                checked={formData.accreditations.includes(accreditation)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      accreditations: [...prev.accreditations, accreditation],
                                    }))
                                  } else {
                                    setFormData((prev) => ({
                                      ...prev,
                                      accreditations: prev.accreditations.filter((a) => a !== accreditation),
                                    }))
                                  }
                                }}
                              />
                              <Label htmlFor={`accreditation-${accreditation}`}>{accreditation}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Certifications section would go here */}
                      {/* File upload for accreditation documents would go here */}
                    </div>
                  )}

                  {/* Step 5: Staff & Doctors */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="doctorsCount">Number of Doctors</Label>
                          <Input
                            id="doctorsCount"
                            name="doctorsCount"
                            type="number"
                            value={formData.doctorsCount}
                            onChange={handleInputChange}
                            placeholder="e.g., 120"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nursesCount">Number of Nurses</Label>
                          <Input
                            id="nursesCount"
                            name="nursesCount"
                            type="number"
                            value={formData.nursesCount}
                            onChange={handleInputChange}
                            placeholder="e.g., 300"
                          />
                        </div>
                      </div>

                      {/* Featured doctors section would go here */}
                      {/* This would be a more complex form with the ability to add multiple doctors */}
                    </div>
                  )}

                  {/* Step 6: Media & Photos */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Hospital Logo</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">
                            Drag and drop your hospital logo here, or click to browse
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
                              const fileInput = document.querySelector('input[type="file"]') as HTMLElement
                              if (fileInput) fileInput.click()
                            }}
                          >
                            Browse Files
                          </Button>
                        </div>
                      </div>

                      {/* Hospital photos section would go here */}
                      {/* Videos section would go here */}
                      {/* Virtual tour link would go here */}
                    </div>
                  )}

                  {/* Step 7: Pricing & Packages */}
                  {currentStep === 6 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Primary Currency</Label>
                        <Select
                          value={formData.currency}
                          onValueChange={(value) => handleSelectChange("currency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">US Dollar (USD)</SelectItem>
                            <SelectItem value="EUR">Euro (EUR)</SelectItem>
                            <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                            <SelectItem value="THB">Thai Baht (THB)</SelectItem>
                            <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                            <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>
                            <SelectItem value="MYR">Malaysian Ringgit (MYR)</SelectItem>
                            <SelectItem value="TRY">Turkish Lira (TRY)</SelectItem>
                            {/* Add more currencies as needed */}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Methods Accepted</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            "Credit Card",
                            "Debit Card",
                            "Bank Transfer",
                            "PayPal",
                            "Cash",
                            "Insurance",
                            "Cryptocurrency",
                          ].map((method) => (
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
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="insuranceAccepted"
                          checked={formData.insuranceAccepted}
                          onCheckedChange={(checked) => handleCheckboxChange("insuranceAccepted", checked as boolean)}
                        />
                        <Label htmlFor="insuranceAccepted">We accept international insurance</Label>
                      </div>

                      {/* Featured packages section would go here */}
                      {/* This would be a more complex form with the ability to add multiple packages */}
                    </div>
                  )}

                  {/* Step 8: Review & Submit */}
                  {currentStep === 7 && (
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
                      {/* This would be a read-only display of all the information entered */}

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
