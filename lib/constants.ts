export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const

export const API_CONFIG = {
  // No trailing slash
  BASE_URL: (process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.medkonent.com").replace(/\/+$/, ""),
  TIMEOUT: 30000,
} as const

export const API_VERSION_PREFIX = "/v1"

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_VERSION_PREFIX}/auth/signup/`,
    VERIFY_OTP: `${API_VERSION_PREFIX}/auth/signup/otp/verify/`,
    RESEND_OTP: `${API_VERSION_PREFIX}/auth/signup/otp/resend/`,

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
  TOKEN_EXPIRY: 15 * 60 * 1000,
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000,
} as const
