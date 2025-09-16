import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50">
        <ResponsiveContainer>
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Sidebar Navigation */}
              <div className="md:col-span-3 lg:col-span-2">
                <nav className="sticky top-24 space-y-1 bg-white rounded-lg border shadow-sm p-4">
                  <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">
                    Partner Dashboard
                  </h3>
                  <div className="space-y-1">
                    <a
                      href="/partners/dashboard"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary text-white"
                    >
                      Application Status
                    </a>
                    <a
                      href="/partners/dashboard/profile"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="/partners/dashboard/inquiries"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Inquiries
                    </a>
                    <a
                      href="/partners/dashboard/bookings"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Bookings
                    </a>
                    <a
                      href="/partners/dashboard/analytics"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Analytics
                    </a>
                    <a
                      href="/partners/dashboard/settings"
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </div>
                </nav>
              </div>

              {/* Main Content */}
              <div className="md:col-span-9 lg:col-span-10">{children}</div>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
      <SiteFooter />
    </div>
  )
}
