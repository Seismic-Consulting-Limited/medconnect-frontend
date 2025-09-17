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
import { Separator } from "@/components/ui/separator"
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
    <aside className="bg-white border rounded-xl p-3 hidden lg:block">
      <nav className="space-y-1">
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

        <Separator className="my-3" />

        <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" href="#" />
        <SidebarItem icon={<HelpCircle className="h-4 w-4" />} label="Help & Support" href="#" />
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
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
        active ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-50 text-gray-700",
      ].join(" ")}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
