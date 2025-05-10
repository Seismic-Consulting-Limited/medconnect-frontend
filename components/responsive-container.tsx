import type React from "react"
interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveContainer({ children, className }: ResponsiveContainerProps) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl ${className || ""}`}>{children}</div>
  )
}
