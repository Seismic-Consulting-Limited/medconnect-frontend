"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Loader2, Check, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { apiRequest } from "@/lib/utils/api-request";
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants";


 type Step = 1 | 2 | 3 | 4;
 type Country = { id: number | string; name: string };
 type StateRec = { id: number | string; name: string };
 type Option = { id: number; name: string };

export default function TravelAgentSignupPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const router = useRouter();

  // ------------------------
  // Step 1: Basic Information → backend fields
  // ------------------------
  const [agencyName, setAgencyName] = useState(""); // payload.name
  const [registrationNumber, setRegistrationNumber] = useState(""); // payload.registration_number (optional)
  const [yearFounded, setYearFounded] = useState(""); // payload.year_founded
  const [yearsOfExperience, setYearsOfExperience] = useState(""); // payload.years_of_experience (number)
  const [address, setAddress] = useState(""); // payload.location.address_1
  const [city, setCity] = useState(""); // payload.location.city
  const [postalCode, setPostalCode] = useState(""); // payload.location.postal_code
  const [phone1, setPhone1] = useState(""); // payload.phone_number_1
  const [phone2, setPhone2] = useState(""); // optional payload.phone_number_2
  const [email, setEmail] = useState(""); // payload.email
  const [website, setWebsite] = useState(""); // optional payload.website_url
  const [agencyDescription, setAgencyDescription] = useState(""); // payload.description

  // Country / State (for location + destinations)
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<StateRec[]>([]);
  const [countryId, setCountryId] = useState<string>("");
  const [stateId, setStateId] = useState<string>(""); // location.state_id (single)

  // ------------------------
  // Step 2: Services & Destinations (IDs from backend)
  // ------------------------
  const [destinationIds, setDestinationIds] = useState<number[]>([]); // payload.destinations → state IDs
  const [serviceIds, setServiceIds] = useState<number[]>([]); // payload.services → numeric IDs
  const [languageIds, setLanguageIds] = useState<number[]>([]); // payload.languages → numeric IDs
  const [partnersText, setPartnersText] = useState(""); // payload.hospital_partners: string[] (we'll split by comma)
  const [extraServicesText, setExtraServicesText] = useState(""); // payload.extra_data.services: string[] (comma split)

  // Step 3: Password & ToS
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState(false);

  // Catalogs
  const [serviceOptions, setServiceOptions] = useState<Option[]>([]);
  const [languageOptions, setLanguageOptions] = useState<Option[]>([]);

  const steps = [
    { number: 1, title: "Basic Information", description: "Provide basic information about your travel agency" },
    { number: 2, title: "Services, Languages & Destinations", description: "Select services, languages and destinations" },
    { number: 3, title: "Create Password", description: "Set a secure password to protect your account" },
  ];

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i), [currentYear]);

  // ------------------------
  // Fetchers
  // ------------------------
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingCountries(true);
        const res = await apiRequest<{ data: Country[] }>(API_ENDPOINTS.META.COUNTRIES, { method: HTTP_METHODS.GET });
        if (mounted) setCountries(res.data || []);
      } catch (e) {
        console.error("Failed to load countries", e);
        if (mounted) setCountries([]);
      } finally {
        if (mounted) setLoadingCountries(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // States for selected country (also serves as destinations list)
  useEffect(() => {
    setStates([]);
    setStateId("");
    setDestinationIds([]);
    if (!countryId) return;
    (async () => {
      try {
        setLoadingStates(true);
        const res = await apiRequest<{ data: StateRec[] }>(API_ENDPOINTS.META.STATES(countryId), { method: HTTP_METHODS.GET });
        setStates(res.data || []);
      } catch (e) {
        console.error("Failed to load states", e);
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    })();
  }, [countryId]);

  // Services (type=travel) from backend
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingServices(true);
        const res = await apiRequest<{ data: Option[] }>(API_ENDPOINTS.META.SERVICES("travel"), { method: HTTP_METHODS.GET });
        if (mounted) setServiceOptions(res.data || []);
      } catch (e) {
        console.error("Failed to load services", e);
        if (mounted) setServiceOptions([]);
      } finally {
        if (mounted) setLoadingServices(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Languages from backend
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingLanguages(true);
        const res = await apiRequest<{ data: Option[] }>(API_ENDPOINTS.META.LANGUAGES, { method: HTTP_METHODS.GET });
        if (mounted) setLanguageOptions(res.data || []);
      } catch (e) {
        console.error("Failed to load languages", e);
        if (mounted) setLanguageOptions([]);
      } finally {
        if (mounted) setLoadingLanguages(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ------------------------
  // Step helpers
  // ------------------------
  const toggleId = (list: number[], id: number, checked: boolean) => {
    return checked ? Array.from(new Set([...list, id])) : list.filter((x) => x !== id);
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        return !!(agencyName && yearFounded && address && countryId && phone1 && email && agencyDescription);
      case 2:
        return !!(destinationIds.length > 0 && serviceIds.length > 0);
      case 3:
        return !!(password && confirmPassword && password === confirmPassword && agreeToTerms);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setError("");
      if (currentStep < 3) setCurrentStep((currentStep + 1) as Step);
      else handleSubmit();
    } else {
      setError("Please fill in all required fields");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
      setError("");
    }
  };

  // ------------------------
  // Submit
  // ------------------------
  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Build EXACT backend payload
      const hospitalPartners = partnersText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const extraServices = extraServicesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        email: email.trim(),
        password,
        terms_of_service_agreement_checked: agreeToTerms,
        name: agencyName.trim(),
        registration_number: registrationNumber.trim() || undefined,
        destinations: destinationIds, // state IDs
        year_founded: String(yearFounded),
        years_of_experience: yearsOfExperience ? Number(yearsOfExperience) : undefined,
        phone_number_1: phone1.trim(),
        phone_number_2: phone2.trim() || undefined,
        description: agencyDescription.trim(),
        location: {
          address_1: address.trim(),
          city: city.trim() || undefined,
          state_id: stateId ? Number(stateId) : undefined,
          postal_code: postalCode.trim() || undefined,
        },
        website_url: website.trim() || undefined,
        languages: languageIds, // numeric IDs
        services: serviceIds,   // numeric IDs
        hospital_partners: hospitalPartners.length ? hospitalPartners : undefined,
        extra_data: extraServices.length ? { services: extraServices } : undefined,
      } as const;

      await apiRequest(API_ENDPOINTS.AUTH.SIGNUP_TRAVEL_AGENT, {
        method: HTTP_METHODS.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("pending_email", email.toLowerCase());
        sessionStorage.setItem("pending_role", "travel-agent");
      }
      // Always go to verify
      router.replace("/user/auth/verify");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStepProgress = () => Math.round((currentStep / 3) * 100);

  const countryPlaceholder = loadingCountries ? "Loading countries…" : "Select Country";
  const statePlaceholder = countryId
    ? loadingStates
      ? "Loading states…"
      : states.length
        ? "Select State"
        : "No states found"
    : "Select Country first";

  // ------------------------
  // Success screen (kept in case you want to reuse)
  // ------------------------
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
            <Button onClick={() => router.push("/user/auth/login")} className="w-full bg-primary hover:bg-primary/90 text-white">
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  // ------------------------
  // Form UI
  // ------------------------
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-6xl">
        <Card className="overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[420px]">
            {/* Sidebar */}
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
                  <div key={step.number} className={`p-2 rounded-lg transition-all duration-200 ${
                    currentStep === step.number
                      ? "bg-white/25 backdrop-blur-sm border border-white/40"
                      : currentStep > step.number
                        ? "bg-white/10 border border-white/20"
                        : "bg-transparent border border-transparent"
                  }`}>
                    <div className="flex items-start gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                        currentStep >= step.number ? "bg-white text-primary" : "bg-gray-500 text-gray-300"
                      }`}>
                        {currentStep > step.number ? <Check className="w-3 h-3" /> : step.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-xs leading-tight ${currentStep >= step.number ? "text-white" : "text-gray-400"}`}>{step.title}</h3>
                        <p className={`text-xs mt-0.5 leading-tight ${currentStep >= step.number ? "text-white/60" : "text-gray-500"}`}>{step.description}</p>
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

            {/* Form content */}
            <div className="flex-1 p-3 sm:p-4">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Step {currentStep} of 3</span>
                  <span className="text-xs text-muted-foreground">{getStepProgress()}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${getStepProgress()}%` }} />
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
                      <p className="text-muted-foreground text-sm">Please provide basic information about your travel agency.</p>
                    </div>
                    {/* Agency Name + Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="agencyName" className="text-xs">Agency Name *</Label>
                        <Input id="agencyName" placeholder="Enter your agency name" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="registrationNumber" className="text-xs">Registration Number</Label>
                        <Input id="registrationNumber" placeholder="RC-456789" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="yearFounded" className="text-xs">Year Founded *</Label>
                        <Select value={yearFounded} onValueChange={setYearFounded}>
                          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select Year" /></SelectTrigger>
                          <SelectContent className="max-h-48">
                            {years.map((year) => (<SelectItem key={year} value={year.toString()}>{year}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="yearsOfExperience" className="text-xs">Years of Experience</Label>
                        <Input id="yearsOfExperience" placeholder="5" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value.replace(/[^0-9]/g, ""))} className="h-8 text-sm" />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                      <Label htmlFor="address" className="text-xs">Street Address *</Label>
                      <Textarea id="address" placeholder="123 Travel Plaza" value={address} onChange={(e) => setAddress(e.target.value)} className="min-h-[50px] text-sm" />
                    </div>

                    {/* City + Country + State + Postal */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="city" className="text-xs">City</Label>
                        <Input id="city" placeholder="Lagos" value={city} onChange={(e) => setCity(e.target.value)} className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Country *</Label>
                        <Select value={countryId} onValueChange={(val) => { setCountryId(val); setStateId(""); }} disabled={loadingCountries}>
                          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder={countryPlaceholder} /></SelectTrigger>
                          <SelectContent>
                            {countries.length === 0 ? (
                              <SelectItem value="__none" disabled>{loadingCountries ? "Loading…" : "No countries found"}</SelectItem>
                            ) : (
                              countries.map((c) => (<SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">State *</Label>
                        <Select value={stateId} onValueChange={setStateId} disabled={!countryId || loadingStates || states.length === 0}>
                          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder={statePlaceholder} /></SelectTrigger>
                          <SelectContent>
                            {states.length === 0 ? (
                              <SelectItem value="__none" disabled>{countryId ? (loadingStates ? "Loading…" : "No states found") : "Select Country first"}</SelectItem>
                            ) : (
                              states.map((s) => (<SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="postalCode" className="text-xs">Postal Code</Label>
                        <Input id="postalCode" placeholder="100001" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="h-8 text-sm" />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="phone1" className="text-xs">Phone Number *</Label>
                        <Input id="phone1" placeholder="+2348012345678" value={phone1} onChange={(e) => setPhone1(e.target.value)} className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="phone2" className="text-xs">Alt. Phone</Label>
                        <Input id="phone2" placeholder="+2348098765432" value={phone2} onChange={(e) => setPhone2(e.target.value)} className="h-8 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-xs">Email Address *</Label>
                        <Input id="email" type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} className="h-8 text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="website" className="text-xs">Website</Label>
                        <Input id="website" placeholder="https://youragency.com" value={website} onChange={(e) => setWebsite(e.target.value)} className="h-8 text-sm" />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <Label htmlFor="agencyDescription" className="text-xs">Agency Description *</Label>
                      <Textarea id="agencyDescription" placeholder="We provide premium travel services…" value={agencyDescription} onChange={(e) => setAgencyDescription(e.target.value)} className="min-h-[60px] text-sm" />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Services, Languages & Destinations</h2>
                      <p className="text-muted-foreground text-sm">Select services, languages and destinations (states) where you operate.</p>
                    </div>

                    {/* Services (from backend) */}
                    <div className="space-y-2">
                      <Label className="text-xs">Services Offered *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {loadingServices && <p className="text-xs text-muted-foreground">Loading services…</p>}
                        {!loadingServices && serviceOptions.length === 0 && (
                          <p className="text-xs text-muted-foreground">No services found.</p>
                        )}
                        {serviceOptions.map((svc) => (
                          <div key={svc.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`svc-${svc.id}`}
                              checked={serviceIds.includes(svc.id)}
                              onCheckedChange={(checked) => setServiceIds((prev) => toggleId(prev, svc.id, !!checked))}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                            />
                            <Label htmlFor={`svc-${svc.id}`} className="text-xs">{svc.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Languages (from backend) */}
                    <div className="space-y-2">
                      <Label className="text-xs">Languages</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {loadingLanguages && <p className="text-xs text-muted-foreground">Loading languages…</p>}
                        {!loadingLanguages && languageOptions.length === 0 && (
                          <p className="text-xs text-muted-foreground">No languages found.</p>
                        )}
                        {languageOptions.map((lng) => (
                          <div key={lng.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`lng-${lng.id}`}
                              checked={languageIds.includes(lng.id)}
                              onCheckedChange={(checked) => setLanguageIds((prev) => toggleId(prev, lng.id, !!checked))}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                            />
                            <Label htmlFor={`lng-${lng.id}`} className="text-xs">{lng.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Destinations (as State IDs) */}
                    <div className="space-y-2">
                      <Label className="text-xs">Destinations (States) *</Label>
                      <p className="text-xs text-muted-foreground">Select all states where you operate. Choose a country above to load states.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {loadingStates && <p className="text-xs text-muted-foreground">Loading states…</p>}
                        {!loadingStates && states.length === 0 && (
                          <p className="text-xs text-muted-foreground">No states to choose. Select a country first.</p>
                        )}
                        {states.map((s) => {
                          const id = Number(s.id);
                          return (
                            <div key={id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`dst-${id}`}
                                checked={destinationIds.includes(id)}
                                onCheckedChange={(checked) => setDestinationIds((prev) => toggleId(prev, id, !!checked))}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                              />
                              <Label htmlFor={`dst-${id}`} className="text-xs">{s.name}</Label>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Partners & Extra Services */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="partners" className="text-xs">Hospital Partnerships (comma separated)</Label>
                        <Textarea id="partners" placeholder="St. Mary's Hospital, Unity Health Center" value={partnersText} onChange={(e) => setPartnersText(e.target.value)} className="min-h-[60px] text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="extras" className="text-xs">Extra Services (comma separated)</Label>
                        <Textarea id="extras" placeholder="Chaperoning, Christmas package" value={extraServicesText} onChange={(e) => setExtraServicesText(e.target.value)} className="min-h-[60px] text-sm" />
                      </div>
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
                        <Label htmlFor="password" className="text-xs">Password *</Label>
                        <div className="relative">
                          <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-8 pr-8 text-sm" />
                          <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="confirmPassword" className="text-xs">Confirm Password *</Label>
                        <div className="relative">
                          <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-8 pr-8 text-sm" />
                          <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-primary">
                      <p>Passwords must be <span className="font-medium">case-sensitive</span>, include a mix of <span className="font-medium">uppercase</span> and <span className="font-medium">lowercase letters</span>, and be at least <span className="font-medium">6 characters long</span>.</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)} className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white" />
                      <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">I agree to the <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a></label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 pt-4">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="flex items-center justify-center gap-2 bg-transparent h-8 text-sm order-2 sm:order-1">
                  <ArrowLeft className="w-3 h-3" />
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={isLoading} className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 h-8 text-sm order-1 sm:order-2">
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
  );
}
