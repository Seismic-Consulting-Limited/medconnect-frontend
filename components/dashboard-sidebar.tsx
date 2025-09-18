"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Calendar,
  FileText,
  Stethoscope,
  Plane,
  MessageSquare,
  Settings,
  HelpCircle,
  Users,
  Heart,
  Package,
} from "lucide-react"
import { useRoleNavigation } from "@/hooks/use-role-navigation"

const iconMap = {
  Home,
  Calendar,
  FileText,
  Stethoscope,
  Plane,
  MessageSquare,
  Settings,
  HelpCircle,
  Users,
  Heart,
  Package,
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { getNavigationItems } = useRoleNavigation()
  const navigationItems = getNavigationItems()

  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen p-4 fixed left-0 top-0 overflow-y-auto z-10 hidden lg:block">
      <nav className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <div className="h-4 w-4 bg-primary rounded-sm"></div>
          </div>
          <span className="font-bold text-xl text-primary">MedConnect</span>
        </div>

        <div className="space-y-1">
          {navigationItems.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Home
            const isActive = pathname === item.href

            return (
              <SidebarItem
                key={item.href}
                icon={<Icon className="h-4 w-4" />}
                label={item.label}
                href={item.href}
                active={isActive}
              />
            )
          })}
        </div>

        <div className="flex-1"></div>

        <div className="space-y-1 mt-auto">
          <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" href="#" />
          <SidebarItem icon={<HelpCircle className="h-4 w-4" />} label="Help & Support" href="#" />
        </div>
      </nav>
    </aside>
  )
}

function SidebarItem({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-semibold transition-colors",
        active ? "bg-primary/10 text-primary font-bold" : "hover:bg-gray-50 text-gray-700",
      ].join(" ")}
    >
      <div className="h-5 w-5 flex items-center justify-center">{icon}</div>
      <span>{label}</span>
    </Link>
  )
}
