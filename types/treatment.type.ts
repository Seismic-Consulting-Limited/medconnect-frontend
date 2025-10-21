export type Treatment = {
  id: string
  name: string
  description: string
  abbreviation?: string
  price_range_from: number
  price_range_to: number
  currency: string
  duration_in_days: number
  hospital_stay_period_in_days: number
  recovery_period_in_days: number
  success_rate_percentage?: number
  hospitalId: string
  createdAt: string
  updatedAt: string
}

export type SystemTreatment = {
  id: string
  name: string
  abbreviation?: string
  description: string
}

export type CreateTreatmentData = {
  name: string
  description: string
  abbreviation?: string
  price_range_from: number
  price_range_to: number
  currency: string
  duration_in_days: number
  hospital_stay_period_in_days: number
  recovery_period_in_days: number
  success_rate_percentage?: number
}

export type TreatmentApiPayload = {
  treatments: Array<{
    treatment: string // UUID for existing system treatments
    price_range_from: number
    price_range_to: number
    currency: string
    duration_in_days: number
    hospital_stay_period_in_days: number
    recovery_period_in_days: number
    success_rate_percentage: number
  }>
  extra_treatments: Array<{
    name: string
    description: string
    abbreviation: string
    price_range_from: number
    price_range_to: number
    currency: string
    duration_in_days: number
    hospital_stay_period_in_days: number
    recovery_period_in_days: number
    success_rate_percentage: number
  }>
}
