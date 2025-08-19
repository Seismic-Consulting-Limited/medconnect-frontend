"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Building2, Plane } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type AccountType = "client" | "hospital" | "travel-agent"

export default function SignupPage() {
  const [selectedType, setSelectedType] = useState<AccountType | "">("")
  const router = useRouter()

  const handleContinue = () => {
    if (!selectedType) return

    // Route to specific signup flow based on account type
    router.push(`/user/auth/signup/${selectedType}`)
  }

  const accountTypes = [
    {
      id: "client" as AccountType,
      title: "Client",
      description: "Clients seeking trusted doctors or hospitals for medical care in Nigeria.",
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
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[529px]">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Choose Account Type</CardTitle>
            <p className="text-muted-foreground">This ensures your setup is perfectly suited to your needs</p>
          </CardHeader>

          <CardContent className="space-y-6">
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
                      className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-all ${
                        isSelected ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-foreground">{type.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                      </div>
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>

            <Button
              onClick={handleContinue}
              disabled={!selectedType}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium disabled:bg-muted disabled:text-muted-foreground"
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
