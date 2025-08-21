// lib/auth.ts
import { AUTH_CONSTANTS, HTTP_METHODS, API_ENDPOINTS, buildApiUrl } from "./constants"

export interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponseMaybe {
  user?: User
  token?: string
  refreshToken?: string
  [key: string]: any
}

const SERVER_5XX_FALLBACK =
  (typeof process !== "undefined" &&
    typeof process.env !== "undefined" &&
    process.env.NEXT_PUBLIC_SERVER_ERROR_MESSAGE) ||
  "Something went wrong. Please try again."

const parseError = async (response: Response) => {
  const status = response.status
  const isServerError = status >= 500

  // Try JSON first
  try {
    const data = await response.clone().json()
    if (typeof data === "string") return data
    if ((data as any)?.message) return String((data as any).message)
    if ((data as any)?.detail) return String((data as any).detail)
    if (Array.isArray((data as any)?.non_field_errors) && (data as any).non_field_errors.length)
      return String((data as any).non_field_errors[0])
    if (Array.isArray((data as any)?.errors) && (data as any).errors.length)
      return String((data as any).errors[0])

    const keys = Object.keys(data as any)
    if (keys.length) {
      const first = (data as any)[keys[0]]
      if (Array.isArray(first) && first.length) return String(first[0])
      if (typeof first === "string") return first
    }
    return JSON.stringify(data)
  } catch {
    // not JSON
  }

  // Then try raw text
  try {
    const text = (await response.text()).trim()
    if (text) return isServerError ? SERVER_5XX_FALLBACK : text
  } catch {}

  // Clean fallback
  return isServerError ? SERVER_5XX_FALLBACK : response.statusText || `HTTP ${status}`
}

const setTokens = (token?: string, refreshToken?: string) => {
  if (typeof window === "undefined") return
  if (token) localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, token)
  if (refreshToken) localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, refreshToken)
}

const setUserLocal = (user?: unknown) => {
  if (typeof window === "undefined") return
  try {
    if (user && typeof user === "object") {
      localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_CONSTANTS.USER_KEY)
    }
  } catch {
    localStorage.removeItem(AUTH_CONSTANTS.USER_KEY)
  }
}

export class AuthService {
  private static instance: AuthService
  public static getInstance(): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService()
    return AuthService.instance
  }

  public getToken(): string | null {
    if (typeof window !== "undefined") return localStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY)
    return null
  }

  private getRefreshToken(): string | null {
    if (typeof window !== "undefined") return localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY)
    return null
  }

  public clearAuth(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_CONSTANTS.TOKEN_KEY)
      localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY)
      localStorage.removeItem(AUTH_CONSTANTS.USER_KEY)
    }
  }

  public getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(AUTH_CONSTANTS.USER_KEY)
    if (!raw || raw === "undefined" || raw === "null") {
      localStorage.removeItem(AUTH_CONSTANTS.USER_KEY)
      return null
    }
    try {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === "object" && ("email" in parsed || "id" in parsed)) {
        return parsed as User
      }
    } catch {}
    localStorage.removeItem(AUTH_CONSTANTS.USER_KEY)
    return null
  }

  public isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser()
  }

  public async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ): Promise<AuthResponseMaybe> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.SIGNUP), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        password,
        terms_of_service_agreement_checked: true,
        ...(accountType && { account_type: accountType }),
        ...(metadata && { metadata }),
      }),
    })
    if (!response.ok) throw new Error(await parseError(response))
    const data: AuthResponseMaybe = await response.json()
    if (data?.token || data?.refreshToken) setTokens(data.token, data.refreshToken)
    setUserLocal(data?.user)
    return data
  }

  public async login(email: string, password: string): Promise<AuthResponseMaybe> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase(), password }),
    })
    if (!response.ok) throw new Error(await parseError(response))
    const data: AuthResponseMaybe = await response.json()
    if (data?.token || data?.refreshToken) setTokens(data.token, data.refreshToken)
    setUserLocal(data?.user)
    return data
  }

  public async logout(): Promise<void> {
    const token = this.getToken()
    try {
      if (token) {
        await fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGOUT), {
          method: HTTP_METHODS.POST,
          headers: { Authorization: `Bearer ${token}` },
        })
      }
    } catch {
    } finally {
      this.clearAuth()
    }
  }

  public async refreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.REFRESH), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })
    if (!response.ok) {
      this.clearAuth()
      return null
    }
    const data: AuthResponseMaybe = await response.json()
    if (data?.token || data?.refreshToken) setTokens(data.token, data.refreshToken)
    setUserLocal(data?.user)
    return data?.token ?? null
  }

  public async verifyEmail(email: string, otp: string): Promise<AuthResponseMaybe> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.VERIFY_OTP), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase(), otp }),
    })
    if (!response.ok) throw new Error(await parseError(response))
    const data: AuthResponseMaybe = await response.json()
    if (data?.token || data?.refreshToken) setTokens(data.token, data.refreshToken)
    setUserLocal(data?.user)
    return data
  }

  public async resendEmailOtp(email: string): Promise<AuthResponseMaybe> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.RESEND_OTP), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase() }),
    })
    if (!response.ok) throw new Error(await parseError(response))
    return response.json()
  }

  public async signinOtpInit(email: string): Promise<AuthResponseMaybe> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.SIGNIN_OTP_INIT), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase() }),
    })
    if (!response.ok) throw new Error(await parseError(response))
    return response.json()
  }

  public async signinOtpVerify(email: string, otp: string): Promise<AuthResponseMaybe> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.SIGNIN_OTP_VERIFY), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase(), otp }),
    })
    if (!response.ok) throw new Error(await parseError(response))
    const data: AuthResponseMaybe = await response.json()
    if (data?.token || data?.refreshToken) setTokens(data.token, data.refreshToken)
    setUserLocal(data?.user)
    return data
  }
}

export const authService = AuthService.getInstance()
