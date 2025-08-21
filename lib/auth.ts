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

const parseError = async (response: Response) => {
  try {
    const err = await response.json()
    return err?.message ?? err?.detail ?? `Request failed with status ${response.status}`
  } catch {
    const text = await response.text().catch(() => "")
    return text || `Request failed with status ${response.status}`
  }
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

  // ---------------- Signup ----------------
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

  // ---------------- Login (password) ----------------
  public async login(email: string, password: string): Promise<AuthResponseMaybe> {
    const url = buildApiUrl(API_ENDPOINTS.AUTH.LOGIN)
    const response = await fetch(url, {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase(), password }),
    })
    if (!response.ok) {
      const text = await parseError(response)
      throw new Error(`Login failed (${response.status}) at ${url}: ${text}`)
    }
    const data: AuthResponseMaybe = await response.json()

    if (data?.token || data?.refreshToken) setTokens(data.token, data.refreshToken)
    setUserLocal(data?.user)
    return data
  }

  public async logout(): Promise<void> {
    const token = this.getToken()
    if (token) {
      try {
        await fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGOUT), {
          method: HTTP_METHODS.POST,
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch (error) {
        console.error("Logout request failed:", error)
      }
    }
    this.clearAuth()
  }

  public async refreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null
    try {
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
    } catch {
      this.clearAuth()
      return null
    }
  }

  // ---------------- Signup OTP (existing) ----------------
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

  // ---------------- Login OTP (new) ----------------
  // Step 1: request OTP to be sent to user's email
  public async signinOtpInit(email: string): Promise<AuthResponseMaybe> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.SIGNIN_OTP_INIT), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase() }),
    })
    if (!response.ok) throw new Error(await parseError(response))
    return response.json()
  }

  // Step 2: verify OTP to log the user in
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
