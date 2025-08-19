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

type Step = 1 | 2 | 3 | 4 | 5

export default function HospitalSignupPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)

  // Step 1: Basic Information
  const [hospitalName, setHospitalName] = useState("")
  const [yearEstablished, setYearEstablished] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [hospitalDescription, setHospitalDescription] = useState("")

  // Step 2: Specialties & Treatments
  const [totalBeds, setTotalBeds] = useState("")
  const [facilities, setFacilities] = useState<string[]>([])
  const [internationalServices, setInternationalServices] = useState<string[]>([])

  // Step 3: Staff & Doctors
  const [numberOfDoctors, setNumberOfDoctors] = useState("")
  const [numberOfNurses, setNumberOfNurses] = useState("")

  // Step 4: Password
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
    { number: 1, title: "Basic Information", description: "Provide basic information about your hospital" },
    {
      number: 2,
      title: "Specialties & Treatments",
      description: "List your medical specialties and featured treatments",
    },
    { number: 3, title: "Number of Staff & Doctors", description: "Provide number of medical staff" },
    { number: 4, title: "Create Password", description: "Set a secure password to protect your account" },
  ]

  const facilityOptions = [
    "Private Rooms",
    "Intensive Care Unit (ICU)",
    "Emergency Services",
    "Pharmacy",
    "Laboratory",
    "Imaging Services",
    "Ambulance Services",
    "Cafeteria",
    "Free Wifi",
  ]

  const internationalServiceOptions = ["Imaging Services", "International Patient Desk"]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i)

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setFacilities([...facilities, facility])
    } else {
      setFacilities(facilities.filter((f) => f !== facility))
    }
  }

  const handleInternationalServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setInternationalServices([...internationalServices, service])
    } else {
      setInternationalServices(internationalServices.filter((s) => s !== service))
    }
  }

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        return !!(
          hospitalName &&
          yearEstablished &&
          address &&
          city &&
          country &&
          phone &&
          email &&
          hospitalDescription
        )
      case 2:
        return !!(totalBeds && facilities.length > 0)
      case 3:
        return !!(numberOfDoctors && numberOfNurses)
      case 4:
        return !!(password && confirmPassword && password === confirmPassword && agreeToTerms)
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setError("")
      if (currentStep < 4) {
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
      await signup(hospitalName, email, password, "hospital", {
        hospitalName,
        yearEstablished,
        address,
        city,
        country,
        postalCode,
        phone,
        website,
        hospitalDescription,
        totalBeds,
        facilities,
        internationalServices,
        numberOfDoctors,
        numberOfNurses,
      })
      setCurrentStep(5) // Success step
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStepProgress = () => {
    return Math.round((currentStep / 4) * 100)
  }

  if (currentStep === 5) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6 pb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground mb-2">Account Created Successfully!</h1>
            <p className="text-muted-foreground mb-4 text-sm">
              Your hospital partner application has been submitted. We'll review your application and respond within 3-5
              business days.
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
            <div className="hidden lg:block w-full lg:w-1/3 bg-primary p-3 sm:p-4 text-white">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-base sm:text-lg font-bold">MedKonnect</span>
              </div>

              <div className="mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold mb-1">Hospital Partner Application</h2>
                <p className="text-white text-xs">
                  Join MedConnect as a hospital partner to connect with international patients in Nigeria. We'll review
                  your application and respond within 3-5 business days.
                </p>
              </div>

              <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex items-start gap-3 min-w-max lg:min-w-0 p-2 rounded-lg transition-all duration-200 border ${
                      currentStep === step.number
                        ? "bg-white/25 backdrop-blur-sm border-white/40" // Increased white overlay from bg-white/10 to bg-white/25 and border opacity for more prominent effect
                        : currentStep > step.number
                          ? "bg-white/5 backdrop-blur-sm border-white/20"
                          : "bg-transparent hover:bg-white/5 border-transparent"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                        currentStep === step.number
                          ? "bg-white text-primary shadow-sm"
                          : currentStep > step.number
                            ? "bg-white text-primary shadow-sm"
                            : "bg-white/20 text-white/60"
                      }`}
                    >
                      {currentStep > step.number ? <Check className="w-3 h-3" /> : step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-sm leading-tight ${
                          currentStep === step.number
                            ? "text-white"
                            : currentStep > step.number
                              ? "text-white"
                              : "text-white/70"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs mt-1 leading-relaxed hidden lg:block ${
                          currentStep >= step.number ? "text-white/70" : "text-white/50"
                        }`}
                      >
                        {step.description}
                      </p>
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
                  <span className="text-xs text-muted-foreground">Step {currentStep} of 4</span>
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
                        Please provide basic information about your hospital.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="hospitalName" className="text-xs">
                          Hospital Name *
                        </Label>
                        <Input
                          id="hospitalName"
                          placeholder="Enter your hospital name"
                          value={hospitalName}
                          onChange={(e) => setHospitalName(e.target.value)}
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
                        placeholder="Enter your hospital address"
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
                          placeholder="www.yourhospital.com"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="hospitalDescription" className="text-xs">
                        Hospital Description *
                      </Label>
                      <Textarea
                        id="hospitalDescription"
                        placeholder="Please provide a detail description of your hospital, its history, mission, and what makes it unique for international patients seeking care in NIGERIA."
                        value={hospitalDescription}
                        onChange={(e) => setHospitalDescription(e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Specialties & Treatments</h2>
                      <p className="text-muted-foreground text-sm">Select your medical specialties & treatments</p>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="totalBeds" className="text-xs">
                        Total Number of Beds
                      </Label>
                      <Input
                        id="totalBeds"
                        placeholder=""
                        value={totalBeds}
                        onChange={(e) => setTotalBeds(e.target.value)}
                        className="h-8 max-w-md text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Facilities Available</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {facilityOptions.map((facility) => (
                          <div key={facility} className="flex items-center space-x-2">
                            <Checkbox
                              id={facility}
                              checked={facilities.includes(facility)}
                              onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                            />
                            <Label htmlFor={facility} className="text-xs">
                              {facility}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">International Patient Services</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {internationalServiceOptions.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={internationalServices.includes(service)}
                              onCheckedChange={(checked) =>
                                handleInternationalServiceChange(service, checked as boolean)
                              }
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                            />
                            <Label htmlFor={service} className="text-xs">
                              {service}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Number of Staff & Doctors</h2>
                      <p className="text-muted-foreground text-sm">Provide number of medical staff</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                      <div className="space-y-1">
                        <Label htmlFor="numberOfDoctors" className="text-xs">
                          Number of Doctors *
                        </Label>
                        <Input
                          id="numberOfDoctors"
                          placeholder="0"
                          value={numberOfDoctors}
                          onChange={(e) => setNumberOfDoctors(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="numberOfNurses" className="text-xs">
                          Number of Nurses *
                        </Label>
                        <Input
                          id="numberOfNurses"
                          placeholder="0"
                          value={numberOfNurses}
                          onChange={(e) => setNumberOfNurses(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
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
                  ) : currentStep === 4 ? (
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
