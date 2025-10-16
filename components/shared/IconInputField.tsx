"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IconInputFieldProps {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  optionalText?: string;
}

const IconInputField: React.FC<IconInputFieldProps> = ({
  label,
  placeholder,
  icon,
  type = "text",
  optionalText,
}) => {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1">
        {label}
        {optionalText && (
          <span className="text-gray-400 text-sm font-light">
            ({optionalText})
          </span>
        )}
      </Label>
      <div className="flex items-center border rounded-lg bg-[#F8F9FC] px-3">
        <div className="text-gray-400 w-[18px] h-[18px] mr-2">{icon}</div>
        <Input
          type={type}
          placeholder={placeholder}
          className="border-none shadow-none bg-transparent focus-visible:ring-0"
        />
      </div>
    </div>
  );
};

export default IconInputField;
