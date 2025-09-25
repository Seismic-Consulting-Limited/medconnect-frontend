export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const API_CONFIG = {
  // No trailing slash
  BASE_URL: (
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.medkonent.com"
  ).replace(/\/+$/, ""),
  TIMEOUT: 30000,
} as const;

export const API_VERSION_PREFIX = "/v1";

export const API_ENDPOINTS = {
  AUTH: {
    // Patients
    SIGNUP: `${API_VERSION_PREFIX}/auth/patients/signup/`,
    // Hospitals
    SIGNUP_HOSPITAL: `${API_VERSION_PREFIX}/auth/hospital/signup/`,
    // Travel Agents
    SIGNUP_TRAVEL_AGENT: `${API_VERSION_PREFIX}/auth/travel-agent/signup/`,
    // OTP (signup verification)
    VERIFY_OTP: `${API_VERSION_PREFIX}/auth/signup/otp/verify/`,
    RESEND_OTP: `${API_VERSION_PREFIX}/auth/signup/otp/resend/`,
    // Login (password + OTP)
    LOGIN: `${API_VERSION_PREFIX}/auth/signin/`,
    SIGNIN_OTP_INIT: `${API_VERSION_PREFIX}/auth/signin/otp/`,
    SIGNIN_OTP_VERIFY: `${API_VERSION_PREFIX}/auth/signin/otp/verify/`,
    // Password reset
    PASSWORD_RESET: `${API_VERSION_PREFIX}/auth/password-reset/`,
    PASSWORD_RESET_CONFIRM: `${API_VERSION_PREFIX}/auth/password-reset/confirm/`,
    LOGOUT: `${API_VERSION_PREFIX}/auth/logout/`,
    REFRESH: `${API_VERSION_PREFIX}/auth/refresh/`,
  },

  USER: {
    PROFILE: `${API_VERSION_PREFIX}/user/profile/`,
    UPDATE: `${API_VERSION_PREFIX}/user/update/`,
    HOSPITALS_DASHBOARD: `${API_VERSION_PREFIX}/hospitals/dashboard`,
  },

  DASHBOARD: {
    CLIENT: `${API_VERSION_PREFIX}/patients/dashboard`,
    HOSPITAL: `${API_VERSION_PREFIX}/hospitals/dashboard`,
    TRAVEL_AGENT: `${API_VERSION_PREFIX}/travel-agents/dashboard`,
  },

  CLIENT: {
    APPOINTMENTS: `${API_VERSION_PREFIX}/patients/appointments`,
    APPOINTMENT_DETAIL: (appointmentId: string) =>
      `${API_VERSION_PREFIX}/patients/appointments/${appointmentId}`,
    MEDICAL_RECORDS: `${API_VERSION_PREFIX}/patients/medical-records`,
    ACTIVITIES: `${API_VERSION_PREFIX}/patients/activities`,
    STATS: `${API_VERSION_PREFIX}/patients/stats`,
  },

  // Hospital-specific endpoints
  HOSPITAL: {
    // Add endpoints (for adding new items)
    MEDICAL_STAFF: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/medical-staff/add/`,
    TREATMENTS: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/treatments/add/`,
    FACILITIES: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/facilities/add/`,
    SPECIALTIES: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/specialties/add/`,

    // Fetch endpoints (for getting existing items)
    GET_TREATMENTS: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/treatments/`,
    GET_FACILITIES: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/facilities/`,
    GET_SPECIALTIES: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/specialties/`,
    GET_MEDICAL_STAFF: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/medical-staff/`,
  },

  TREATMENTS: {
    SYSTEM: `${API_VERSION_PREFIX}/treatments/`,
  },

  // Shared metadata + lookups
  META: {
    COUNTRIES: `${API_VERSION_PREFIX}/countries`,
    STATES: (countryId: string | number) =>
      `${API_VERSION_PREFIX}/countries/${countryId}/states`,
    SERVICES: (type: string) =>
      `${API_VERSION_PREFIX}/services/${
        type ? `?type=${encodeURIComponent(type)}` : ""
      }`,
    FACILITIES: `${API_VERSION_PREFIX}/facilities/`, // System-wide facilities
    SPECIALTIES: `${API_VERSION_PREFIX}/specialties/`, // System-wide specialties
    LANGUAGES: `${API_VERSION_PREFIX}/languages/`,
    USER_TYPES: `${API_VERSION_PREFIX}/user-types/`,
    HOSPITALS: `${API_VERSION_PREFIX}/hospitals`,
    HOSPITAL_DETAIL: (hospitalId: string) =>
      `${API_VERSION_PREFIX}/hospitals/${hospitalId}/`,
    HOSPITAL_DOCUMENTS: `${API_VERSION_PREFIX}/hospitals/documents`,
    CHECK_APPROVAL_DOCUMENTS: `${API_VERSION_PREFIX}/hospitals/check-approval-documents`,
    HOSPITAL_PROFILE_COMPLETION_RATE: `${API_VERSION_PREFIX}/hospitals/profile-completion-rate`,
    TRAVEL_AGENT_PROFILE_COMPLETION_RATE: `${API_VERSION_PREFIX}/travel-agents/profile-completion-rate`,
    TRAVEL_AGENTS: `${API_VERSION_PREFIX}/travel-agents`,
    TRAVEL_AGENT_DETAIL: (agentId: string) =>
      `${API_VERSION_PREFIX}/travel-agents/${agentId}`,
  },
} as const;

export const buildApiUrl = (endpoint: string): string => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_CONFIG.BASE_URL}${path}`;
};

export const AUTH_CONSTANTS = {
  TOKEN_KEY: "medconnect_token",
  REFRESH_TOKEN_KEY: "medconnect_refresh_token",
  USER_KEY: "medconnect_user",
  TOKEN_EXPIRY: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

export const FILE_UPLOAD_CONSTANTS = {
  ALLOWED_TYPES: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
  ALLOWED_EXTENSIONS: ".pdf,.jpg,.jpeg,.png",
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ERROR_MESSAGES: {
    FILE_SIZE: "File size must be less than 10MB",
    FILE_TYPE: "Only PDF, JPG, and PNG files are allowed",
  },
} as const;
