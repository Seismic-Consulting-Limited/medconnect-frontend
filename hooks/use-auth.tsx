// hooks/use-auth.tsx
"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { authService, type User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ) => Promise<any>           // return backend payload
  login: (email: string, password: string) => Promise<any> // return backend payload
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
          const newToken = await authService.refreshToken()
          if (newToken) setUser(authService.getCurrentUser())
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setIsLoading(false)
      }
    }
    initAuth()
  }, [])

  const signup: AuthContextType["signup"] = async (
    firstName,
    lastName,
    email,
    password,
    accountType,
    metadata,
  ) => {
    setIsLoading(true)
    try {
      const response = await authService.signup(firstName, lastName, email, password, accountType, metadata)
      if (response?.user) setUser(response.user) // if backend returned user (non-OTP flow)
      return response
    } finally {
      setIsLoading(false)
    }
  }

  const login: AuthContextType["login"] = async (email, password) => {
    setIsLoading(true)
    try {
      const response = await authService.login(email, password)
      if (response?.user) setUser(response.user)
      return response
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
      if (newToken) setUser(authService.getCurrentUser())
      else setUser(null)
    } catch (error) {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, signup, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    if (typeof window === "undefined") {
      return {
        user: null,
        isLoading: true,
        isAuthenticated: false,
        signup: async () => { throw new Error("Auth not available during SSR") },
        login: async () => { throw new Error("Auth not available during SSR") },
        logout: async () => { throw new Error("Auth not available during SSR") },
        refreshAuth: async () => { throw new Error("Auth not available during SSR") },
      }
    }
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      signup: async () => { throw new Error("Authentication not properly initialized - AuthProvider missing") },
      login: async () => { throw new Error("Authentication not properly initialized - AuthProvider missing") },
      logout: async () => { throw new Error("Authentication not properly initialized - AuthProvider missing") },
      refreshAuth: async () => { throw new Error("Authentication not properly initialized - AuthProvider missing") },
    }
  }
  return context
}
