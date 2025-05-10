import { MilestoneReport } from "@/components/milestone-report"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomepageMilestonePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-gray-50 py-8">
        <MilestoneReport />
      </main>
      <SiteFooter />
    </div>
  )
}
