export interface TravelAgentLocation {
  address_1: string;
  state: {
    id: number;
    name: string;
    code: string;
  };
}

export interface TravelAgentDashboardData {
  email?: string;
  id?: string;
  name?: string;
  rating?: number;
  description?: string;
  year_founded?: string;
  years_of_experience?: number;
  phone_number_1?: string;
  phone_number_2?: string | null;
  website_url?: string;
  registration_number?: string;
  destinations?: any[];
  hospital_partners?: any[];
  location?: TravelAgentLocation;
  services?: any[];
}

export type TravelAgentDTO = {
  id: string | number
  name: string
  description?: string
  year_founded?: string
  years_of_experience?: number
  phone_number_1?: string
  phone_number_2?: string
  website_url?: string
  registration_number?: string
  rating?: number
  reviews_count?: number
  cover_image_url?: string
  logo_url?: string
  profile_image?: string
  destinations?: Array<{ state_id: number; name: string; code: string } | string>
  services?: Array<{ id: number; name: string } | string>
  hospital_partners?: Array<{ id: string; name: string } | string>
  location?: {
    address_1?: string
    state?: {
      id: number
      name: string
      code: string
    }
  }
  certifications?: Array<{ name: string } | string>
  languages?: string[]
  price_tier?: 1 | 2 | 3 | "$" | "$$" | "$$$"
  images?: string[]
  full_description?: string
  international_clients?: string
}

export type TravelAgentUI = {
  id: string
  name: string
  description: string
  fullDescription?: string
  location?: string
  address?: string
  state?: string
  country?: string
  image?: string
  rating: number
  reviews: number
  destinations: string[]
  services: string[]
  hospitalPartners: string[]
  certifications: string[]
  price: "$" | "$$" | "$$$"
  languages?: string[]
  yearFounded?: string
  yearsOfExperience?: number
  phoneNumber1?: string
  phoneNumber2?: string
  websiteUrl?: string
  registrationNumber?: string
  images?: string[]
  internationalClients?: string
}
