"use client"

import { useState, useEffect } from "react"
import { dashboardService } from "@/lib/services/dashboard-service"
import { useAuth } from "./use-auth"

export function useDashboardData() {
  const { user, isAuthenticated, userRole, logout } = useAuth() // Use cached userRole from context
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  const normalizedRole = userRole?.toLowerCase()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false)
      return
    }

    const fetchDashboardData = async () => {
      setLoading(true)
      setError(null)

      try {
        let dashboardData

        switch (normalizedRole) {
          case "hospital":
            dashboardData = await dashboardService.getHospitalDashboard()
            break
          case "travel_agent":
          case "travel-agent":
            dashboardData = await dashboardService.getTravelAgentDashboard()
            break
          case "client":
          case "patient":
          default:
            dashboardData = await dashboardService.getClientDashboard()
            break
        }

        setData(dashboardData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard data"

        if (
          errorMessage.includes("Authentication required") ||
          errorMessage.toLowerCase().includes("user not found") ||
          errorMessage.toLowerCase().includes("account not found")
        ) {
          logout()
          return
        }

        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, isAuthenticated, normalizedRole, logout])

  const refetch = async () => {
    if (!isAuthenticated || !user) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      let dashboardData

      switch (normalizedRole) {
        case "hospital":
          dashboardData = await dashboardService.getHospitalDashboard()
          break
        case "travel_agent":
        case "travel-agent":
          dashboardData = await dashboardService.getTravelAgentDashboard()
          break
        case "client":
        case "patient":
        default:
          dashboardData = await dashboardService.getClientDashboard()
          break
      }

      setData(dashboardData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard data"

      if (
        errorMessage.includes("Authentication required") ||
        errorMessage.toLowerCase().includes("user not found") ||
        errorMessage.toLowerCase().includes("account not found")
      ) {
        logout()
        return
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    refetch,
    userRole: normalizedRole, // Return normalized role
  }
}
