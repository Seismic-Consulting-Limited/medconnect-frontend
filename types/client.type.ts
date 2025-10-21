export interface ClientRegisterProp {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    other_name?: string,
    terms_of_service_agreement_checked: boolean,
    role: string
}

export interface ClientRegisterResponseProp {
  
}

export interface ClientLoginProp {
  email: string;
  password?: string;
  otp?: string; 
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface ClientStats {
  upcoming_appointments?: number;
  completed_appointments?: number;
  medical_records?: number;
  travel_bookings?: number;
}

export interface ClientAppointment {
  id: string;
  hospital_name?: string;
  doctor_name?: string;
  appointment_date?: string;
  status?: "upcoming" | "completed" | "cancelled";
  type?: string;
}

export interface ClientActivity {
  id: string;
  title?: string;
  description?: string;
  created_at?: string;
  type?: "appointment" | "record" | "travel" | "general";
}

export interface ClientDashboardData {
  stats?: ClientStats;
  appointments?: ClientAppointment[];
  activities?: ClientActivity[];
  profile_completion?: number;
}