"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Stethoscope,
  Plane,
  LayoutGrid,
  Hospital,
  Settings,
  HelpCircle,
} from "lucide-react";

const iconMap = {
  LayoutGrid,
  Hospital,
  Stethoscope,
  Plane,
  Settings,
  HelpCircle,
};

type NavItem = {
  label: string;
  href: string;
  icon: keyof typeof iconMap;
};

const SidebarItem = ({
  icon,
  label,
  href,
  active,
  onNavigate,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onNavigate?: () => void;
}) => (
  <Link
    href={href}
    onClick={onNavigate}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors
      ${active ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}
    `}
  >
    {icon}
    <span className="text-[15px] font-medium">{label}</span>
  </Link>
);

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard/client", icon: "LayoutGrid" },
    { label: "Hospitals", href: "/dashboard/hospitals", icon: "Hospital" },
    { label: "Consultants", href: "/consultants", icon: "Stethoscope" },
    { label: "Travel Planning", href: "/travel", icon: "Plane" },
  ];

  const footerItems: NavItem[] = [
    { label: "Settings", href: "/settings", icon: "Settings" },
    { label: "Help & Support", href: "/dashboard/help", icon: "HelpCircle" },
  ];

  return (
    <>
      {/* 🔹 Sticky Mobile Header */}
      <div className="sticky lg:hidden flex top-0 left-0 z-50 items-center justify-between bg-white px-4 py-3 shadow-sm border-b">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="font-bold text-lg text-primary">MedConnect</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#E4CFF7] border border-[#9946E1] w-[40px] h-[40px] rounded-full flex items-center justify-center text-[#9946E1] font-bold">
            PP
          </div>
          <ChevronDown className="w-[18px] h-[18px]" color="#313131" />
        </div>
      </div>

      {/* 🔹 Overlay when Sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* 🔹 Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-bold text-xl text-primary">MedConnect</span>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col justify-between h-full p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon];
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <SidebarItem
                  key={item.href}
                  icon={<Icon className="h-5 w-5" />}
                  label={item.label}
                  href={item.href}
                  active={active}
                  onNavigate={toggleSidebar}
                />
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t pt-4 mt-4 space-y-1">
            {footerItems.map((item) => {
              const Icon = iconMap[item.icon];
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <SidebarItem
                  key={item.href}
                  icon={<Icon className="h-5 w-5" />}
                  label={item.label}
                  href={item.href}
                  active={active}
                  onNavigate={toggleSidebar}
                />
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
