"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { Eye, EyeOff, Loader2, Check, ArrowLeft, ArrowRight, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// API utils & endpoints
import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"

type Step = 1 | 2 | 3 | 4 | 5

type Country = { id: number | string; name: string }
type StateRec = { id: number | string; name: string }
type Facility = { id: number; name: string }

type FieldErrors = {
  hospitalName?: string
  yearEstablished?: string
  address?: string
  city?: string
  postalCode?: string
  phone1?: string
  phone2?: string
  email?: string
  website?: string
  registrationNumber?: string
  hospitalDescription?: string
  countryId?: string
  stateId?: string
  totalBeds?: string
  numberOfDoctors?: string
  numberOfNurses?: string
  password?: string
  confirmPassword?: string
  agreeToTerms?: string
}

export default function HospitalSignupPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const router = useRouter()

  // Step 1: Basic Information
  const [hospitalName, setHospitalName] = useState("")
  const [yearEstablished, setYearEstablished] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phone1, setPhone1] = useState("")
  const [phone2, setPhone2] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [hospitalDescription, setHospitalDescription] = useState("")

  // Country / State
  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<StateRec[]>([])
  const [countryId, setCountryId] = useState<string>("")
  const [stateId, setStateId] = useState<string>("")

  // Step 2: Facilities & Beds
  const [availableFacilities, setAvailableFacilities] = useState<Facility[]>([]) // fetched from backend
  const [facilityIds, setFacilityIds] = useState<number[]>([]) // -> payload.facilities
  const [totalBeds, setTotalBeds] = useState("") // -> payload.stats.number_of_beds

  // Step 3: Staff & Doctors
  const [numberOfDoctors, setNumberOfDoctors] = useState("") // -> payload.stats.number_of_doctors
  const [numberOfNurses, setNumberOfNurses] = useState("") // -> payload.stats.number_of_nurses

  // Step 4: Password
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false) // -> payload.terms_of_service_agreement_checked

  // UI
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [loadingCountries, setLoadingCountries] = useState(false)
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingFacilities, setLoadingFacilities] = useState(false)

  const steps = [
    { number: 1, title: "Basic Information", description: "Provide basic information about your hospital" },
    { number: 2, title: "Facilities & Capacity", description: "Choose facilities and provide bed count" },
    { number: 3, title: "Staffing", description: "Provide number of doctors and nurses" },
    { number: 4, title: "Create Password", description: "Set a secure password to protect your account" },
  ]

  const currentYear = new Date().getFullYear()
  const years = useMemo(() => Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i), [currentYear])

  // ---- Fetch Countries (once)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoadingCountries(true)
        const res = await apiRequest<{ data: Country[] }>(API_ENDPOINTS.META.COUNTRIES, { method: HTTP_METHODS.GET })
        if (mounted) setCountries(res.data || [])
      } catch (e) {
        console.error("Failed to load countries", e)
        if (mounted) setCountries([])
      } finally {
        if (mounted) setLoadingCountries(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  // ---- Fetch States when country changes
  const statesAbortRef = useRef<AbortController | null>(null)
  useEffect(() => {
    setStates([])
    setStateId("")
    if (!countryId) return

    statesAbortRef.current?.abort()
    const controller = new AbortController()
    statesAbortRef.current = controller
    ;(async () => {
      try {
        setLoadingStates(true)
        const res = await apiRequest<{ data: StateRec[] }>(API_ENDPOINTS.META.STATES(countryId), {
          method: HTTP_METHODS.GET,
        })
        if (!controller.signal.aborted) setStates(res.data || [])
      } catch (e) {
        if (!controller.signal.aborted) {
          console.error("Failed to load states", e)
          setStates([])
        }
      } finally {
        if (!controller.signal.aborted) setLoadingStates(false)
      }
    })()

    return () => controller.abort()
  }, [countryId])

  // ---- Fetch Facilities (once)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoadingFacilities(true)
        const res = await apiRequest<{ data: Facility[] }>(API_ENDPOINTS.META.FACILITIES, { method: HTTP_METHODS.GET })
        if (mounted) setAvailableFacilities(res.data || [])
      } catch (e) {
        console.error("Failed to load facilities", e)
        if (mounted) setAvailableFacilities([])
      } finally {
        if (mounted) setLoadingFacilities(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const toggleFacility = (id: number, checked: boolean) => {
    setFacilityIds((prev) => (checked ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)))
  }

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) return "Email address is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return null
  }

  const validatePhone = (phone: string, isRequired = false): string | null => {
    if (!phone.trim()) return isRequired ? "Phone number is required" : null
    const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number (e.g., +2348012345678)"
    return null
  }

  const validatePostalCode = (postalCode: string): string | null => {
    if (!postalCode.trim()) return null // Optional field
    const postalRegex = /^\d+$/
    if (!postalRegex.test(postalCode)) return "Postal code should contain numbers only"
    return null
  }

  const validateWebsite = (website: string): string | null => {
    if (!website.trim()) return null // Optional field
    const urlRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
    if (!urlRegex.test(website.replace(/^(https?:\/\/)?(www\.)?/, ""))) {
      return "Please enter a valid website URL (e.g., yourhospital.com)"
    }
    return null
  }

  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters long"
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number"
    return null
  }

  const validateNumber = (value: string, fieldName: string, min = 0): string | null => {
    if (!value.trim()) return `${fieldName} is required`
    const num = Number(value)
    if (isNaN(num)) return `${fieldName} must be a valid number`
    if (num < min) return `${fieldName} must be ${min} or greater`
    return null
  }

  const validateStep = (step: Step): boolean => {
    const errors: FieldErrors = {}

    switch (step) {
      case 1:
        // Hospital name validation
        if (!hospitalName.trim()) {
          errors.hospitalName = "Hospital name is required"
        } else if (hospitalName.trim().length < 5) {
          errors.hospitalName = "Hospital name cannot be less than 5 characters"
        }

        // Year validation
        if (!yearEstablished) {
          errors.yearEstablished = "Year founded is required"
        }

        // Address validation
        if (!address.trim()) {
          errors.address = "Street address is required"
        } else if (address.trim().length < 10) {
          errors.address = "Please provide a complete street address"
        }

        // Country and state validation
        if (!countryId) {
          errors.countryId = "Please select a country"
        }
        if (!stateId) {
          errors.stateId = "Please select a state"
        }

        // Phone validation
        const phone1Error = validatePhone(phone1, true)
        if (phone1Error) errors.phone1 = phone1Error

        const phone2Error = validatePhone(phone2, false)
        if (phone2Error) errors.phone2 = phone2Error

        // Email validation
        const emailError = validateEmail(email)
        if (emailError) errors.email = emailError

        // Postal code validation
        const postalError = validatePostalCode(postalCode)
        if (postalError) errors.postalCode = postalError

        // Website validation
        const websiteError = validateWebsite(website)
        if (websiteError) errors.website = websiteError

        if (!registrationNumber.trim()) {
          errors.registrationNumber = "Registration number is required"
        }

        // Description validation
        if (!hospitalDescription.trim()) {
          errors.hospitalDescription = "Hospital description is required"
        } else if (hospitalDescription.trim().length < 20) {
          errors.hospitalDescription = "Please provide a more detailed description (at least 20 characters)"
        }

        break

      case 2:
        // Total beds validation
        const bedsError = validateNumber(totalBeds, "Total number of beds", 1)
        if (bedsError) errors.totalBeds = bedsError
        break

      case 3:
        // Doctors validation
        const doctorsError = validateNumber(numberOfDoctors, "Number of doctors", 1)
        if (doctorsError) errors.numberOfDoctors = doctorsError

        // Nurses validation
        const nursesError = validateNumber(numberOfNurses, "Number of nurses", 1)
        if (nursesError) errors.numberOfNurses = nursesError
        break

      case 4:
        // Password validation
        const passwordError = validatePassword(password)
        if (passwordError) errors.password = passwordError

        // Confirm password validation
        if (!confirmPassword) {
          errors.confirmPassword = "Please confirm your password"
        } else if (password !== confirmPassword) {
          errors.confirmPassword = "Passwords do not match"
        }

        // Terms validation
        if (!agreeToTerms) {
          errors.agreeToTerms = "Please accept the Terms of Service and Privacy Policy"
        }
        break

      default:
        return false
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isCurrentStepValid = (step: Step): boolean => {
    switch (step) {
      case 1:
        return !!(
          hospitalName.trim() &&
          hospitalName.trim().length >= 5 &&
          yearEstablished &&
          address.trim() &&
          address.trim().length >= 10 &&
          countryId &&
          stateId &&
          phone1.trim() &&
          validatePhone(phone1, true) === null &&
          email.trim() &&
          validateEmail(email) === null &&
          postalCode.trim() &&
          validatePostalCode(postalCode) === null &&
          registrationNumber.trim() &&
          hospitalDescription.trim() &&
          hospitalDescription.trim().length >= 20 &&
          (!website.trim() || validateWebsite(website) === null) &&
          (!phone2.trim() || validatePhone(phone2, false) === null)
        )
      case 2:
        return !!(totalBeds && validateNumber(totalBeds, "Total number of beds", 1) === null)
      case 3:
        return !!(
          numberOfDoctors &&
          validateNumber(numberOfDoctors, "Number of doctors", 1) === null &&
          numberOfNurses &&
          validateNumber(numberOfNurses, "Number of nurses", 1) === null
        )
      case 4:
        return !!(
          password &&
          validatePassword(password) === null &&
          confirmPassword &&
          password === confirmPassword &&
          agreeToTerms
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setError("")
      setFieldErrors({})
      if (currentStep < 4) setCurrentStep((currentStep + 1) as Step)
      else handleSubmit()
    } else {
      setError("Please fix the errors below before continuing")
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
      let processedWebsite = website.trim()
      if (processedWebsite) {
        if (!processedWebsite.startsWith("http://") && !processedWebsite.startsWith("https://")) {
          if (!processedWebsite.startsWith("www.")) {
            processedWebsite = `https://www.${processedWebsite}`
          } else {
            processedWebsite = `https://${processedWebsite}`
          }
        } else if (!processedWebsite.includes("www.")) {
          processedWebsite = processedWebsite.replace(/^https?:\/\//, "https://www.")
        }
      }

      const payload = {
        email: email.trim(),
        password,
        terms_of_service_agreement_checked: agreeToTerms,
        name: hospitalName.trim(),
        year_founded: String(yearEstablished),
        phone_number_1: phone1.trim(),
        phone_number_2: phone2.trim() || undefined,
        website_url: processedWebsite || undefined,
        registration_number: registrationNumber.trim() || undefined,
        description: hospitalDescription.trim(),
        location: {
          country_id: Number(countryId),
          state_id: Number(stateId),
          address_1: address.trim(),
          postal_code: postalCode.trim() || undefined,
        },
        facilities: facilityIds, // number[]
        stats: {
          number_of_beds: Number(totalBeds) || 0,
          number_of_doctors: Number(numberOfDoctors) || 0,
          number_of_nurses: Number(numberOfNurses) || 0,
        },
      } as const

      await apiRequest(API_ENDPOINTS.AUTH.SIGNUP_HOSPITAL, {
        method: HTTP_METHODS.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // Save pending email for verify screen if needed
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pending_email", email.toLowerCase())
      }

      // Redirect to verify page
      router.replace("/user/auth/verify")
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStepProgress = () => Math.round((currentStep / 4) * 100)

  const countryPlaceholder = loadingCountries ? "Loading countries…" : "Select Country"
  const statePlaceholder = countryId
    ? loadingStates
      ? "Loading states…"
      : states.length
        ? "Select State"
        : "No states found"
    : "Select Country first"

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
            {/* Sidebar */}
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
                        ? "bg-white/25 backdrop-blur-sm border-white/40"
                        : currentStep > step.number
                          ? "bg-white/5 backdrop-blur-sm border-white/20"
                          : "bg-transparent hover:bg-white/5 border-transparent"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                        currentStep >= step.number ? "bg-white text-primary shadow-sm" : "bg-white/20 text-white/60"
                      }`}
                    >
                      {currentStep > step.number ? <Check className="w-3 h-3" /> : step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-sm leading-tight ${currentStep >= step.number ? "text-white" : "text-white/70"}`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs mt-1 leading-relaxed hidden lg:block ${currentStep >= step.number ? "text-white/70" : "text-white/50"}`}
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

            {/* Form content */}
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

                    {/* Hospital Name + Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="hospitalName" className="text-sm font-semibold">
                          Hospital Name *
                        </Label>
                        <Input
                          id="hospitalName"
                          placeholder="Enter your hospital name"
                          value={hospitalName}
                          onChange={(e) => setHospitalName(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.hospitalName ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.hospitalName && (
                          <p className="text-xs text-destructive">{fieldErrors.hospitalName}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="yearEstablished" className="text-sm font-semibold">
                          Year Founded *
                        </Label>
                        <Select value={yearEstablished} onValueChange={setYearEstablished}>
                          <SelectTrigger
                            className={`h-8 text-sm ${fieldErrors.yearEstablished ? "border-destructive" : ""}`}
                          >
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent className="max-h-48">
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldErrors.yearEstablished && (
                          <p className="text-xs text-destructive">{fieldErrors.yearEstablished}</p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                      <Label htmlFor="address" className="text-sm font-semibold">
                        Street Address *
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="123 Health Avenue"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`min-h-[50px] text-sm ${fieldErrors.address ? "border-destructive" : ""}`}
                      />
                      {fieldErrors.address && <p className="text-xs text-destructive">{fieldErrors.address}</p>}
                    </div>

                    {/* City + Country + State + Postal */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="city" className="text-sm font-semibold">
                          City
                        </Label>
                        <Input
                          id="city"
                          placeholder="Ikeja"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-semibold">Country *</Label>
                        <Select
                          value={countryId}
                          onValueChange={(val) => {
                            setCountryId(val)
                            setStateId("")
                          }}
                          disabled={loadingCountries}
                        >
                          <SelectTrigger className={`h-8 text-sm ${fieldErrors.countryId ? "border-destructive" : ""}`}>
                            <SelectValue placeholder={countryPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.length === 0 ? (
                              <SelectItem value="__none" disabled>
                                {loadingCountries ? "Loading…" : "No countries found"}
                              </SelectItem>
                            ) : (
                              countries.map((c) => (
                                <SelectItem key={c.id} value={String(c.id)}>
                                  {c.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        {fieldErrors.countryId && <p className="text-xs text-destructive">{fieldErrors.countryId}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-semibold">State *</Label>
                        <Select
                          value={stateId}
                          onValueChange={setStateId}
                          disabled={!countryId || loadingStates || states.length === 0}
                        >
                          <SelectTrigger className={`h-8 text-sm ${fieldErrors.stateId ? "border-destructive" : ""}`}>
                            <SelectValue placeholder={statePlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {states.length === 0 ? (
                              <SelectItem value="__none" disabled>
                                {countryId ? (loadingStates ? "Loading…" : "No states found") : "Select Country first"}
                              </SelectItem>
                            ) : (
                              states.map((s) => (
                                <SelectItem key={s.id} value={String(s.id)}>
                                  {s.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        {fieldErrors.stateId && <p className="text-xs text-destructive">{fieldErrors.stateId}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="postalCode" className="text-sm font-semibold">
                          Postal Code
                        </Label>
                        <Input
                          id="postalCode"
                          placeholder="100271"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.postalCode ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.postalCode && <p className="text-xs text-destructive">{fieldErrors.postalCode}</p>}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="phone1" className="text-sm font-semibold">
                          Primary Phone *
                        </Label>
                        <Input
                          id="phone1"
                          placeholder="+2348012345678"
                          value={phone1}
                          onChange={(e) => setPhone1(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.phone1 ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.phone1 && <p className="text-xs text-destructive">{fieldErrors.phone1}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="phone2" className="text-sm font-semibold">
                          Secondary Phone
                        </Label>
                        <Input
                          id="phone2"
                          placeholder="+2348098765432"
                          value={phone2}
                          onChange={(e) => setPhone2(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.phone2 ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.phone2 && <p className="text-xs text-destructive">{fieldErrors.phone2}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-sm font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@yourhospital.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.email ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="website" className="text-sm font-semibold">
                          Website
                        </Label>
                        <Input
                          id="website"
                          placeholder="yourhospital.com"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.website ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.website && <p className="text-xs text-destructive">{fieldErrors.website}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="regno" className="text-sm font-semibold">
                          Registration Number *
                        </Label>
                        <Input
                          id="regno"
                          placeholder="RC-xxxxx"
                          value={registrationNumber}
                          onChange={(e) => setRegistrationNumber(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.registrationNumber ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.registrationNumber && (
                          <p className="text-xs text-destructive">{fieldErrors.registrationNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <Label htmlFor="hospitalDescription" className="text-sm font-semibold">
                        Hospital Description *
                      </Label>
                      <Textarea
                        id="hospitalDescription"
                        placeholder="A multi-specialty hospital providing world-class healthcare services."
                        value={hospitalDescription}
                        onChange={(e) => setHospitalDescription(e.target.value)}
                        className={`min-h-[60px] text-sm ${fieldErrors.hospitalDescription ? "border-destructive" : ""}`}
                      />
                      {fieldErrors.hospitalDescription && (
                        <p className="text-xs text-destructive">{fieldErrors.hospitalDescription}</p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Facilities & Capacity</h2>
                      <p className="text-muted-foreground text-sm">
                        Select your available facilities and bed capacity.
                      </p>
                    </div>

                    <div className="space-y-1 max-w-md">
                      <Label htmlFor="totalBeds" className="text-sm font-semibold">
                        Total Number of Beds *
                      </Label>
                      <Input
                        id="totalBeds"
                        placeholder="Enter number of beds"
                        value={totalBeds}
                        onChange={(e) => setTotalBeds(e.target.value)}
                        className={`h-8 text-sm ${fieldErrors.totalBeds ? "border-destructive" : ""}`}
                      />
                      {fieldErrors.totalBeds && <p className="text-xs text-destructive">{fieldErrors.totalBeds}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Facilities available</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {loadingFacilities && availableFacilities.length === 0 ? (
                          <div className="text-xs text-muted-foreground">Loading facilities…</div>
                        ) : availableFacilities.length === 0 ? (
                          <div className="text-xs text-muted-foreground">No facilities available</div>
                        ) : (
                          availableFacilities.map((f) => (
                            <div key={f.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`fac-${f.id}`}
                                checked={facilityIds.includes(f.id)}
                                onCheckedChange={(checked) => toggleFacility(f.id, checked as boolean)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                              />
                              <Label htmlFor={`fac-${f.id}`} className="text-xs">
                                {f.name}
                              </Label>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Staffing</h2>
                      <p className="text-muted-foreground text-sm">Provide numbers of key medical staff.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                      <div className="space-y-1">
                        <Label htmlFor="numberOfDoctors" className="text-sm font-semibold">
                          Number of Doctors *
                        </Label>
                        <Input
                          id="numberOfDoctors"
                          placeholder="Enter number"
                          value={numberOfDoctors}
                          onChange={(e) => setNumberOfDoctors(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.numberOfDoctors ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.numberOfDoctors && (
                          <p className="text-xs text-destructive">{fieldErrors.numberOfDoctors}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="numberOfNurses" className="text-sm font-semibold">
                          Number of Nurses *
                        </Label>
                        <Input
                          id="numberOfNurses"
                          placeholder="Enter number"
                          value={numberOfNurses}
                          onChange={(e) => setNumberOfNurses(e.target.value)}
                          className={`h-8 text-sm ${fieldErrors.numberOfNurses ? "border-destructive" : ""}`}
                        />
                        {fieldErrors.numberOfNurses && (
                          <p className="text-xs text-destructive">{fieldErrors.numberOfNurses}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs opacity-0">Spacer</Label>
                        <div className="text-xs text-muted-foreground">Include only full-time staff.</div>
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
                        <Label htmlFor="password" className="text-sm font-semibold">
                          Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`h-8 pr-8 text-sm ${fieldErrors.password ? "border-destructive" : ""}`}
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
                        {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                          Confirm Password *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`h-8 pr-8 text-sm ${fieldErrors.confirmPassword ? "border-destructive" : ""}`}
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
                        {fieldErrors.confirmPassword && (
                          <p className="text-xs text-destructive">{fieldErrors.confirmPassword}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                          className={fieldErrors.agreeToTerms ? "border-destructive" : ""}
                        />
                        <Label htmlFor="terms" className="text-xs leading-relaxed">
                          I accept the{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      {fieldErrors.agreeToTerms && (
                        <p className="text-xs text-destructive ml-6">{fieldErrors.agreeToTerms}</p>
                      )}
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
                  className={`${
                    !isLoading && isCurrentStepValid(currentStep)
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-400 hover:bg-gray-400"
                  } text-white flex items-center justify-center gap-2 h-8 text-sm order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      {currentStep === 4 ? "Creating Account…" : "Next"}
                    </>
                  ) : currentStep === 4 ? (
                    "Create Account"
                  ) : (
                    <>
                      <span>Next</span>
                      <span className="text-white/70 hidden sm:inline">| {steps[currentStep - 1]?.title}</span>
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
