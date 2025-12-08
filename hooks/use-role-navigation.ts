"use client";

import { useRoleStore } from "@/store/role";

export function useRoleNavigation() {
  const { role } = useRoleStore();

  const getDashboardPath = (r?: string | null | undefined) => {
    const effective = (r || role || "").toLowerCase();
    if (!effective) return "/dashboard";
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
    if (!role) return [];

    console.log('role',role.toLowerCase())

    switch (role.toLowerCase()) {
      case "hospital":
        return [
          { label: "Dashboard", href: "/dashboard/hospital", icon: "LayoutGrid" },
          { label: "Treatment", href: "/dashboard/hospital/treatment", icon: "Cross" },
          { label: "Consultants", href: "/dashboard/hospital/consultants", icon: "Stethoscope" },
          { label: "Services", href: "/dashboard/hospital/services", icon: "Building" },
          { label: "Messages", href: "/dashboard/hospital/messages", icon: "MessageSquareMore" },
        ];

      case "travel_agent":
      case "travel-agent":
        return [
          { label: "Dashboard", href: "/dashboard/travel-agent", icon: "Home" },
          { label: "Bookings", href: "/dashboard/travel-agent/bookings", icon: "Calendar" },
          { label: "Clients", href: "/dashboard/travel-agent/clients", icon: "Users" },
          { label: "Packages", href: "/dashboard/travel-agent/packages", icon: "Package" },
          { label: "Messages", href: "/dashboard/travel-agent/messages", icon: "MessageSquare" },
        ];

      case "client":
      case "patient":
      default:
        return [
          { label: "Dashboard", href: "/dashboard/client", icon: "LayoutGrid" },
          { label: "Hospitals", href: "/dashboard/client/hospitals", icon: "Hospital" },
          { label: "Consultants", href: "/dashboard/client/consultants", icon: "Stethoscope" },
          { label: "Travel Planning", href: "/dashboard/client/travel", icon: "Plane" },
          { label: "Consultations", href: "/dashboard/client/consultations", icon: "Video" },
          { label: "Payments", href: "/dashboard/client/payments", icon: "CreditCard" },
        ];
    }
  };

  const isAuthorizedForRoute = (route: string) => {
    if (!role) return false;
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
