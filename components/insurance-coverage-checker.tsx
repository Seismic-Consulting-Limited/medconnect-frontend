"use client"

import type React from "react"

import { useState } from "react"
import { Check, HelpCircle, Info, Search, Shield, X } from "lucide-react"
import { DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define types for our data structures
type CoverageInfo = {
  covered: boolean
  inNetwork: boolean
  coveragePercent: number
  requiresPreAuth: boolean
  notes: string
}

type ProcedureCoverageInfo = {
  covered: boolean
  coveragePercent: number
  requiresPreAuth: boolean
  maxBenefit: string
}

type InsurancePlan = {
  [planName: string]: CoverageInfo
}

type ProviderCoverage = {
  [providerId: string]: InsurancePlan
}

type HospitalCoverage = {
  [hospitalId: string]: ProviderCoverage
}

type ProcedureTypicalCoverage = {
  [providerId: string]: {
    [planName: string]: ProcedureCoverageInfo
  }
}

type ProcedureInfo = {
  name: string
  typicalCoverage: ProcedureTypicalCoverage
}

type ProcedureCoverageData = {
  [procedureId: string]: ProcedureInfo
}

// Sample insurance providers
const insuranceProviders = [
  { id: "aetna", name: "Aetna" },
  { id: "bluecross", name: "Blue Cross Blue Shield" },
  { id: "cigna", name: "Cigna" },
  { id: "humana", name: "Humana" },
  { id: "kaiser", name: "Kaiser Permanente" },
  { id: "united", name: "UnitedHealthcare" },
  { id: "medicare", name: "Medicare" },
  { id: "medicaid", name: "Medicaid" },
  { id: "other", name: "Other Insurance" },
]

// Sample insurance plans
const insurancePlans: { [key: string]: string[] } = {
  aetna: ["Aetna Select", "Aetna Choice POS II", "Aetna Medicare Advantage", "Aetna International"],
  bluecross: ["BlueCard PPO", "Blue Choice", "Federal Employee Program", "BlueSelect", "Global Core"],
  cigna: ["Open Access Plus", "Cigna Connect", "Cigna Global Health", "Cigna Expat Insurance"],
  humana: ["Humana Gold Plus HMO", "Humana Choice PPO", "Humana Global Medical Plan"],
  kaiser: ["KP Signature", "Added Choice", "Global Health Plan"],
  united: ["UnitedHealthcare Choice", "UnitedHealthcare Options PPO", "UnitedHealthcare Global"],
  medicare: ["Medicare Part A", "Medicare Part B", "Medicare Advantage", "Medicare Supplement"],
  medicaid: ["Standard Medicaid"],
  other: ["International Plan", "Domestic Plan", "Travel Insurance"],
}

// Sample coverage data (mock)
const coverageData: HospitalCoverage = {
  "1": {
    // Bangkok International Hospital
    aetna: {
      "Aetna International": {
        covered: true,
        inNetwork: true,
        coveragePercent: 80,
        requiresPreAuth: true,
        notes: "Requires pre-authorization for non-emergency procedures",
      },
      "Aetna Select": {
        covered: false,
        inNetwork: false,
        coveragePercent: 0,
        requiresPreAuth: true,
        notes: "No international coverage",
      },
    },
    cigna: {
      "Cigna Global Health": {
        covered: true,
        inNetwork: true,
        coveragePercent: 90,
        requiresPreAuth: true,
        notes: "Preferred international provider",
      },
      "Cigna Expat Insurance": {
        covered: true,
        inNetwork: true,
        coveragePercent: 85,
        requiresPreAuth: true,
        notes: "Covered for expats",
      },
    },
    bluecross: {
      "Global Core": {
        covered: true,
        inNetwork: false,
        coveragePercent: 70,
        requiresPreAuth: true,
        notes: "Out-of-network coverage applies",
      },
    },
    united: {
      "UnitedHealthcare Global": {
        covered: true,
        inNetwork: true,
        coveragePercent: 80,
        requiresPreAuth: true,
        notes: "Covered under global plan",
      },
    },
  },
  "2": {
    // Indira Gandhi Memorial Hospital
    aetna: {
      "Aetna International": {
        covered: true,
        inNetwork: false,
        coveragePercent: 60,
        requiresPreAuth: true,
        notes: "Out-of-network coverage applies",
      },
    },
    cigna: {
      "Cigna Global Health": {
        covered: true,
        inNetwork: false,
        coveragePercent: 70,
        requiresPreAuth: true,
        notes: "Out-of-network provider",
      },
    },
    bluecross: {
      "Global Core": {
        covered: true,
        inNetwork: false,
        coveragePercent: 60,
        requiresPreAuth: true,
        notes: "Limited coverage",
      },
    },
  },
  "3": {
    // Bumrungrad International Hospital
    aetna: {
      "Aetna International": {
        covered: true,
        inNetwork: true,
        coveragePercent: 85,
        requiresPreAuth: true,
        notes: "Preferred international provider",
      },
    },
    cigna: {
      "Cigna Global Health": {
        covered: true,
        inNetwork: true,
        coveragePercent: 90,
        requiresPreAuth: true,
        notes: "Premium coverage available",
      },
      "Cigna Expat Insurance": {
        covered: true,
        inNetwork: true,
        coveragePercent: 90,
        requiresPreAuth: true,
        notes: "Preferred provider for expats",
      },
    },
    bluecross: {
      "Global Core": {
        covered: true,
        inNetwork: true,
        coveragePercent: 80,
        requiresPreAuth: true,
        notes: "In-network international provider",
      },
    },
    united: {
      "UnitedHealthcare Global": {
        covered: true,
        inNetwork: true,
        coveragePercent: 85,
        requiresPreAuth: true,
        notes: "Preferred global provider",
      },
    },
  },
}

// Sample procedures with coverage info
const procedureCoverage: ProcedureCoverageData = {
  "heart-bypass": {
    name: "Coronary Artery Bypass",
    typicalCoverage: {
      aetna: {
        "Aetna International": {
          covered: true,
          coveragePercent: 80,
          requiresPreAuth: true,
          maxBenefit: "$50,000",
        },
      },
      cigna: {
        "Cigna Global Health": {
          covered: true,
          coveragePercent: 90,
          requiresPreAuth: true,
          maxBenefit: "$75,000",
        },
      },
    },
  },
  "knee-replacement": {
    name: "Total Knee Replacement",
    typicalCoverage: {
      aetna: {
        "Aetna International": {
          covered: true,
          coveragePercent: 80,
          requiresPreAuth: true,
          maxBenefit: "$30,000",
        },
      },
      cigna: {
        "Cigna Global Health": {
          covered: true,
          coveragePercent: 85,
          requiresPreAuth: true,
          maxBenefit: "$35,000",
        },
      },
    },
  },
  "hip-replacement": {
    name: "Hip Replacement",
    typicalCoverage: {
      aetna: {
        "Aetna International": {
          covered: true,
          coveragePercent: 80,
          requiresPreAuth: true,
          maxBenefit: "$30,000",
        },
      },
      cigna: {
        "Cigna Global Health": {
          covered: true,
          coveragePercent: 85,
          requiresPreAuth: true,
          maxBenefit: "$35,000",
        },
      },
    },
  },
}

interface InsuranceCoverageCheckerProps {
  hospitalIds?: string[]
  onClose?: () => void
  standalone?: boolean
}

export function InsuranceCoverageChecker({
  hospitalIds = [],
  onClose,
  standalone = false,
}: InsuranceCoverageCheckerProps) {
  const [provider, setProvider] = useState("")
  const [plan, setPlan] = useState("")
  const [memberId, setMemberId] = useState("")
  const [procedure, setProcedure] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("hospitals")

  // Get available plans based on selected provider
  const availablePlans = provider ? insurancePlans[provider] || [] : []

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsChecking(true)
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false)
      setShowResults(true)
    }, 1500)
  }

  // Reset form
  const handleReset = () => {
    setProvider("")
    setPlan("")
    setMemberId("")
    setProcedure("")
    setShowResults(false)
  }

  // Get coverage for a specific hospital
  const getHospitalCoverage = (hospitalId: string): CoverageInfo | null => {
    if (!provider || !plan) return null

    const hospitalCoverage = coverageData[hospitalId]
    if (!hospitalCoverage) return null

    const providerCoverage = hospitalCoverage[provider]
    if (!providerCoverage) return null

    return providerCoverage[plan] || null
  }

  // Get procedure coverage
  const getProcedureCoverage = (procedureId: string): ProcedureCoverageInfo | null => {
    if (!provider || !plan || !procedureId) return null

    const procCoverage = procedureCoverage[procedureId]
    if (!procCoverage) return null

    const providerCoverage = procCoverage.typicalCoverage[provider]
    if (!providerCoverage) return null

    return providerCoverage[plan] || null
  }

  return (
    <div className={standalone ? "" : "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"}>
      <Card className={`bg-white ${standalone ? "w-full" : "w-full max-w-4xl max-h-[90vh] overflow-auto"}`}>
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Insurance Coverage Checker
              </CardTitle>
              <CardDescription className="text-white/80 mt-1">
                Check if your insurance covers treatment at international hospitals
              </CardDescription>
            </div>
            {!standalone && onClose && (
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {!showResults ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="insurance-provider">Insurance Provider</Label>
                  <Select value={provider} onValueChange={setProvider} required>
                    <SelectTrigger id="insurance-provider">
                      <SelectValue placeholder="Select your insurance provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {insuranceProviders.map((insurer) => (
                        <SelectItem key={insurer.id} value={insurer.id}>
                          {insurer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance-plan">Insurance Plan</Label>
                  <Select
                    value={plan}
                    onValueChange={setPlan}
                    disabled={!provider || availablePlans.length === 0}
                    required
                  >
                    <SelectTrigger id="insurance-plan">
                      <SelectValue placeholder={provider ? "Select your plan" : "Select provider first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePlans.map((planName) => (
                        <SelectItem key={planName} value={planName}>
                          {planName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="member-id">Member ID (Optional)</Label>
                <Input
                  id="member-id"
                  placeholder="Enter your member ID for more accurate results"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Your ID is only used to check coverage and is not stored on our servers.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="procedure">Procedure (Optional)</Label>
                <Select value={procedure} onValueChange={setProcedure}>
                  <SelectTrigger id="procedure">
                    <SelectValue placeholder="Select a procedure to check coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heart-bypass">Coronary Artery Bypass</SelectItem>
                    <SelectItem value="knee-replacement">Total Knee Replacement</SelectItem>
                    <SelectItem value="hip-replacement">Hip Replacement</SelectItem>
                    <SelectItem value="spine-surgery">Spine Surgery</SelectItem>
                    <SelectItem value="dental-implants">Dental Implants</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={!provider || !plan}>
                  {isChecking ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                      Checking Coverage...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check Coverage
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                <div className="text-purple-500 mt-1">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Coverage Information</h3>
                  <p className="text-gray-600 text-sm">
                    Results are based on general coverage information for{" "}
                    <span className="font-medium">
                      {insuranceProviders.find((p) => p.id === provider)?.name} - {plan}
                    </span>
                    . For exact coverage details, please contact your insurance provider directly.
                  </p>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="hospitals">Hospital Coverage</TabsTrigger>
                  <TabsTrigger value="procedures">Procedure Coverage</TabsTrigger>
                </TabsList>

                <TabsContent value="hospitals" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Coverage at Selected Hospitals</h3>

                    {hospitalIds.length === 0 ? (
                      <p className="text-gray-500">No hospitals selected for coverage check.</p>
                    ) : (
                      <div className="grid gap-4">
                        {hospitalIds.map((hospitalId) => {
                          const coverage = getHospitalCoverage(hospitalId)
                          const hospital = {
                            "1": "Bangkok International Hospital",
                            "2": "Indira Gandhi Memorial Hospital",
                            "3": "Bumrungrad International Hospital",
                            "4": "Apollo Hospitals",
                            "5": "Gleneagles Hospital",
                            "6": "Anadolu Medical Center",
                          }[hospitalId]

                          return (
                            <Card key={hospitalId} className="overflow-hidden">
                              <div
                                className={`px-4 py-2 text-sm font-medium ${
                                  coverage?.covered
                                    ? coverage.inNetwork
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {coverage?.covered
                                  ? coverage.inNetwork
                                    ? "In-Network Coverage"
                                    : "Out-of-Network Coverage"
                                  : "Not Covered"}
                              </div>
                              <CardContent className="p-4">
                                <h4 className="font-medium">{hospital}</h4>
                                {coverage ? (
                                  <div className="mt-2 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500">Coverage Percentage:</span>
                                      <span className="font-medium">{coverage.coveragePercent}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500">Pre-Authorization Required:</span>
                                      <span className="font-medium">{coverage.requiresPreAuth ? "Yes" : "No"}</span>
                                    </div>
                                    {coverage.notes && (
                                      <div className="text-sm mt-2 pt-2 border-t border-gray-100">
                                        <span className="text-gray-500">Notes:</span>
                                        <p className="mt-1">{coverage.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-2">
                                    No coverage information available for this hospital with your selected insurance.
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    )}

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Other Hospitals with Coverage</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {Object.entries(coverageData)
                          .filter(([hospitalId]) => !hospitalIds.includes(hospitalId))
                          .map(([hospitalId, hospitalCoverage]) => {
                            const providerCoverage = hospitalCoverage[provider]
                            if (!providerCoverage) return null

                            const planCoverage = providerCoverage[plan]
                            if (!planCoverage || !planCoverage.covered) return null

                            const hospital = {
                              "1": "Bangkok International Hospital",
                              "2": "Indira Gandhi Memorial Hospital",
                              "3": "Bumrungrad International Hospital",
                              "4": "Apollo Hospitals",
                              "5": "Gleneagles Hospital",
                              "6": "Anadolu Medical Center",
                            }[hospitalId]

                            return (
                              <Card key={hospitalId} className="overflow-hidden">
                                <div
                                  className={`px-4 py-2 text-sm font-medium ${
                                    planCoverage.inNetwork
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {planCoverage.inNetwork ? "In-Network Coverage" : "Out-of-Network Coverage"}
                                </div>
                                <CardContent className="p-4">
                                  <h4 className="font-medium">{hospital}</h4>
                                  <div className="mt-2 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500">Coverage Percentage:</span>
                                      <span className="font-medium">{planCoverage.coveragePercent}%</span>
                                    </div>
                                    {planCoverage.notes && (
                                      <div className="text-sm mt-2 pt-2 border-t border-gray-100">
                                        <p className="text-gray-700">{planCoverage.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })
                          .filter(Boolean)}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="procedures" className="pt-4">
                  {procedure ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Coverage for {procedureCoverage[procedure]?.name}</h3>

                      {getProcedureCoverage(procedure) ? (
                        <Card>
                          <CardContent className="p-4 space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Coverage Details</h4>
                                <div className="mt-2 space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Coverage Percentage:</span>
                                    <span className="font-medium">
                                      {getProcedureCoverage(procedure)?.coveragePercent}%
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Maximum Benefit:</span>
                                    <span className="font-medium">{getProcedureCoverage(procedure)?.maxBenefit}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Pre-Authorization:</span>
                                    <span className="font-medium">
                                      {getProcedureCoverage(procedure)?.requiresPreAuth ? "Required" : "Not Required"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Cost Comparison</h4>
                                <div className="mt-2 space-y-2">
                                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                                    <div className="text-purple-500 mt-1">
                                      <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-gray-800">Cost Comparison</h3>
                                      <p className="text-gray-600 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">US Average Cost:</span>
                                          <span className="font-medium">$85,000 - $150,000</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">International Average:</span>
                                          <span className="font-medium">$15,000 - $30,000</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Potential Savings:</span>
                                          <span className="font-medium text-green-600">$70,000 - $120,000</span>
                                        </div>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Coverage Notes</h4>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>
                                    Your plan typically covers this procedure when performed at in-network international
                                    facilities.
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>
                                    Pre-authorization is required at least 14 days before the scheduled procedure.
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>
                                    Follow-up care in your home country may be covered under your regular benefits.
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-gray-800">
                            No specific coverage information available for this procedure with your selected insurance
                            plan. Please contact your insurance provider for details.
                          </p>
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-3">Other Procedures with Coverage</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          {Object.entries(procedureCoverage)
                            .filter(([id]) => id !== procedure)
                            .map(([id, proc]) => {
                              const providerCoverage = proc.typicalCoverage[provider]
                              if (!providerCoverage) return null

                              const planCoverage = providerCoverage[plan]
                              if (!planCoverage || !planCoverage.covered) return null

                              return (
                                <Card key={id}>
                                  <CardContent className="p-4">
                                    <h4 className="font-medium">{proc.name}</h4>
                                    <div className="mt-2 space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Coverage:</span>
                                        <span className="font-medium">{planCoverage.coveragePercent}%</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Max Benefit:</span>
                                        <span className="font-medium">{planCoverage.maxBenefit}</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })
                            .filter(Boolean)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <HelpCircle className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Procedure Selected</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Please select a specific procedure to see detailed coverage information, including coverage
                        percentages and potential out-of-pocket costs.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setActiveTab("hospitals")
                          setShowResults(false)
                        }}
                      >
                        Go Back to Form
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 p-4 border-t flex justify-between items-center">
          {showResults ? (
            <>
              <div className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-sm text-gray-500">
                        <Info className="h-4 w-4 mr-1" />
                        Coverage information last updated: May 2023
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Coverage details may change. Always verify with your insurance provider before making decisions.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  Check Another Plan
                </Button>
                {!standalone && onClose && <Button onClick={onClose}>Close</Button>}
              </div>
            </>
          ) : (
            <div className="w-full text-center text-sm text-gray-500">
              Your insurance information is only used to check coverage and is not stored on our servers.
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
