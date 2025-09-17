import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"
import { authService } from "@/lib/auth"

export interface ClientStats {
  upcoming_appointments?: number
  completed_appointments?: number
  medical_records?: number
  travel_bookings?: number
}

export interface ClientAppointment {
  id: string
  hospital_name?: string
  doctor_name?: string
  appointment_date?: string
  status?: "upcoming" | "completed" | "cancelled"
  type?: string
}

export interface ClientActivity {
  id: string
  title?: string
  description?: string
  created_at?: string
  type?: "appointment" | "record" | "travel" | "general"
}

export interface ClientDashboardData {
  stats?: ClientStats
  appointments?: ClientAppointment[]
  activities?: ClientActivity[]
  profile_completion?: number
}

export interface HospitalStats {
  doctors?: number
  nurses?: number
  beds?: number
}

export interface HospitalDoctor {
  id: string
  name?: string
  full_name?: string
  first_name?: string
  last_name?: string
  primary_specialty?: string
  profile_status?: string
}

export interface HospitalActivity {
  id: string
  title?: string
  description?: string
  created_at?: string
}

export interface HospitalFacility {
  id: number
  name: string
  description: string
}

export interface HospitalLocation {
  address_1: string
  state: {
    id: number
    name: string
    code: string
  }
}

export interface HospitalDashboardData {
  email?: string
  id?: string
  name?: string
  is_approved?: boolean
  profile_image?: string | null
  rating?: number
  description?: string
  facilities?: HospitalFacility[]
  location?: HospitalLocation
  languages?: any[]
  specialties?: any[]
  treatments?: any[]
  accreditations?: any[]
  // Legacy fields for backward compatibility
  counts?: HospitalStats
  doctors?: HospitalDoctor[]
  activities?: HospitalActivity[]
  profile_completion?: number
}

export interface TravelAgentLocation {
  address_1: string
  state: {
    id: number
    name: string
    code: string
  }
}

export interface TravelAgentDashboardData {
  email?: string
  id?: string
  name?: string
  rating?: number
  description?: string
  year_founded?: string
  years_of_experience?: number
  phone_number_1?: string
  phone_number_2?: string | null
  website_url?: string
  registration_number?: string
  destinations?: any[]
  hospital_partners?: any[]
  location?: TravelAgentLocation
  services?: any[]
}

export class DashboardService {
  private static instance: DashboardService

  public static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService()
    }
    return DashboardService.instance
  }

  private async validateAuthOrThrow(): Promise<void> {
    const token = authService.getToken()
    if (!token) {
      throw new Error("Authentication required. Please log in again.")
    }
  }

  // Client dashboard methods
  public async getClientDashboard(): Promise<ClientDashboardData> {
    try {
      await this.validateAuthOrThrow()

      const response = await apiRequest<{ data: ClientDashboardData }>(
        API_ENDPOINTS.DASHBOARD.CLIENT,
        {
          method: HTTP_METHODS.GET,
        },
        {
          auth: true,
          getToken: () => authService.getToken(),
        },
      )

      if (response.data) {
        return response.data
      }

      // Only fall back to mock data if API returns empty data
      return {
        stats: {
          upcoming_appointments: 2,
          completed_appointments: 5,
          medical_records: 3,
          travel_bookings: 1,
        },
        appointments: [
          {
            id: "1",
            doctor_name: "Dr. Sarah Johnson",
            hospital_name: "City General Hospital",
            type: "Consultation",
            appointment_date: new Date(Date.now() + 86400000).toISOString(),
            status: "upcoming",
          },
          {
            id: "2",
            doctor_name: "Dr. Michael Chen",
            hospital_name: "Medical Center Plus",
            type: "Follow-up",
            appointment_date: new Date(Date.now() + 172800000).toISOString(),
            status: "upcoming",
          },
        ],
        activities: [
          {
            id: "1",
            title: "Appointment Scheduled",
            description: "Consultation with Dr. Sarah Johnson",
            created_at: new Date().toISOString(),
            type: "appointment",
          },
          {
            id: "2",
            title: "Medical Record Updated",
            description: "Lab results added to your profile",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            type: "record",
          },
        ],
        profile_completion: 75,
      }
    } catch (error) {
      console.error("Failed to fetch client dashboard:", error)

      if (error instanceof Error && error.message.includes("Authentication required")) {
        throw error
      }

      // Return mock data for other errors
      return {
        stats: {
          upcoming_appointments: 2,
          completed_appointments: 5,
          medical_records: 3,
          travel_bookings: 1,
        },
        appointments: [],
        activities: [],
        profile_completion: 75,
      }
    }
  }

  public async getClientAppointments(): Promise<ClientAppointment[]> {
    try {
      return [
        {
          id: "1",
          doctor_name: "Dr. Sarah Johnson",
          hospital_name: "City General Hospital",
          type: "Consultation",
          appointment_date: new Date(Date.now() + 86400000).toISOString(),
          status: "upcoming",
        },
      ]
    } catch (error) {
      console.error("Failed to fetch client appointments:", error)
      throw error
    }
  }

  public async getClientStats(): Promise<ClientStats> {
    try {
      return {
        upcoming_appointments: 2,
        completed_appointments: 5,
        medical_records: 3,
        travel_bookings: 1,
      }
    } catch (error) {
      console.error("Failed to fetch client stats:", error)
      throw error
    }
  }

  // Hospital dashboard methods
  public async getHospitalDashboard(): Promise<HospitalDashboardData> {
    try {
      await this.validateAuthOrThrow()

      const response = await apiRequest<{ data: HospitalDashboardData }>(
        API_ENDPOINTS.DASHBOARD.HOSPITAL,
        {
          method: HTTP_METHODS.GET,
        },
        {
          auth: true,
          getToken: () => authService.getToken(),
        },
      )

      // Return the actual API data
      return response.data || {}
    } catch (error) {
      console.error("Failed to fetch hospital dashboard:", error)
      throw error
    }
  }

  // Travel agent dashboard methods
  public async getTravelAgentDashboard(): Promise<TravelAgentDashboardData> {
    try {
      await this.validateAuthOrThrow()

      const response = await apiRequest<{ data: TravelAgentDashboardData }>(
        API_ENDPOINTS.DASHBOARD.TRAVEL_AGENT,
        {
          method: HTTP_METHODS.GET,
        },
        {
          auth: true,
          getToken: () => authService.getToken(),
        },
      )
      return response.data || {}
    } catch (error) {
      console.error("Failed to fetch travel agent dashboard:", error)
      return {
        name: "Sample Travel Agency",
        email: "agency@example.com",
        description: "Professional medical tourism services",
        rating: 0,
        years_of_experience: 5,
        phone_number_1: "+1234567890",
        website_url: "https://example.com",
        registration_number: "REG123456",
        destinations: [],
        hospital_partners: [],
        services: [],
        location: {
          address_1: "123 Main Street",
          state: {
            id: 1,
            name: "Sample State",
            code: "SS",
          },
        },
      }
    }
  }
}

export const dashboardService = DashboardService.getInstance()
