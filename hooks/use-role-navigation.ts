"use client"

import { useAuth } from "./use-auth"

export function useRoleNavigation() {
  const { userRole } = useAuth() // Use userRole from auth context

  const getDashboardPath = (role?: string | null | undefined) => {
    const effectiveRole = role || userRole || null
    const userRoleNormalized = effectiveRole?.toLowerCase()

    switch (userRoleNormalized) {
      case "hospital":
        return "/dashboard/hospital"
      case "travel_agent":
      case "travel-agent":
        return "/dashboard/travel-agent"
      case "client":
      case "patient":
      default:
        return "/dashboard/client"
    }
  }

  const getNavigationItems = () => {
    const role = userRole?.toLowerCase() // Use userRole from context

    switch (role) {
      case "hospital":
        return [
          { label: "Dashboard", href: "/dashboard/hospital", icon: "Home" },
          { label: "Doctors", href: "/dashboard/hospital/doctors", icon: "Stethoscope" },
          { label: "Treatments", href: "/dashboard/hospital/treatments", icon: "Heart" },
          { label: "Services", href: "/dashboard/hospital/services", icon: "Settings" },
          { label: "Messages", href: "/dashboard/hospital/messages", icon: "MessageSquare" },
        ]

      case "travel_agent":
      case "travel-agent":
        return [
          { label: "Dashboard", href: "/dashboard/travel-agent", icon: "Home" },
          { label: "Bookings", href: "/dashboard/travel-agent/bookings", icon: "Calendar" },
          { label: "Clients", href: "/dashboard/travel-agent/clients", icon: "Users" },
          { label: "Packages", href: "/dashboard/travel-agent/packages", icon: "Package" },
          { label: "Messages", href: "/dashboard/travel-agent/messages", icon: "MessageSquare" },
        ]

      case "client":
      case "patient":
      default:
        return [
          { label: "Dashboard", href: "/dashboard/client", icon: "Home" },
          { label: "Appointments", href: "/dashboard/client/appointments", icon: "Calendar" },
          { label: "Medical Records", href: "/dashboard/client/records", icon: "FileText" },
          { label: "Find Doctors", href: "/dashboard/client/doctors", icon: "Stethoscope" },
          { label: "Medical Travel", href: "/dashboard/client/travel", icon: "Plane" },
          { label: "Messages", href: "/dashboard/client/messages", icon: "MessageSquare" },
        ]
    }
  }

  const isAuthorizedForRoute = (route: string) => {
    const role = userRole?.toLowerCase() // Use userRole from context

    if (route.startsWith("/dashboard/hospital")) {
      return role === "hospital"
    }

    if (route.startsWith("/dashboard/travel-agent")) {
      return role === "travel_agent" || role === "travel-agent"
    }

    if (route.startsWith("/dashboard/client")) {
      return role === "client" || role === "patient" || !role // default to client
    }

    return true
  }

  return {
    getDashboardPath,
    getNavigationItems,
    isAuthorizedForRoute,
    userRole: userRole?.toLowerCase(),
  }
}
