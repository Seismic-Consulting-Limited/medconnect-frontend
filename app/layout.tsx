import "./globals.css"
import type { Metadata } from "next"
import { AuthProvider } from "@/hooks/use-auth"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "MedConnect",
  description: "Healthcare platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
         <Toaster />
      </body>
    </html>
  )
}
