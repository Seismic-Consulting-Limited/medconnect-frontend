"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface AffiliateProps {
  href: string
  vendorId: string
  className?: string
  children: React.ReactNode
  trackingId?: string
  campaign?: string
}

export function AffiliateLink({
  href,
  vendorId,
  className = "",
  children,
  trackingId = "default",
  campaign = "general",
}: AffiliateProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Build the affiliate URL with tracking parameters
  const buildAffiliateUrl = () => {
    const baseUrl = href
    const separator = baseUrl.includes("?") ? "&" : "?"
    const utmSource = "medconnect"
    const utmMedium = "affiliate"

    return `${baseUrl}${separator}utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${campaign}&vendor=${vendorId}&tracking=${trackingId}`
  }

  // Track the click event
  const handleClick = () => {
    // In a real implementation, you might want to log this click to your backend
    console.log(`Affiliate link clicked: Vendor ID ${vendorId}, Campaign: ${campaign}`)

    // You could also implement analytics tracking here
    try {
      // Example: track with a hypothetical analytics service
      // analytics.trackEvent('affiliate_click', { vendorId, trackingId, campaign })
    } catch (error) {
      console.error("Error tracking affiliate click:", error)
    }
  }

  return (
    <Link
      href={buildAffiliateUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center ${isHovered ? "text-primary-700" : "text-primary"} hover:text-primary-700 transition-colors ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <ExternalLink className={`ml-1 h-4 w-4 ${isHovered ? "animate-pulse" : ""}`} />
    </Link>
  )
}
