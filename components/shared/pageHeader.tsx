"use client";

import {
  Bell,
  ChevronDown,
  MessageSquareText,
  SearchIcon,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import NotificationDropdown from "./notificationDropdown";
import ProfileMenu from "./profileMenu";

const PageHeader = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // 🔹 Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Toggle handlers
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setShowMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowMenu((prev) => !prev);
    setShowNotifications(false);
  };

  return (
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between gap-20 py-[16px] px-[24px]">
      {/* 🔍 Search Input */}
      <div className="w-full max-w-2xl">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by hospital name, specialty, treatment, or location..."
            className="pl-10 py-6 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* 🔔 Icons + Profile */}
      <div className="flex items-center gap-3 relative">
        {/* Bell (Notification Button) */}
        <button
          onClick={toggleNotifications}
          className="relative bg-[#EDEDED] border border-[#D7D7D7] w-[48px] h-[48px] rounded-full flex items-center justify-center hover:bg-gray-200 transition"
        >
          <Bell className="w-[24px] h-[24px]" color="#313131" />
          {/* Red dot for unread */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* 💬 Message Icon */}
        <div className="bg-[#EDEDED] border border-[#D7D7D7] w-[48px] h-[48px] rounded-full flex items-center justify-center hover:bg-gray-200 transition">
          <MessageSquareText className="w-[24px] h-[24px]" color="#313131" />
        </div>

        {/* 👤 Profile */}
        <div
          className="flex items-center gap-2 w-[168px] cursor-pointer"
          onClick={toggleProfileMenu}
        >
          <div className="bg-[#E4CFF7] border border-[#9946E1] w-[48px] h-[48px] rounded-full flex items-center justify-center font-semibold text-[#9946E1]">
            {user?.name?.charAt(0).toUpperCase() || "P"}
          </div>
          <div className="hidden sm:block">
            <h4 className="text-[16px] text-[#313131] font-medium">
              {user?.name || "John D."}
            </h4>
            <p className="text-[10px] text-gray-400 uppercase">Client</p>
          </div>
          <ChevronDown className="w-[20px] h-[20px]" />
        </div>

        {/* 🔽 Notification Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              ref={notificationRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-24 top-16 w-[380px] bg-white shadow-xl rounded-xl border border-gray-200 z-[60] overflow-hidden"
            >
              <NotificationDropdown setShowNotifications={setShowNotifications} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 👤 Profile Dropdown */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              ref={profileRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-12 top-16 w-[300px] z-[60] overflow-hidden"
            >
              <ProfileMenu setShowMenu={setShowMenu} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default PageHeader;
