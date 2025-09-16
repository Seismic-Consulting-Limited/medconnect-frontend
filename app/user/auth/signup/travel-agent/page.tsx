"use client"
import { useEffect, useState } from "react"
import { Eye, EyeOff, Loader2, Check, ArrowLeft, ArrowRight, Plane } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"

import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"

// ---- Helpers to surface backend validation errors ----
function humanizeKey(k: string) {
  return k.replace(/_/g, " ")
}
function flattenErrors(obj: any, prefix = ""): string[] {
  const out: string[] = []
  if (!obj || typeof obj !== "object") return out

  if (typeof obj.detail === "string") out.push(obj.detail)
  if (typeof obj.message === "string") out.push(obj.message)
  if (typeof obj.error === "string") out.push(obj.error)

  for (const [key, val] of Object.entries(obj)) {
    if (["detail", "message", "error"].includes(key)) continue
    const label = prefix ? `${prefix} → ${humanizeKey(key)}` : humanizeKey(key)

    if (Array.isArray(val)) {
      out.push(`${label}: ${val.map(String).join(", ")}`)
    } else if (val && typeof val === "object") {
      out.push(...flattenErrors(val as any, label))
    } else if (typeof val === "string") {
      out.push(`${label}: ${val}`)
    }
  }
  return Array.from(new Set(out))
}

type Step = 1 | 2 | 3
type Country = { id: string | number; name: string }
type StateT = { id: string | number; name: string }
type Language = { id: number; name: string }
type Service = { id: number; name: string }

