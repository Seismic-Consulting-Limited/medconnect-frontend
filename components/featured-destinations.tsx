import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AffiliateLink } from "@/components/affiliate-link"

export function FeaturedDestinations() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Popular Destinations</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Top Medical Tourism Destinations</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover countries renowned for their medical specialties and high-quality care.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  alt="Thailand Medical Tourism"
                  className="w-full object-cover h-48"
                  height={200}
                  src="/bangkok-hospital-exterior.png"
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Thailand</h3>
                  <p className="text-sm">Cosmetic Surgery, Dental Care</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  World-class hospitals with JCI accreditation offering procedures at 50-70% less than Western
                  countries.
                </p>
                <div className="mt-4">
                  <AffiliateLink
                    href="https://www.thailandhealthtourism.com"
                    vendorId="thailand-tourism-board"
                    trackingId="featured-destination"
                    campaign="homepage-featured"
                    className="text-sm font-medium flex items-center"
                  >
                    Explore Thailand
                    <ArrowRight className="ml-1 h-4 w-4 inline" />
                  </AffiliateLink>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  alt="India Medical Tourism"
                  className="w-full object-cover h-48"
                  height={200}
                  src="/indira-gandhi-hospital-exterior.png"
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">India</h3>
                  <p className="text-sm">Cardiac Surgery, Orthopedics</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  Leading destination for complex procedures with highly skilled doctors trained internationally.
                </p>
                <div className="mt-4">
                  <AffiliateLink
                    href="https://www.incredibleindia-tourism.org/medical"
                    vendorId="india-tourism-board"
                    trackingId="featured-destination"
                    campaign="homepage-featured"
                    className="text-sm font-medium flex items-center"
                  >
                    Explore India
                    <ArrowRight className="ml-1 h-4 w-4 inline" />
                  </AffiliateLink>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  alt="Turkey Medical Tourism"
                  className="w-full object-cover h-48"
                  height={200}
                  src="/modern-hospital-exterior.png"
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Turkey</h3>
                  <p className="text-sm">Hair Transplants, Dental Work</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  Bridging Europe and Asia with cutting-edge facilities and specialists at competitive prices.
                </p>
                <div className="mt-4">
                  <AffiliateLink
                    href="https://www.turkishhealthcare.org"
                    vendorId="turkey-healthcare-board"
                    trackingId="featured-destination"
                    campaign="homepage-featured"
                    className="text-sm font-medium flex items-center"
                  >
                    Explore Turkey
                    <ArrowRight className="ml-1 h-4 w-4 inline" />
                  </AffiliateLink>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/hospitals">
              View All Destinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
