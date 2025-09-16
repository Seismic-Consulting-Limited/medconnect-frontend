// lib/types/hospital.ts

// Raw objects as returned by backend (detail + list share many fields)
export type NamedItem = string | { name?: string; id?: string; description?: string };

export interface HospitalListDTO {
  id: string | number;
  name: string;
  description?: string;
  city?: string;
  state?: string;
  country?: string;
  address_1?: string;
  address?: string;
  rating?: number;
  reviews_count?: number;
  cover_image_url?: string;
  logo_url?: string;
  profile_image?: string;
  images?: string[];
  specialties?: NamedItem[];
  accreditations?: NamedItem[]; // backend now uses `name`
  languages?: NamedItem[];
}

export interface HospitalDetailDTO extends HospitalListDTO {
  // detail often includes more fields; keep all optional to be resilient
  fullDescription?: string;
  facilities?: NamedItem[];
  treatments?: NamedItem[];
  beds?: number;
  doctors?: number;
  founded?: number;
  internationalPatients?: string;
}

// UI model used by the app
export interface HospitalUI {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;

  image: string;
  images: string[];

  rating: number;
  reviews: number;

  specialties: string[];
  accreditations: string[]; // flattened names
  languages: string[];
  facilities: string[];
  treatments: string[];

  // Optional stats
  beds?: number;
  doctors?: number;
  founded?: number;
  internationalPatients?: string;
}
