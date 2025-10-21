"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Hospital,
  LayoutGrid,
  Video,
  CreditCard,
  Cross,
  Building,
  MessageSquareMore,
} from "lucide-react";
import { useRoleStore } from "@/store/role";
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
  LayoutGrid,
  Hospital,
  Video,
  CreditCard,
  Cross,
  Building,
  MessageSquareMore,
};

export type NavItem = {
  label: string;
  href: string;
  icon?: keyof typeof iconMap;
};

export const SidebarItem = ({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) => (
  <Link
    href={href}
    className={[
      "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors",
      active
        ? "bg-primary text-white font-bold"
        : "hover:bg-gray-50 text-[#313131]",
    ].join(" ")}
  >
    <div className="h-[24px] w-[24px] flex items-center justify-center">
      {icon}
    </div>
    <span className="text-[16px] font-light">{label}</span>
  </Link>
);

export const SidebarSection = ({ items }: { items: NavItem[] }) => {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const IconComp = iconMap[item.icon ?? "Home"];
        const active =
          pathname === item.href ||
          (pathname.startsWith(item.href + "/") &&
            item.href.split("/").length >= pathname.split("/").length - 1);

        return (
          <SidebarItem
            key={item.href}
            icon={<IconComp className="h-5 w-5" />}
            label={item.label}
            href={item.href}
            active={active}
          />
        );
      })}
    </div>
  );
};

export const DashboardSidebar = () => {
  const { role } = useRoleStore();
  const { getNavigationItems } = useRoleNavigation();
  const [mounted, setMounted] = useState(false);
  console.log(role)

  useEffect(() => setMounted(true), []);

  const footerLinks: NavItem[] = [
    { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
    { label: "Help & Support", href: "/dashboard/help-support", icon: "HelpCircle" },
  ];

  if (!mounted || !role) {
    return (
      <aside className="border-r border-gray-200 w-[248px] h-screen p-4 overflow-y-auto z-10 hidden lg:block">
        <nav className="flex flex-col h-full animate-pulse">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 bg-gray-200 rounded-lg" />
            <div className="h-6 bg-gray-200 rounded w-24" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-3 rounded-lg"
            >
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </nav>
      </aside>
    );
  }

  const activeNav = getNavigationItems();

  return (
    <aside className="bg-white border-r border-gray-200 w-[248px] h-screen p-4 overflow-y-auto z-10 hidden lg:block">
      <nav className="flex flex-col h-full">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <div className="h-4 w-4 bg-primary rounded-sm" />
          </div>
          <span className="font-bold text-xl text-primary">MedConnect</span>
        </div>

        {/* Role-based navigation */}
        <SidebarSection items={activeNav as any} />

        {/* Footer */}
        <div className="mt-auto border-t pt-4">
          <SidebarSection items={footerLinks} />
        </div>
      </nav>
    </aside>
  );
};
