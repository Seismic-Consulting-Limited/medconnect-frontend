'use client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import MobileSidebar from '@/components/ResponsiveSidebar'
import PageHeader from '@/components/shared/pageHeader'
import { patientDashboardService } from '@/service/dashboard.service'
import React, { ReactNode, useEffect } from 'react'

const ClientLayout = ({ children }: { children: ReactNode }) => {
  // useEffect(() => {
  //   const fetchDashboard = async () => {
  //     try {
  //       const response = await patientDashboardService()
  //     } catch(error) {
  //       console.log();
  //     } finally {

  //     }
  //   }
  //   fetchDashboard()
  // }, [])
  return (
    <div className="lg:flex items-start bg-gray-50 min-h-screen">
      {/* Sidebar Section */}
      <MobileSidebar />
      <DashboardSidebar />

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Sticky Header */}
        <div className="hidden lg:block">
          <PageHeader />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto pb-3">
          {children}
        </main>
      </div>
    </div>
  )
}

export default ClientLayout
