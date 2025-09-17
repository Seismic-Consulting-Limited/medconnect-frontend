"use client"

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react"
import { authService, type User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  userRole: string | null // Added cached userRole to context
  getUserRole: () => string | null
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ) => Promise<void>
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const userRole = useMemo((): string | null => {
    // Check if we're on the client side
    if (typeof window === "undefined") {
      return user?.role || null
    }

    if (user?.role) {
      return user.role
    }

    const storedUserType = localStorage.getItem("user_type")
    if (storedUserType) {
      return storedUserType
    }

    const token = authService.getToken()
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload.role || payload.user_type || null
    } catch (error) {
      return null
    }
  }, [user])

  const getUserRole = useCallback((): string | null => {
    return userRole
  }, [userRole])

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = authService.getToken()

        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]))

            const currentTime = Math.floor(Date.now() / 1000)
            if (payload.exp && payload.exp < currentTime) {
              authService.clearAuth()
              setUser(null)
              setIsLoading(false)
              return
            }

            const userData = {
              id: payload.user_id || payload.sub || "",
              email: payload.email || "",
              role: payload.role || payload.user_type || undefined,
              name: payload.name || "",
              emailVerified: payload.emailVerified ?? false,
              createdAt: payload.createdAt || "",
              updatedAt: payload.updatedAt || "",
            }
            setUser(userData)
          } catch (error) {
            console.error("Error parsing token during init:", error)
            authService.clearAuth()
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        authService.clearAuth()
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    initAuth()
  }, [])

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ) => {
    setIsLoading(true)
    try {
      const response = await authService.signup(firstName, lastName, email, password, accountType, metadata)
      setUser(response.user ?? null)
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authService.login(email, password)

      if (response && response.status === "success") {
        const token = authService.getToken()

        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            const roleFromStorage = typeof window !== "undefined" ? localStorage.getItem("user_type") : null
            const userData = {
              id: payload.user_id || payload.sub || "",
              email: payload.email || "",
              role: payload.role || payload.user_type || roleFromStorage || undefined,
              name: payload.name || "",
              emailVerified: payload.emailVerified ?? false,
              createdAt: payload.createdAt || "",
              updatedAt: payload.updatedAt || "",
            }
            setUser(userData)
          } catch (error) {
            console.error("Token decode error after login:", error)
            setUser(null)
            return { success: false, error: "Invalid token format" }
          }
        }
      }

      return response || { success: false, error: "Login failed" }
    } catch (error) {
      console.error("Login error:", error)
      setUser(null)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAuth = async () => {
    try {
      const newToken = await authService.refreshToken()
      if (newToken) {
        const payload = JSON.parse(atob(newToken.split(".")[1]))
        setUser({
          id: payload.user_id || payload.sub || "",
          email: payload.email || "",
          role: payload.role || payload.user_type || undefined,
          name: payload.name || "",
          emailVerified: payload.emailVerified ?? false,
          createdAt: payload.createdAt || "",
          updatedAt: payload.updatedAt || "",
        })
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Token refresh error:", error)
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    userRole, // Added cached userRole to context value
    getUserRole,
    signup,
    login,
    logout,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    if (typeof window === "undefined") {
      return {
        user: null,
        isLoading: true,
        isAuthenticated: false,
        userRole: null, // Added userRole to SSR fallback
        getUserRole: () => null,
        signup: async () => {
          throw new Error("Auth not available during SSR")
        },
        login: async () => {
          throw new Error("Auth not available during SSR")
        },
        logout: async () => {
          throw new Error("Auth not available during SSR")
        },
        refreshAuth: async () => {
          throw new Error("Auth not available during SSR")
        },
      }
    }
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      userRole: null, // Added userRole to client fallback
      getUserRole: () => null,
      signup: async () => {
        throw new Error("Authentication not properly initialized - AuthProvider missing")
      },
      login: async () => {
        throw new Error("Authentication not properly initialized - AuthProvider missing")
      },
      logout: async () => {
        throw new Error("Authentication not properly initialized - AuthProvider missing")
      },
      refreshAuth: async () => {
        throw new Error("Authentication not properly initialized - AuthProvider missing")
      },
    }
  }
  return context
}
