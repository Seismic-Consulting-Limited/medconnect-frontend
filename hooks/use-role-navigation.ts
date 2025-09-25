"use client";

import { useAuth } from "./use-auth";

export function useRoleNavigation() {
  const { userRole } = useAuth();
  const role = userRole?.toLowerCase();

  const getDashboardPath = (r?: string | null | undefined) => {
    const effective = (r || role || "").toLowerCase();
    if (!effective) return "/dashboard"; // ← avoid defaulting to client when unknown
    switch (effective) {
      case "hospital":
        return "/dashboard/hospital";
      case "travel_agent":
      case "travel-agent":
        return "/dashboard/travel-agent";
      case "client":
      case "patient":
        return "/dashboard/client";
      default:
        return "/dashboard/client";
    }
  };

  const getNavigationItems = () => {
    if (!role) return []; // ← don’t build client nav when role is unknown
    switch (role) {
      case "hospital":
        return [
          { label: "Dashboard", href: "/dashboard/hospital", icon: "Home" },
          { label: "Consultants", href: "/dashboard/hospital/consultants", icon: "Stethoscope" },
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
        return [
          /* client items… */
        ];
      default:
         return [
          { label: "Dashboard", href: "/dashboard/client", icon: "Home" },
          { label: "Appointments", href: "/dashboard/client/appointments", icon: "Calendar" },
          { label: "Medical Records", href: "/dashboard/client/records", icon: "FileText" },
          { label: "Find Doctors", href: "/dashboard/client/doctors", icon: "Stethoscope" },
          { label: "Medical Travel", href: "/dashboard/client/travel", icon: "Plane" },
          { label: "Messages", href: "/dashboard/client/messages", icon: "MessageSquare" },
        ];
    }
  };

  const isAuthorizedForRoute = (route: string) => {
    if (!role) return false; // until we know, block (sidebar skeleton is shown)
    if (route.startsWith("/dashboard/hospital")) return role === "hospital";
    if (route.startsWith("/dashboard/travel-agent"))
      return role === "travel_agent" || role === "travel-agent";
    if (route.startsWith("/dashboard/client"))
      return role === "client" || role === "patient";
    return true;
  };

  return {
    getDashboardPath,
    getNavigationItems,
    isAuthorizedForRoute,
    userRole: role,
  };
}
