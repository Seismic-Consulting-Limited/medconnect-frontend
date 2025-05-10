import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DebugPanel } from "@/components/debug-panel"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Med Connect - Global Healthcare Solutions",
  description: "Connect with top hospitals worldwide for affordable, quality healthcare",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Enable debug panel in development
  const isDebugEnabled = process.env.NODE_ENV === "development"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <DebugPanel isEnabled={isDebugEnabled} />
        </ThemeProvider>
      </body>
    </html>
  )
}
