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

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

const parseError = async (response: Response) => {
  try {
    const err = await response.json()
    return err?.message ?? "Request failed"
  } catch {
    const text = await response.text().catch(() => "")
    return text || `Request failed with status ${response.status}`
  }
}

export class AuthService {
  private static instance: AuthService

  public static getInstance(): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService()
    return AuthService.instance
  }

  private setTokens(token: string, refreshToken: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, token)
      localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, refreshToken)
    }
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

  public async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ): Promise<AuthResponse> {
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

    const data: AuthResponse = await response.json()
    this.setTokens(data.token, data.refreshToken)

    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(data.user))
    }

    return data
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
      method: HTTP_METHODS.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.toLowerCase(),         
        password,                           
      }),
    })

    if (!response.ok) throw new Error(await parseError(response))

    const data: AuthResponse = await response.json()
    this.setTokens(data.token, data.refreshToken)

    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(data.user))
    }

    return data
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

      const data = await response.json()
      this.setTokens(data.token, data.refreshToken)

      if (typeof window !== "undefined" && (data as any).user) {
        localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify((data as any).user))
      }

      return data.token
    } catch {
      this.clearAuth()
      return null
    }
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

  public getCurrentUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(AUTH_CONSTANTS.USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  public isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser()
  }
}

export const authService = AuthService.getInstance()
