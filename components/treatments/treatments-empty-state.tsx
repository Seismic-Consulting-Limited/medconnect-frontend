"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TreatmentsEmptyStateProps {
  onAddTreatment: () => void
}

export function TreatmentsEmptyState({ onAddTreatment }: TreatmentsEmptyStateProps) {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="text-center">
          <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-yellow-300"></div>
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-orange-200 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              </div>
              <div className="absolute -bottom-1 -left-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-300"></div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">No Treatments Added</h3>

          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            You haven't added any treatments yet. Add treatments to showcase your hospital's medical services to
            patients.
          </p>

          <Button onClick={onAddTreatment} className="gap-2 bg-primary hover:bg-primary/90 text-white">
            + Add Treatments
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
