"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Heart, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserOnboardingProps {
  onComplete: () => void
  onSkip: () => void
}

export function UserOnboarding({ onComplete, onSkip }: UserOnboardingProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    lookingFor: "",
    treatmentType: "",
    preferredCountries: [] as string[], // keeping the same key to avoid ripple changes; now holds states
    medicalHistory: "",
    timeframe: "",
    budget: "",
    contactPreference: "",
  })

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const handleComplete = () => {
    // In a real app, you would save the user preferences here
    console.log("Onboarding completed with data:", formData)
    onComplete()
  }

  // Nigerian states + FCT
  const destinationStates = [
    "Abia",
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
    "Katsina",
    "Kebbi",
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
    "FCT (Abuja)",
  ]

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        <header className="border-b py-4">
          <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">MedConnect</span>
            </div>
            <Button variant="ghost" onClick={onSkip}>
              Skip for now
            </Button>
          </div>
        </header>

        <main className="flex-1 py-8 md:py-12">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold">Let&apos;s personalize your experience</h1>
                  <span className="text-sm text-gray-500">Step {step} of 4</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">What brings you to MedConnect?</h2>
                  <RadioGroup
                    value={formData.lookingFor}
                    onValueChange={(value) => handleInputChange("lookingFor", value)}
                    className="grid gap-4"
                  >
                    <Card
                      className={`cursor-pointer transition-all ${
                        formData.lookingFor === "treatment" ? "border-primary ring-1 ring-primary" : ""
                      }`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <RadioGroupItem value="treatment" id="treatment" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="treatment" className="text-base font-medium cursor-pointer">
                            Medical Treatment
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I&apos;m seeking a specific medical procedure or ongoing care.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        formData.lookingFor === "consultation" ? "border-primary ring-1 ring-primary" : ""
                      }`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <RadioGroupItem value="consultation" id="consultation" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="consultation" className="text-base font-medium cursor-pointer">
                            Consultation / Second Opinion
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I want to talk to a specialist and understand my options.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        formData.lookingFor === "explore" ? "border-primary ring-1 ring-primary" : ""
                      }`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <RadioGroupItem value="explore" id="explore" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="explore" className="text-base font-medium cursor-pointer">
                            Exploring Options & Costs
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I&apos;m researching destinations, hospitals, and pricing.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Tell us about your medical needs</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="treatmentType">Which area best matches your need?</Label>
                      <Select
                        value={formData.treatmentType}
                        onValueChange={(value) => handleInputChange("treatmentType", value)}
                      >
                        <SelectTrigger id="treatmentType" className="w-full mt-1">
                          <SelectValue placeholder="Select treatment area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="dental">Dental Care</SelectItem>
                          <SelectItem value="cosmetic">Cosmetic / Plastic Surgery</SelectItem>
                          <SelectItem value="fertility">Fertility / IVF</SelectItem>
                          <SelectItem value="oncology">Cancer (Oncology)</SelectItem>
                          <SelectItem value="neurology">Neurology / Neurosurgery</SelectItem>
                          <SelectItem value="general">General Medicine</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="medicalHistory">Briefly describe your condition (optional)</Label>
                      <Textarea
                        id="medicalHistory"
                        placeholder="Add key symptoms, diagnosis (if any), tests done, or doctor recommendations..."
                        className="mt-1"
                        value={formData.medicalHistory}
                        onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This helps us suggest suitable hospitals and specialists. Your privacy is protected.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Destinations & Planning</h2>

                  <div className="space-y-4">
                    <div>
                      <Label>Preferred states in Nigeria</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {destinationStates.map((state) => (
                          <div key={state} className="flex items-center space-x-2">
                            <Checkbox
                              id={state}
                              checked={formData.preferredCountries.includes(state)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleInputChange("preferredCountries", [...formData.preferredCountries, state])
                                } else {
                                  handleInputChange(
                                    "preferredCountries",
                                    formData.preferredCountries.filter((s) => s !== state),
                                  )
                                }
                              }}
                            />
                            <label
                              htmlFor={state}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {state}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Choose the states you&apos;re open to. You can refine cities and hospitals later.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="timeframe">When would you like to start?</Label>
                      <Select
                        value={formData.timeframe}
                        onValueChange={(value) => handleInputChange("timeframe", value)}
                      >
                        <SelectTrigger id="timeframe" className="w-full mt-1">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent-2w">Urgent (within 2 weeks)</SelectItem>
                          <SelectItem value="1-3months">Within 1–3 months</SelectItem>
                          <SelectItem value="3-6months">Within 3–6 months</SelectItem>
                          <SelectItem value="6-12months">Within 6–12 months</SelectItem>
                          <SelectItem value="exploring">Just exploring options</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budget">Approximate budget</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => handleInputChange("budget", value)}
                      >
                        <SelectTrigger id="budget" className="w-full mt-1">
                          <SelectValue placeholder="Select budget range (USD equivalent)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 – $10,000</SelectItem>
                          <SelectItem value="10k-20k">$10,000 – $20,000</SelectItem>
                          <SelectItem value="20k-50k">$20,000 – $50,000</SelectItem>
                          <SelectItem value="over50k">Over $50,000</SelectItem>
                          <SelectItem value="unknown">Not sure yet</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        We&apos;ll use this to suggest realistic options. You can update this anytime.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">How should hospitals reach you?</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contactPreference">Preferred contact method</Label>
                      <RadioGroup
                        value={formData.contactPreference}
                        onValueChange={(value) => handleInputChange("contactPreference", value)}
                        className="grid gap-3 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="phone" />
                          <Label htmlFor="phone">Phone calls</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="whatsapp" id="whatsapp" />
                          <Label htmlFor="whatsapp">WhatsApp</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both">Email + Phone/WhatsApp</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Heart className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">Your privacy matters</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              We only share your information with hospitals you choose to connect with. Update your
                              preferences anytime in Settings.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    disabled={step === 1 && !formData.lookingFor}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete} className="bg-primary hover:bg-primary/90 text-white">
                    Complete Setup
                    <Check className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
