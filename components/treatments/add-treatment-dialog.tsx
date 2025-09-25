"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CreateTreatmentData } from "@/lib/types/treatment"

interface AddTreatmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateTreatmentData) => void
}

export function AddTreatmentDialog({ open, onOpenChange, onSubmit }: AddTreatmentDialogProps) {
  const [formData, setFormData] = useState<CreateTreatmentData>({
    name: "",
    description: "",
    abbreviation: "",
    price_range_from: 0,
    price_range_to: 0,
    currency: "NGN",
    duration_in_days: 0,
    hospital_stay_period_in_days: 0,
    recovery_period_in_days: 0,
    success_rate_percentage: 95,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: "",
      description: "",
      abbreviation: "",
      price_range_from: 0,
      price_range_to: 0,
      currency: "NGN",
      duration_in_days: 0,
      hospital_stay_period_in_days: 0,
      recovery_period_in_days: 0,
      success_rate_percentage: 95,
    })
  }

  const handleChange = (field: keyof CreateTreatmentData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Treatment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Treatment Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Cardiac Surgery"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abbreviation">Abbreviation</Label>
              <Input
                id="abbreviation"
                value={formData.abbreviation || ""}
                onChange={(e) => handleChange("abbreviation", e.target.value)}
                placeholder="e.g., CS"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the treatment procedure, benefits, and what patients can expect..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_from">Price From (₦) *</Label>
              <Input
                id="price_from"
                type="number"
                value={formData.price_range_from}
                onChange={(e) => handleChange("price_range_from", Number(e.target.value))}
                placeholder="e.g., 100000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_to">Price To (₦) *</Label>
              <Input
                id="price_to"
                type="number"
                value={formData.price_range_to}
                onChange={(e) => handleChange("price_range_to", Number(e.target.value))}
                placeholder="e.g., 500000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days) *</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration_in_days}
                onChange={(e) => handleChange("duration_in_days", Number(e.target.value))}
                placeholder="e.g., 1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recovery">Recovery Period (days) *</Label>
              <Input
                id="recovery"
                type="number"
                value={formData.recovery_period_in_days}
                onChange={(e) => handleChange("recovery_period_in_days", Number(e.target.value))}
                placeholder="e.g., 14"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospital_stay">Hospital Stay (days) *</Label>
              <Input
                id="hospital_stay"
                type="number"
                value={formData.hospital_stay_period_in_days}
                onChange={(e) => handleChange("hospital_stay_period_in_days", Number(e.target.value))}
                placeholder="e.g., 3"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
              Add Treatment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
