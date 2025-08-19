"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { authService, type User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signup: (name: string, email: string, password: string, accountType?: string, metadata?: any) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser()
        const token = authService.getToken()

        if (currentUser && token) {
          setUser(currentUser)
        } else if (token) {
          // Try to refresh token
          const newToken = await authService.refreshToken()
          if (newToken) {
            setUser(authService.getCurrentUser())
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const signup = async (name: string, email: string, password: string, accountType?: string, metadata?: any) => {
    setIsLoading(true)
    try {
      const response = await authService.signup(name, email, password, accountType, metadata)
      setUser(response.user)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authService.login(email, password)
      setUser(response.user)
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
        setUser(authService.getCurrentUser())
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
    signup,
    login,
    logout,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    // During SSR or if provider is missing, return safe defaults
    if (typeof window === "undefined") {
      return {
        user: null,
        isLoading: true,
        isAuthenticated: false,
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

    // On client side, if context is missing, provide safe fallback
    console.error("useAuth must be used within an AuthProvider")
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      signup: async () => {
        throw new Error("Authentication not properly initialized")
      },
      login: async () => {
        throw new Error("Authentication not properly initialized")
      },
      logout: async () => {
        throw new Error("Authentication not properly initialized")
      },
      refreshAuth: async () => {
        throw new Error("Authentication not properly initialized")
      },
    }
  }

  return context
}
