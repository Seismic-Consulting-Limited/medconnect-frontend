'use client'
import { cn } from "@/lib/utils/cn"
import Link from "next/link"
import React from "react"

type ActionCardProps = {
  icon: React.ReactNode
  title: string
  subtitle: string
  borderColor: string
  iconBg?: string
  link?: string
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  subtitle,
  borderColor,
  iconBg = "#F3E9FB",
  link
}) => {
  return (
    <Link href={link!}
      className={cn(
        "flex items-center gap-3 py-4 px-3 w-full h-auto sm:h-[93px] rounded-[14px] border-[0.5px] hover:shadow-sm transition",
        borderColor
      )}
    >
      <div
        className="w-[48px] h-[48px] rounded-full flex items-center justify-center border-[0.5px] shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-[16px] sm:text-[17px] font-light">{title}</h3>
        <p className="text-[14px] sm:text-[15px] font-extralight">
          {subtitle}
        </p>
      </div>
    </Link>
  )
}
