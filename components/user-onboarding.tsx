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
    preferredCountries: [] as string[],
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

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleComplete = () => {
    // In a real app, you would save the user preferences here
    console.log("Onboarding completed with data:", formData)
    onComplete()
  }

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
                  <h1 className="text-2xl md:text-3xl font-bold">Let's personalize your experience</h1>
                  <span className="text-sm text-gray-500">Step {step} of 4</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">What are you looking for?</h2>
                  <RadioGroup
                    value={formData.lookingFor}
                    onValueChange={(value) => handleInputChange("lookingFor", value)}
                    className="grid gap-4"
                  >
                    <Card
                      className={`cursor-pointer transition-all ${formData.lookingFor === "treatment" ? "border-primary ring-1 ring-primary" : ""}`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <RadioGroupItem value="treatment" id="treatment" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="treatment" className="text-base font-medium cursor-pointer">
                            Medical Treatment
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I'm looking for a specific medical procedure or treatment abroad
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer transition-all ${formData.lookingFor === "consultation" ? "border-primary ring-1 ring-primary" : ""}`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <RadioGroupItem value="consultation" id="consultation" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="consultation" className="text-base font-medium cursor-pointer">
                            Medical Consultation
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I need a second opinion or consultation with a specialist
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer transition-all ${formData.lookingFor === "explore" ? "border-primary ring-1 ring-primary" : ""}`}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <RadioGroupItem value="explore" id="explore" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="explore" className="text-base font-medium cursor-pointer">
                            Just Exploring
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            I'm researching options and costs for potential future treatment
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
                      <Label htmlFor="treatmentType">What type of treatment are you interested in?</Label>
                      <Select
                        value={formData.treatmentType}
                        onValueChange={(value) => handleInputChange("treatmentType", value)}
                      >
                        <SelectTrigger id="treatmentType" className="w-full mt-1">
                          <SelectValue placeholder="Select treatment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="dental">Dental Care</SelectItem>
                          <SelectItem value="cosmetic">Cosmetic Surgery</SelectItem>
                          <SelectItem value="fertility">Fertility Treatment</SelectItem>
                          <SelectItem value="oncology">Cancer Treatment</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="medicalHistory">Brief description of your medical condition (optional)</Label>
                      <Textarea
                        id="medicalHistory"
                        placeholder="Please provide a brief description of your condition or treatment needs"
                        className="mt-1"
                        value={formData.medicalHistory}
                        onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This information helps us connect you with the right specialists. Your privacy is protected.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Preferences and Planning</h2>

                  <div className="space-y-4">
                    <div>
                      <Label>Which countries are you interested in for treatment?</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {["Thailand", "India", "Singapore", "Malaysia", "Turkey", "Mexico", "Costa Rica", "UAE"].map(
                          (country) => (
                            <div key={country} className="flex items-center space-x-2">
                              <Checkbox
                                id={country}
                                checked={formData.preferredCountries.includes(country)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleInputChange("preferredCountries", [...formData.preferredCountries, country])
                                  } else {
                                    handleInputChange(
                                      "preferredCountries",
                                      formData.preferredCountries.filter((c) => c !== country),
                                    )
                                  }
                                }}
                              />
                              <label
                                htmlFor={country}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {country}
                              </label>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timeframe">When are you planning to get treatment?</Label>
                      <Select
                        value={formData.timeframe}
                        onValueChange={(value) => handleInputChange("timeframe", value)}
                      >
                        <SelectTrigger id="timeframe" className="w-full mt-1">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3months">Within 1-3 months</SelectItem>
                          <SelectItem value="3-6months">Within 3-6 months</SelectItem>
                          <SelectItem value="6-12months">Within 6-12 months</SelectItem>
                          <SelectItem value="exploring">Just exploring options</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budget">What is your approximate budget?</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger id="budget" className="w-full mt-1">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-20k">$10,000 - $20,000</SelectItem>
                          <SelectItem value="20k-50k">$20,000 - $50,000</SelectItem>
                          <SelectItem value="over50k">Over $50,000</SelectItem>
                          <SelectItem value="unknown">Not sure yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Almost done!</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contactPreference">How would you like hospitals to contact you?</Label>
                      <RadioGroup
                        value={formData.contactPreference}
                        onValueChange={(value) => handleInputChange("contactPreference", value)}
                        className="grid gap-3 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email">Email only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phone" id="phone" />
                          <Label htmlFor="phone">Phone calls</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both">Both email and phone</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Card className="bg-primary-50 border-primary-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary-100 rounded-full">
                            <Heart className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-primary-900">Your privacy matters</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              We only share your information with hospitals you explicitly choose to connect with. You
                              can update your preferences anytime in your account settings.
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
                  <div></div>
                )}

                {step < 4 ? (
                  <Button onClick={handleNext} disabled={step === 1 && !formData.lookingFor}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete} className="bg-primary hover:bg-primary-700">
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
