"use client"
import { useState } from "react"
import { Eye, EyeOff, Loader2, Check, ArrowLeft, ArrowRight, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"

type Step = 1 | 2 | 3 | 4

export default function TravelAgentSignupPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)

  // Step 1: Basic Information
  const [agencyName, setAgencyName] = useState("")
  const [yearEstablished, setYearEstablished] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [agencyDescription, setAgencyDescription] = useState("")

  // Step 2: Services & Destinations
  const [destinations, setDestinations] = useState<string[]>([])
  const [services, setServices] = useState<string[]>([])
  const [hospitalPartners, setHospitalPartners] = useState("")

  // Step 3: Password
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { signup } = useAuth()
  const router = useRouter()

  const steps = [
    { number: 1, title: "Basic Information", description: "Provide basic information about your travel agency" },
    {
      number: 2,
      title: "Services & Destinations",
      description: "Tell us about your services and destinations in Nigeria",
    },
    { number: 3, title: "Create Password", description: "Set a secure password to protect your account" },
  ]

  const nigerianCities = [
    "Abuja",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ]

  const travelServices = [
    "Flight Booking",
    "Hotel Reservations",
    "Car Rentals",
    "Travel Insurance",
    "Tour Packages",
    "Visa Assistance",
    "Airport Transfers",
    "Cruise Bookings",
    "Adventure Travel",
    "Corporate Travel Management",
    "Event Planning Services",
    "Medical Travel Coordination",
    "Emergency Assistance",
    "Cultural Experiences",
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i)

  const handleDestinationChange = (destination: string, checked: boolean) => {
    if (checked) {
      setDestinations([...destinations, destination])
    } else {
      setDestinations(destinations.filter((d) => d !== destination))
    }
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setServices([...services, service])
    } else {
      setServices(services.filter((s) => s !== service))
    }
  }

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        return !!(agencyName && yearEstablished && address && city && country && phone && email && agencyDescription)
      case 2:
        return !!(destinations.length > 0 && services.length > 0)
      case 3:
        return !!(password && confirmPassword && password === confirmPassword && agreeToTerms)
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setError("")
      if (currentStep < 3) {
        setCurrentStep((currentStep + 1) as Step)
      } else {
        handleSubmit()
      }
    } else {
      setError("Please fill in all required fields")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
      setError("")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      await signup(agencyName, email, password, "travel-agent", {
        agencyName,
        yearEstablished,
        address,
        city,
        country,
        postalCode,
        phone,
        website,
        agencyDescription,
        destinations,
        services,
        hospitalPartners,
      })
      setCurrentStep(4) // Success step
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStepProgress = () => {
    return Math.round((currentStep / 3) * 100)
  }

  if (currentStep === 4) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6 pb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">Account Created Successfully!</h1>
            <p className="text-muted-foreground mb-4 text-sm">
              Your travel agent partner application has been submitted. We'll review your application and respond within
              3-5 business days.
            </p>
            <Button
              onClick={() => router.push("/user/auth/login")}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-6xl">
        <Card className="overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[420px]">
            <div className="w-full lg:w-1/3 bg-primary p-3 sm:p-4 text-white hidden lg:block">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-base sm:text-lg font-bold">MedKonnect</span>
              </div>

              <div className="mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold mb-1">Travel Agent Partner Application</h2>
                <p className="text-white text-xs">
                  Join MedConnect as a travel agent partner to support medical tourism to Nigeria. We'll review your
                  application and respond within 3-5 business days.
                </p>
              </div>

              <div className="space-y-1">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      currentStep === step.number
                        ? "bg-white/25 backdrop-blur-sm border border-white/40"
                        : currentStep > step.number
                          ? "bg-white/10 border border-white/20"
                          : "bg-transparent border border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                          currentStep === step.number
                            ? "bg-white text-primary"
                            : currentStep > step.number
                              ? "bg-white text-primary"
                              : "bg-gray-500 text-gray-300"
                        }`}
                      >
                        {currentStep > step.number ? <Check className="w-3 h-3" /> : step.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-medium text-xs leading-tight ${
                            currentStep === step.number
                              ? "text-white"
                              : currentStep > step.number
                                ? "text-white"
                                : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-xs mt-0.5 leading-tight ${currentStep >= step.number ? "text-white/60" : "text-gray-500"}`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/20 hidden lg:block">
                <button className="text-white/80 text-xs hover:text-white">Cancel</button>
                <div className="mt-2">
                  <span className="text-white/60 text-xs">Need help? </span>
                  <button className="text-white text-xs hover:underline">Contact Support</button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-3 sm:p-4">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Step {currentStep} of 3</span>
                  <span className="text-xs text-muted-foreground">{getStepProgress()}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${getStepProgress()}%` }}
                  />
                </div>
              </div>

              {error && (
                <div className="p-2 text-xs bg-destructive/10 text-destructive rounded-lg border border-destructive/20 mb-3">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                {currentStep === 1 && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Basic Information</h2>
                      <p className="text-muted-foreground text-sm">
                        Please provide basic information about your travel agency.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="agencyName" className="text-xs">
                          Agency Name *
                        </Label>
                        <Input
                          id="agencyName"
                          placeholder="Enter your agency name"
                          value={agencyName}
                          onChange={(e) => setAgencyName(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="yearEstablished" className="text-xs">
                          Year Established *
                        </Label>
                        <Select value={yearEstablished} onValueChange={setYearEstablished}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Select Year" className="text-muted-foreground" />
                          </SelectTrigger>
                          <SelectContent className="max-h-48">
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="address" className="text-xs">
                        Address *
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your agency address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="min-h-[50px] text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="city" className="text-xs">
                          City *
                        </Label>
                        <Input
                          id="city"
                          placeholder="Enter your city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="country" className="text-xs">
                          Select Country *
                        </Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Select Country" className="text-muted-foreground" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nigeria">Nigeria</SelectItem>
                            <SelectItem value="ghana">Ghana</SelectItem>
                            <SelectItem value="kenya">Kenya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="postalCode" className="text-xs">
                          Postal Code
                        </Label>
                        <Input
                          id="postalCode"
                          placeholder="Enter postal code"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="phone" className="text-xs">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+234 Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-xs">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="website" className="text-xs">
                          Website
                        </Label>
                        <Input
                          id="website"
                          placeholder="www.youragency.com"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="agencyDescription" className="text-xs">
                        Agency Description *
                      </Label>
                      <Textarea
                        id="agencyDescription"
                        placeholder="Please provide a detailed description of your agency, its history, mission, and what makes it unique for international medical travelers seeking care in Nigeria."
                        value={agencyDescription}
                        onChange={(e) => setAgencyDescription(e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Services & Destinations</h2>
                      <p className="text-muted-foreground text-sm">
                        Tell us about your services and destinations in Nigeria
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Destinations in Nigeria</Label>
                      <p className="text-xs text-muted-foreground">
                        Select all Nigerian cities where you provide travel services for medical tourists.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {nigerianCities.map((city) => (
                          <div key={city} className="flex items-center space-x-2">
                            <Checkbox
                              id={city}
                              checked={destinations.includes(city)}
                              onCheckedChange={(checked) => handleDestinationChange(city, checked as boolean)}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                            />
                            <Label htmlFor={city} className="text-xs">
                              {city}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Services Offered</Label>
                      <p className="text-xs text-muted-foreground">
                        Select all services you provide to medical tourists traveling to Nigeria.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {travelServices.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={services.includes(service)}
                              onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                            />
                            <Label htmlFor={service} className="text-xs">
                              {service}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="hospitalPartners" className="text-xs">
                        Hospital Partnerships
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        List any Nigerian hospitals you frequently partner with or have established relationships.
                      </p>
                      <Textarea
                        id="hospitalPartners"
                        placeholder="e.g., Lagos Advance Medical Centre, Abuja Specialist Hospital. Separate with a comma (,)"
                        value={hospitalPartners}
                        onChange={(e) => setHospitalPartners(e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Create Password</h2>
                      <p className="text-muted-foreground text-sm">Set a secure password to protect your account</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                      <div className="space-y-1">
                        <Label htmlFor="password" className="text-xs">
                          Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-8 pr-8 text-sm"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="confirmPassword" className="text-xs">
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-8 pr-8 text-sm"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-primary">
                      <p>
                        Passwords must be <span className="font-medium">case-sensitive</span>, include a mix of{" "}
                        <span className="font-medium">uppercase</span> and{" "}
                        <span className="font-medium">lowercase letters</span>, and be at{" "}
                        <span className="font-medium">least 6 characters long</span>.
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                      />
                      <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline font-medium">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline font-medium">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center justify-center gap-2 bg-transparent h-8 text-sm order-2 sm:order-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 h-8 text-sm order-1 sm:order-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Creating Account...
                    </>
                  ) : currentStep === 3 ? (
                    "Create Account"
                  ) : (
                    <>
                      <span>Next</span>
                      <span className="text-white/70 hidden sm:inline">| {steps[currentStep]?.title}</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
