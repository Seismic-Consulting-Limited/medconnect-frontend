"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MessageTable from "@/components/dashboard/hospital/messages/messageTable";

const MessagesPage = () => {
  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-[20px] font-semibold text-gray-800">
          Messages <span className="text-[#A2A2A2] font-medium">(302)</span>
        </h2>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Search Input */}
          <Input
            placeholder="Search..."
            className="w-[220px] bg-[#F8F9FC] border border-gray-200 focus-visible:ring-0"
          />

          {/* Sort Section */}
          <div className="flex items-center gap-2">
            <p className="text-[15px] text-gray-600">Sort By:</p>
            <Select>
              <SelectTrigger className="w-[140px] bg-white border border-gray-200">
                <SelectValue placeholder="Latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <MessageTable />
    </div>
  );
};

export default MessagesPage;
