// lib/constants.ts

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const

// Ensure BASE_URL has no trailing slash
export const API_CONFIG = {
  BASE_URL: (process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.medkonent.com").replace(/\/+$/, ""),
  TIMEOUT: 30000,
} as const

// Dev/staging use versioned routes
export const API_VERSION_PREFIX = "/v1"

// All endpoint paths start with "/" and end with "/"
export const API_ENDPOINTS = {
  AUTH: {
    // Signup + OTP (already working)
    SIGNUP: `${API_VERSION_PREFIX}/auth/signup/`,
    VERIFY_OTP: `${API_VERSION_PREFIX}/auth/signup/otp/verify/`,
    RESEND_OTP: `${API_VERSION_PREFIX}/auth/signup/otp/resend/`,

    // ✅ Login (password)
    LOGIN: `${API_VERSION_PREFIX}/auth/signin/`,

    // ✅ Login with OTP (init + verify)
    SIGNIN_OTP_INIT: `${API_VERSION_PREFIX}/auth/signin/otp/`,
    SIGNIN_OTP_VERIFY: `${API_VERSION_PREFIX}/auth/signin/otp/verify/`,

    LOGOUT: `${API_VERSION_PREFIX}/auth/logout/`,
    REFRESH: `${API_VERSION_PREFIX}/auth/refresh/`,
  },
  USER: {
    PROFILE: `${API_VERSION_PREFIX}/user/profile/`,
    UPDATE: `${API_VERSION_PREFIX}/user/update/`,
  },
} as const

export const buildApiUrl = (endpoint: string): string => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${API_CONFIG.BASE_URL}${path}`
}

export const AUTH_CONSTANTS = {
  TOKEN_KEY: "medconnect_token",
  REFRESH_TOKEN_KEY: "medconnect_refresh_token",
  USER_KEY: "medconnect_user",
  TOKEN_EXPIRY: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const
