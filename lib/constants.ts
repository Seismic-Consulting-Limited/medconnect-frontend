
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const


export const API_CONFIG = {
  BASE_URL: (process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.medkonent.com").replace(/\/+$/, ""),
  TIMEOUT: 30000,
} as const


const API_PREFIX = "/v1"

// Safe join for base + endpoint
export const buildApiUrl = (endpoint: string): string => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${API_CONFIG.BASE_URL}${path}`
}

// NOTE: Django/DRF-style **trailing slashes**
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_PREFIX}/auth/signup/`,
    LOGIN: `${API_PREFIX}/auth/login/`,
    LOGOUT: `${API_PREFIX}/auth/logout/`,
    REFRESH: `${API_PREFIX}/auth/refresh/`,
    VERIFY_EMAIL: `${API_PREFIX}/auth/verify-email/`,
  },
  USER: {
    PROFILE: `${API_PREFIX}/user/profile/`,
    UPDATE: `${API_PREFIX}/user/update/`,
  },
} as const

export const AUTH_CONSTANTS = {
  TOKEN_KEY: "medconnect_token",
  REFRESH_TOKEN_KEY: "medconnect_refresh_token",
  USER_KEY: "medconnect_user",
  TOKEN_EXPIRY: 15 * 60 * 1000,          // not enforced client-side
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000,
} as const
