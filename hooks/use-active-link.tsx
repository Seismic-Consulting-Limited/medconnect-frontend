"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function useActiveLink() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return {
      isActive: (path: string) => false,
      isHomePage: false,
      currentPath: "",
    }
  }

  return {
    isActive: (path: string) => {
      if (path === "/#how-it-works") {
        return pathname === "/"
      }
      return pathname.startsWith(path)
    },
    isHomePage: pathname === "/",
    currentPath: pathname,
  }
}
