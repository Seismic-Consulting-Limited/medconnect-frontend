// components/dashboard-sidebar.tsx
"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import { useRoleNavigation } from "@/hooks/use-role-navigation";

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
};

type NavItem = {
  label: string;
  href: string;
  icon: keyof typeof iconMap | string; // allow string; we’ll fallback to Home if unknown
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { getNavigationItems, userRole } = useRoleNavigation();

  // Hydration-safe: render skeleton until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const renderSkeleton = () => (
    <aside
      className="bg-white border-r border-gray-200 w-64 h-screen p-4 fixed left-0 top-0 overflow-y-auto z-10 hidden lg:block"
      suppressHydrationWarning
    >
      <nav className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <div className="h-4 w-4 bg-primary rounded-sm" />
          </div>
          <span className="font-bold text-xl text-primary">MedConnect</span>
        </div>
        <div className="space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-3 rounded-lg"
            >
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );

  // 1) Before mount → skeleton (matches SSR)
  if (!mounted) return renderSkeleton();

  // 2) After mount but role still unknown → still skeleton
  if (!userRole) return renderSkeleton();

  // 3) Role known → real nav; give TS an explicit type for items
  const navigationItems = ((getNavigationItems?.() as unknown) ??
    []) as NavItem[];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen p-4 fixed left-0 top-0 overflow-y-auto z-10 hidden lg:block">
      <nav className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <div className="h-4 w-4 bg-primary rounded-sm" />
          </div>
          <span className="font-bold text-xl text-primary">MedConnect</span>
        </div>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const IconComp =
              iconMap[(item.icon as keyof typeof iconMap) ?? "Home"] || Home;
            const active =
              item.label === "Dashboard"
                ? pathname === item.href // Dashboard only active on exact match
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/"); // Other items can match sub-paths
            return (
              <SidebarItem
                key={item.href}
                icon={<IconComp className="h-4 w-4" />}
                label={item.label}
                href={item.href}
                active={active}
              />
            );
          })}
        </div>

        <div className="flex-1" />

        <div className="space-y-3 mt-auto border-t pt-4">
          <SidebarItem
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
            href="/settings"
          />
          <SidebarItem
            icon={<HelpCircle className="h-4 w-4" />}
            label="Help & Support"
            href="/dashboard/help"
          />
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-semibold transition-colors",
        active
          ? "bg-primary/10 text-primary font-bold"
          : "hover:bg-gray-50 text-gray-700",
      ].join(" ")}
    >
      <div className="h-5 w-5 flex items-center justify-center">{icon}</div>
      <span>{label}</span>
    </Link>
  );
}
