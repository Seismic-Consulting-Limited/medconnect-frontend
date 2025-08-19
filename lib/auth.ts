import { AUTH_CONSTANTS, HTTP_METHODS, API_ENDPOINTS } from "./constants"

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

export class AuthService {
  private static instance: AuthService

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private setTokens(token: string, refreshToken: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, token)
      localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, refreshToken)
    }
  }

  public getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY)
    }
    return null
  }

  private getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY)
    }
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
    name: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ): Promise<AuthResponse> {
    const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
      method: HTTP_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        ...(accountType && { accountType }),
        ...(metadata && { metadata }),
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Signup failed")
    }

    const data: AuthResponse = await response.json()
    this.setTokens(data.token, data.refreshToken)

    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(data.user))
    }

    return data
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: HTTP_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }

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
      const response = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
        method: HTTP_METHODS.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        this.clearAuth()
        return null
      }

      const data = await response.json()
      this.setTokens(data.token, data.refreshToken)
      return data.token
    } catch (error) {
      this.clearAuth()
      return null
    }
  }

  public async logout(): Promise<void> {
    const token = this.getToken()

    if (token) {
      try {
        await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
          method: HTTP_METHODS.POST,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