export default function TravelAgentSignupPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const router = useRouter()
  const [showCancelModal, setShowCancelModal] = useState(false)

  // Step 1: Basic Information
  const [agencyName, setAgencyName] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("") // Added registration number field
  const [yearFounded, setyearFounded] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [countryId, setCountryId] = useState<string>("")
  const [stateId, setStateId] = useState<string>("")
  const [postalCode, setPostalCode] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [agencyDescription, setAgencyDescription] = useState("")

  // Step 2: Services & Destinations
  const [destinationStateIds, setDestinationStateIds] = useState<number[]>([]) // IDs from backend
  const [serviceIds, setServiceIds] = useState<number[]>([]) // from /services/?type=travel
  const [languageIds, setLanguageIds] = useState<number[]>([]) // from /languages
  const [hospitalPartners, setHospitalPartners] = useState("")
  const [yearsOfExperience, setYearsOfExperience] = useState<number | string>("")

  // Step 3: Password
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Collections
  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<StateT[]>([])
  const [allStates, setAllStates] = useState<StateT[]>([]) // for destinations list
  const [services, setServices] = useState<Service[]>([])
  const [languages, setLanguages] = useState<Language[]>([])

  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiErrors, setApiErrors] = useState<string[]>([])

  const { signup } = useAuth()

  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case "agencyName":
        if (!value.trim()) return "Agency name is required"
        if (value.trim().length < 5) return "Agency name must be at least 5 characters long"
        return ""

      case "registrationNumber":
        if (!value.trim()) return "Registration number is required"
        if (value.trim().length < 3) return "Registration number must be at least 3 characters long"
        return ""

      case "email":
        if (!value.trim()) return "Email address is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Please enter a valid email address"
        return ""

      case "phone":
        if (!value.trim()) return "Phone number is required"
        const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/
        if (!phoneRegex.test(value)) return "Please enter a valid phone number (at least 10 digits)"
        return ""

      case "postalCode":
        if (value && !/^\d+$/.test(value)) return "Postal code should contain numbers only"
        return ""

      case "website":
        if (value) {
          const urlRegex =
            /^[a-zA-Z0-9]([a-zA-Z0-9\-_]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-_]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/
          const cleanUrl = value.replace(/^(https?:\/\/)?(www\.)?/, "")
          if (!urlRegex.test(cleanUrl)) {
            return "Please enter a valid website (e.g., example.com)"
          }
        }
        return ""

      case "password":
        if (!value) return "Password is required"
        if (value.length < 8) return "Password must be at least 8 characters long"
        if (!/(?=.*[a-z])/.test(value)) return "Password must contain at least one lowercase letter"
        if (!/(?=.*[A-Z])/.test(value)) return "Password must contain at least one uppercase letter"
        if (!/(?=.*\d)/.test(value)) return "Password must contain at least one number"
        return ""

      case "confirmPassword":
        if (!value) return "Please confirm your password"
        if (value !== password) return "Passwords do not match"
        return ""

      case "yearsOfExperience":
        if (!value.trim()) return "Years of experience is required"
        if (value && (isNaN(Number(value)) || Number(value) < 0)) {
          return "Years of experience must be a positive number"
        }
        return ""

      default:
        return ""
    }
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    // Clear field error when user starts typing
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: "" }))
    }

    // Update field value
    switch (fieldName) {
      case "agencyName":
        setAgencyName(value)
        break
      case "registrationNumber":
        setRegistrationNumber(value)
        break
      case "email":
        setEmail(value)
        break
      case "phone":
        setPhone(value)
        break
      case "postalCode":
        setPostalCode(value)
        break
      case "website":
        setWebsite(value)
        break
      case "password":
        setPassword(value)
        break
      case "confirmPassword":
        setConfirmPassword(value)
        break
      case "yearsOfExperience":
        setYearsOfExperience(value)
        break
      case "yearFounded":
        setyearFounded(value)
        break
    }
  }

  const handleFieldBlur = (fieldName: string, value: string) => {
    const error = validateField(fieldName, value)
    setFieldErrors((prev) => ({ ...prev, [fieldName]: error }))
  }

  const steps = [
    { number: 1, title: "Basic Information", description: "Provide basic information about your travel agency" },
    {
      number: 2,
      title: "Services & Destinations",
      description: "Tell us about your services and destinations in Nigeria",
    },
    { number: 3, title: "Create Password", description: "Set a secure password to protect your account" },
  ] as const

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i)

  // Fetch Countries, Languages, Services, and All States (for destinations) on mount
  useEffect(() => {
    ;(async () => {
      try {
        const c = await apiRequest<{ data: Country[] }>(API_ENDPOINTS.META.COUNTRIES, { method: HTTP_METHODS.GET })
        setCountries(c?.data ?? [])
      } catch {
        setCountries([])
      }

      try {
        const l = await apiRequest<{ data: Language[] }>(API_ENDPOINTS.META.LANGUAGES, { method: HTTP_METHODS.GET })
        setLanguages(l?.data ?? [])
      } catch {
        setLanguages([])
      }

      try {
        const s = await apiRequest<{ data: Service[] }>(API_ENDPOINTS.META.SERVICES("travel"), {
          method: HTTP_METHODS.GET,
        })
        setServices(s?.data ?? [])
      } catch {
        setServices([])
      }

      try {
        // If you have a dedicated endpoint for all states, use it. Otherwise you can aggregate by fetching per country.
        // Here we reuse COUNTRIES -> STATES (naive aggregate)
        const c = await apiRequest<{ data: Country[] }>(API_ENDPOINTS.META.COUNTRIES, { method: HTTP_METHODS.GET })
        const list: StateT[] = []
        for (const country of c?.data ?? []) {
          try {
            const resp = await apiRequest<{ data: StateT[] }>(API_ENDPOINTS.META.STATES(country.id), {
              method: HTTP_METHODS.GET,
            })
            list.push(...(resp?.data ?? []))
          } catch {}
        }
        setAllStates(list)
      } catch {
        setAllStates([])
      }
    })()
  }, [])

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault()
      if (currentStep > 1) {
        setCurrentStep((currentStep - 1) as Step)
        window.history.pushState(null, "", window.location.href)
      } else {
        router.push("/user/auth/signup")
      }
    }

    // Push initial state to enable back button handling
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [currentStep, router])

  // Fetch states for selected country (for address state select)
  useEffect(() => {
    if (!countryId) {
      setStates([])
      setStateId("")
      return
    }
    ;(async () => {
      try {
        const s = await apiRequest<{ data: StateT[] }>(API_ENDPOINTS.META.STATES(countryId), {
          method: HTTP_METHODS.GET,
        })
        setStates(s?.data ?? [])
      } catch {
        setStates([])
      }
    })()
  }, [countryId])

  const toggleId = (arr: number[], id: number, checked: boolean) =>
    checked ? Array.from(new Set([...arr, id])) : arr.filter((x) => x !== id)

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!agencyName.trim()) {
          errors.agencyName = "Agency name is required"
        } else if (agencyName.trim().length < 5) {
          errors.agencyName = "Agency name must be at least 5 characters"
        }

        if (!registrationNumber.trim()) {
          errors.registrationNumber = "Registration number is required"
        } else if (registrationNumber.trim().length < 3) {
          errors.registrationNumber = "Registration number must be at least 3 characters"
        }

        if (!yearFounded) {
          errors.yearFounded = "Year Founded is required"
        }

        if (!address.trim()) {
          errors.address = "Address is required"
        }

        if (!city.trim()) {
          errors.city = "City is required"
        }

        if (!countryId) {
          errors.country = "Please select a country"
        }

        if (!stateId) {
          errors.state = "Please select a state"
        }

        if (!phone.trim()) {
          errors.phone = "Phone number is required"
        } else if (!/^[+]?[0-9\s\-()]{10,}$/.test(phone)) {
          errors.phone = "Please enter a valid phone number"
        }

        if (!email.trim()) {
          errors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errors.email = "Please enter a valid email address"
        }

        if (postalCode && !/^\d+$/.test(postalCode)) {
          errors.postalCode = "Postal code must contain only numbers"
        }

        if (website) {
          const urlRegex =
            /^[a-zA-Z0-9]([a-zA-Z0-9\-_]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-_]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/
          const cleanUrl = website.replace(/^(https?:\/\/)?(www\.)?/, "")
          if (!urlRegex.test(cleanUrl)) {
            errors.website = "Please enter a valid website URL"
          }
        }

        // Agency description validation
        if (!agencyDescription.trim()) {
          errors.agencyDescription = "Agency description is required"
        } else if (agencyDescription.trim().length < 20) {
          errors.agencyDescription = "Please provide a more detailed description (at least 20 characters)"
        }

        if (!yearsOfExperience || String(yearsOfExperience).trim() === "") {
          errors.yearsOfExperience = "Years of experience is required"
        } else if (isNaN(Number(yearsOfExperience)) || Number(yearsOfExperience) < 0) {
          errors.yearsOfExperience = "Years of experience must be a positive number"
        }
        break

      case 2:
        if (destinationStateIds.length === 0) {
          errors.destinations = "Please select at least one destination"
        }
        if (serviceIds.length === 0) {
          errors.services = "Please select at least one service"
        }
        break

      case 3:
        const passwordError = validateField("password", password)
        const confirmPasswordError = validateField("confirmPassword", confirmPassword)
        if (passwordError) errors.password = passwordError
        if (confirmPasswordError) errors.confirmPassword = confirmPasswordError
        if (!agreeToTerms) errors.agreeToTerms = "Please agree to the terms and conditions"
        break
    }

    // Filter out empty errors
    const validErrors = Object.fromEntries(Object.entries(errors).filter(([_, error]) => error !== ""))
    setFieldErrors(validErrors)
    return Object.keys(validErrors).length === 0
  }

  const isCurrentStepValid = (): boolean => {
    console.log("[v0] Current step:", currentStep)
    console.log("[v0] Destinations selected:", destinationStateIds.length)
    console.log("[v0] Services selected:", serviceIds.length)

    switch (currentStep) {
      case 1:
        const step1Valid = !!(
          (
            agencyName.trim() &&
            agencyName.trim().length >= 5 &&
            registrationNumber.trim() &&
            registrationNumber.trim().length >= 3 &&
            yearFounded &&
            address.trim() &&
            city.trim() &&
            countryId &&
            stateId &&
            phone.trim() &&
            email.trim() &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
            yearsOfExperience &&
            String(yearsOfExperience).trim() !== "" &&
            !isNaN(Number(yearsOfExperience)) &&
            Number(yearsOfExperience) >= 0
          ) // Email format validation
        )
        console.log("[v0] Step 1 validation details:", {
          agencyName: agencyName.trim(),
          agencyNameLength: agencyName.trim().length,
          registrationNumber: registrationNumber.trim(),
          registrationNumberLength: registrationNumber.trim().length,
          yearFounded,
          address: address.trim(),
          city: city.trim(),
          countryId,
          stateId,
          phone: phone.trim(),
          email: email.trim(),
          emailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
          yearsOfExperience,
          yearsOfExperienceValid:
            yearsOfExperience &&
            String(yearsOfExperience).trim() !== "" &&
            !isNaN(Number(yearsOfExperience)) &&
            Number(yearsOfExperience) >= 0,
          overall: step1Valid,
        })
        return step1Valid
      case 2:
        return destinationStateIds.length > 0 && serviceIds.length > 0
      case 3:
        return !!(
          (email && password && confirmPassword && password === confirmPassword && agreeToTerms) // Must accept terms to proceed
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    console.log("[v0] Handle next clicked, current step:", currentStep)
    console.log("[v0] Is step valid:", isCurrentStepValid())

    validateStep(currentStep)

    if (isCurrentStepValid()) {
      console.log("[v0] Step is valid, moving to next step")
      if (currentStep === 3) {
        handleSubmit()
      } else {
        setCurrentStep((currentStep + 1) as Step)
      }
    } else {
      console.log("[v0] Step is invalid, showing errors")
      // Errors are already set by validateStep, just trigger re-render
      setFieldErrors((prev) => ({ ...prev }))
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
      setError("")
      setApiErrors([])
      setFieldErrors({})
    }
  }

  const handleSubmit = async () => {
    if (!isCurrentStepValid()) return

    setIsLoading(true)
    setError("")
    setApiErrors([])

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
        name: agencyName.trim(),
        registration_number: registrationNumber.trim(),
        year_founded: String(yearFounded),
        phone_number_1: phone.trim(),
        website_url: processedWebsite || undefined,
        description: agencyDescription.trim(),
        location: {
          country_id: Number(countryId),
          state_id: Number(stateId),
          address_1: address.trim(),
          city: city.trim(),
          postal_code: postalCode.trim() || undefined,
        },
        destination_state_ids: destinationStateIds,
        service_ids: serviceIds,
        language_ids: languageIds,
        hospital_partners: hospitalPartners.trim() || undefined,
        years_of_experience: yearsOfExperience || undefined,
      } as const

      const response: any = await apiRequest(API_ENDPOINTS.AUTH.SIGNUP_TRAVEL_AGENT, {
        method: HTTP_METHODS.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response && (response.message || response.detail)) {
        toast.success(String(response.message || response.detail))
      }

      // Save pending email and role for verify screen
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pending_email", email.toLowerCase())
        sessionStorage.setItem("pending_role", "travel-agent")
      }

      // Redirect to verify page with role parameter
      router.replace("/user/auth/verify?role=travel-agent")
    } catch (err: any) {
      const server = err?.data?.errors ?? err?.data ?? null
      const list = server ? flattenErrors(server) : []
      if (list.length) {
        setApiErrors(list)
      } else {
        setApiErrors([])
        setError(err?.message || "Something went wrong. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getStepProgress = () => Math.round((currentStep / 3) * 100)

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Basic Information</h2>
              <p className="text-muted-foreground text-sm">
                Please provide basic information about your travel agency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="agencyName" className="text-sm font-semibold">
                  Agency Name *
                </Label>
                <Input
                  id="agencyName"
                  value={agencyName}
                  onChange={(e) => handleFieldChange("agencyName", e.target.value)}
                  onBlur={(e) => handleFieldBlur("agencyName", e.target.value)}
                  className="h-10 text-sm"
                />
                {fieldErrors.agencyName && <p className="text-xs text-destructive">{fieldErrors.agencyName}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="yearFounded" className="text-sm font-semibold">
                  Year Founded *
                </Label>
                <Select value={yearFounded} onValueChange={(value) => handleFieldChange("yearFounded", value)}>
                  <SelectTrigger className="h-10 text-sm">
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
                {fieldErrors.yearFounded && <p className="text-xs text-destructive">{fieldErrors.yearFounded}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                  className="h-10 text-sm"
                />
                {fieldErrors.phone && <p className="text-xs text-destructive">{fieldErrors.phone}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onBlur={(e) => handleFieldBlur("email", e.target.value)}
                  className="h-10 text-sm"
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
                  value={website}
                  onChange={(e) => handleFieldChange("website", e.target.value)}
                  onBlur={(e) => handleFieldBlur("website", e.target.value)}
                  className="h-10 text-sm"
                />
                {fieldErrors.website && <p className="text-xs text-destructive">{fieldErrors.website}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="registrationNumber" className="text-sm font-semibold">
                  Registration Number *
                </Label>
                <Input
                  id="registrationNumber"
                  value={registrationNumber}
                  onChange={(e) => handleFieldChange("registrationNumber", e.target.value)}
                  onBlur={(e) => handleFieldBlur("registrationNumber", e.target.value)}
                  className="h-10 text-sm"
                />
                {fieldErrors.registrationNumber && (
                  <p className="text-xs text-destructive">{fieldErrors.registrationNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="address" className="text-sm font-semibold">
                Address *
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="min-h-[50px] text-sm"
              />
              {fieldErrors.address && <p className="text-xs text-destructive">{fieldErrors.address}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label htmlFor="city" className="text-sm font-semibold">
                  City *
                </Label>
                <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="h-10 text-sm" />
                {fieldErrors.city && <p className="text-xs text-destructive">{fieldErrors.city}</p>}
              </div>

              <div className="space-y-1">
                <Label className="text-sm font-semibold">Country *</Label>
                <Select
                  value={countryId}
                  onValueChange={(v) => {
                    setCountryId(v)
                    setStateId("")
                  }}
                >
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.country && <p className="text-xs text-destructive">{fieldErrors.country}</p>}
              </div>

              <div className="space-y-1">
                <Label className="text-sm font-semibold">State *</Label>
                <Select value={stateId} onValueChange={setStateId} disabled={!states.length}>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder={states.length ? "Select State" : "Select Country first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.state && <p className="text-xs text-destructive">{fieldErrors.state}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="postalCode" className="text-sm font-semibold">
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => handleFieldChange("postalCode", e.target.value)}
                  onBlur={(e) => handleFieldBlur("postalCode", e.target.value)}
                  className="h-10 text-sm"
                />
                {fieldErrors.postalCode && <p className="text-xs text-destructive">{fieldErrors.postalCode}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="agencyDescription" className="text-sm font-semibold">
                Agency Description *
              </Label>
              <Textarea
                id="agencyDescription"
                value={agencyDescription}
                onChange={(e) => setAgencyDescription(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              {fieldErrors.agencyDescription && (
                <p className="text-xs text-destructive">{fieldErrors.agencyDescription}</p>
              )}
            </div>

            <div className="space-y-1 max-w-md">
              <Label htmlFor="yearsOfExperience" className="text-sm font-semibold">
                Years of Experience
              </Label>
              <Input
                id="yearsOfExperience"
                value={String(yearsOfExperience)}
                onChange={(e) => handleFieldChange("yearsOfExperience", e.target.value)}
                onBlur={(e) => handleFieldBlur("yearsOfExperience", e.target.value)}
                className="h-10 text-sm"
              />
              {fieldErrors.yearsOfExperience && (
                <p className="text-xs text-destructive">{fieldErrors.yearsOfExperience}</p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Services & Destinations</h2>
              <p className="text-muted-foreground text-sm">Tell us about your services and destinations in Nigeria</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Destinations in Nigeria (States) *</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAllDestinations}
                    className="text-xs h-7 bg-transparent"
                  >
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={deselectAllDestinations}
                    className="text-xs h-7 bg-transparent"
                  >
                    Deselect All
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {allStates.map((s) => (
                  <div key={s.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dest-${s.id}`}
                      checked={destinationStateIds.includes(Number(s.id))}
                      onCheckedChange={(checked) =>
                        setDestinationStateIds((prev) => toggleId(prev, Number(s.id), !!checked))
                      }
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`dest-${s.id}`} className="text-xs font-normal">
                      {s.name}
                    </Label>
                  </div>
                ))}
              </div>
              {fieldErrors.destinations && <p className="text-xs text-destructive">{fieldErrors.destinations}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Services Offered *</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAllServices}
                    className="text-xs h-7 bg-transparent"
                  >
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={deselectAllServices}
                    className="text-xs h-7 bg-transparent"
                  >
                    Deselect All
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((srv) => (
                  <div key={srv.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`srv-${srv.id}`}
                      checked={serviceIds.includes(srv.id)}
                      onCheckedChange={(checked) => setServiceIds((prev) => toggleId(prev, srv.id, !!checked))}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`srv-${srv.id}`} className="text-xs font-normal">
                      {srv.name}
                    </Label>
                  </div>
                ))}
              </div>
              {fieldErrors.services && <p className="text-xs text-destructive">{fieldErrors.services}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Languages (optional)</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAllLanguages}
                    className="text-xs h-7 bg-transparent"
                  >
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={deselectAllLanguages}
                    className="text-xs h-7 bg-transparent"
                  >
                    Deselect All
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lang-${lang.id}`}
                      checked={languageIds.includes(lang.id)}
                      onCheckedChange={(checked) => setLanguageIds((prev) => toggleId(prev, lang.id, !!checked))}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`lang-${lang.id}`} className="text-xs font-normal">
                      {lang.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="hospitalPartners" className="text-sm font-semibold">
                Hospital Partnerships
              </Label>
              <p className="text-xs text-muted-foreground">
                List Nigerian hospitals you frequently partner with (comma-separated).
              </p>
              <Textarea
                id="hospitalPartners"
                value={hospitalPartners}
                onChange={(e) => setHospitalPartners(e.target.value)}
                className="min-h-[60px] text-sm"
                placeholder="e.g., Lagos Advanced Medical Centre, Abuja Specialist Hospital"
              />
              {fieldErrors.hospitalPartners && (
                <p className="text-xs text-destructive">{fieldErrors.hospitalPartners}</p>
              )}
            </div>
          </div>
        )

      case 3:
        return (
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
                    value={password}
                    onChange={(e) => handleFieldChange("password", e.target.value)}
                    onBlur={(e) => handleFieldBlur("password", e.target.value)}
                    className="h-10 pr-8 text-sm"
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
                    value={confirmPassword}
                    onChange={(e) => handleFieldChange("confirmPassword", e.target.value)}
                    onBlur={(e) => handleFieldBlur("confirmPassword", e.target.value)}
                    className="h-10 pr-8 text-sm"
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
            {fieldErrors.agreeToTerms && <p className="text-xs text-destructive">{fieldErrors.agreeToTerms}</p>}
          </div>
        )

      default:
        return null
    }
  }

  const [showAllDestinations, setShowAllDestinations] = useState(false)
  const [showAllServices, setShowAllServices] = useState(false)
  const [showAllLanguages, setShowAllLanguages] = useState(false)

  const selectAllDestinations = () => {
    setDestinationStateIds(allStates.map((s) => Number(s.id)))
  }

  const deselectAllDestinations = () => {
    setDestinationStateIds([])
  }

  const selectAllServices = () => {
    setServiceIds(services.map((s) => s.id))
  }

  const deselectAllServices = () => {
    setServiceIds([])
  }

  const selectAllLanguages = () => {
    setLanguageIds(languages.map((l) => l.id))
  }

  const deselectAllLanguages = () => {
    setLanguageIds([])
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-6xl">
        <Card className="overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[420px]">
            {/* Sidebar */}
            <div className="hidden lg:block w-full lg:w-1/3 bg-primary p-3 sm:p-4 text-white">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-base sm:text-lg font-bold">MedKonnect</span>
              </div>

              <div className="mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold mb-1">Travel Agent Partner Application</h2>
                <p className="text-white text-xs">
                  Join MedConnect as a travel agent partner to support medical tourism to Nigeria. We'll review your
                  application and respond within 3-5 business days.
                </p>
              </div>

              <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex items-start gap-3 min-w-max lg:min-w-0 p-2 rounded-lg transition-all duration-200 border mb-2 ${
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
                <button onClick={() => setShowCancelModal(true)} className="text-white/80 text-xs hover:text-white">
                  Cancel
                </button>
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

              {/* Backend error list */}
              {apiErrors.length > 0 && (
                <div className="p-3 text-xs bg-destructive/10 text-destructive rounded-lg border border-destructive/20 mb-3">
                  <ul className="list-disc pl-5 space-y-1">
                    {apiErrors.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Single banner message (optional) */}
              {error && apiErrors.length === 0 && (
                <div className="p-2 text-xs bg-destructive/10 text-destructive rounded-lg border border-destructive/20 mb-3">
                  {error}
                </div>
              )}

              {renderStep()}
              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 h-10 text-sm order-2 sm:order-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Previous
                </Button>

                <Button
                  onClick={currentStep === 3 ? handleSubmit : handleNext}
                  disabled={isLoading}
                  className={`${
                    !isLoading && isCurrentStepValid()
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-400 hover:bg-gray-400"
                  } text-white flex items-center justify-center gap-2 h-8 text-sm order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      {currentStep === 3 ? "Creating Account…" : "Next"}
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

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-2">Cancel Registration?</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to cancel? All your progress will be lost.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowCancelModal(false)}>
                Continue Registration
              </Button>
              <Button onClick={() => router.push("/user/auth/signup")}>Yes, Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
