"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Clock } from "lucide-react"

interface JourneyStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
  date?: string
}

interface JourneyTrackerProps {
  steps: JourneyStep[]
  currentStepIndex: number
  overallProgress: number
}

export function JourneyTracker({ steps, currentStepIndex, overallProgress }: JourneyTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Medical Journey</CardTitle>
        <CardDescription>Track your progress and next steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        <div className="space-y-4 mt-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  step.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : step.status === "current"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.status === "completed" ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{step.title}</h4>
                  {step.date && <span className="text-xs text-gray-500">{step.date}</span>}
                </div>
                <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                {step.status === "current" && (
                  <Button variant="link" className="p-0 h-auto mt-1 text-blue-600">
                    View details <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
