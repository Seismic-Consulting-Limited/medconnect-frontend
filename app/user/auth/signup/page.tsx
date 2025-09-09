"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Building2, Plane, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"

type AccountType = "client" | "hospital" | "travel-agent"

export default function SignupPage() {
  const [selectedType, setSelectedType] = useState<AccountType | "">("")
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  // If a logged-in user lands here, bounce to dashboard (history-safe)
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, router])

  // Prefetch the next route for snappier navigation
  useEffect(() => {
    if (!selectedType) return
    router.prefetch(`/user/auth/signup/${selectedType}`)
  }, [selectedType, router])

  const handleContinue = () => {
    if (!selectedType) {
      toast.error("Please choose an account type to continue.")
      return
    }
    router.replace(`/user/auth/signup/${selectedType}`)
  }

  const handleCancel = () => {
    router.push("/")
  }

  const accountTypes = [
    {
      id: "client" as AccountType,
      title: "Client",
      description: "Patients seeking trusted doctors or hospitals for medical care in Nigeria.",
      icon: User,
    },
    {
      id: "hospital" as AccountType,
      title: "Hospital",
      description: "Accredited medical facilities offering quality treatment to international patients.",
      icon: Building2,
    },
    {
      id: "travel-agent" as AccountType,
      title: "Travel Agent",
      description: "Partners who arrange smooth, stress-free travel for medical visits to Nigeria.",
      icon: Plane,
    },
  ]

  return (
    <main className="h-screen bg-gray-100 flex">
      {/* Left side - Image */}
      <div className="w-2/5 relative h-screen">
        <div className="absolute top-6 left-6 text-blue-400 font-medium z-10"></div>
        <img
          src="https://res.cloudinary.com/dxhx45ing/image/upload/v1757416649/Slideshow_liwnzd.png"
          alt="Medical consultation"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-3/5 bg-white flex flex-col h-screen">
        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-purple-600 fill-current" />
                <span className="text-xl font-semibold text-purple-600">MedKonnect</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Choose Account Type</h1>
              <p className="text-gray-600">This ensures your setup is perfectly suited to your needs</p>
            </div>

            <RadioGroup
              value={selectedType}
              onValueChange={(value) => setSelectedType(value as AccountType)}
              className="space-y-4"
            >
              {accountTypes.map((type) => {
                const IconComponent = type.icon
                const isSelected = selectedType === type.id
                return (
                  <div key={type.id} className="relative">
                    <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                    <Label
                      htmlFor={type.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium text-gray-900">{type.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-normal">{type.description}</p>
                      </div>
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-purple-600 bg-white" : "border-gray-300"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-purple-600" />}
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>

            <div className="flex gap-4">
              <Button
                onClick={handleContinue}
                disabled={!selectedType}
                className={`flex-1 h-10 font-normal rounded-lg ${
                  selectedType
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue →
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="px-8 h-10 border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent rounded-lg font-normal"
              >
                Cancel
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Need help? </span>
              <button className="text-purple-600 hover:underline">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
