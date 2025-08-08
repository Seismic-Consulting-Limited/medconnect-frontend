import { ArrowRight } from 'lucide-react'
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
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Top Medical Tourism Destinations in Nigeria</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover Nigerian cities renowned for their medical specialties and high-quality care, attracting patients from abroad.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  alt="Lagos Medical Tourism"
                  className="w-full object-cover h-48"
                  height={200}
                  src="/bangkok-hospital-exterior.png" // Retaining original image path
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Lagos</h3>
                  <p className="text-sm">Cardiology, Orthopedics, Cosmetic Surgery</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  Nigeria's bustling hub offers state-of-the-art medical facilities and a wide range of specialized treatments.
                </p>
                <div className="mt-4">
                  <AffiliateLink
                    href="/hospitals?location=Lagos"
                    vendorId="lagos-tourism-board"
                    trackingId="featured-destination"
                    campaign="homepage-featured"
                    className="text-sm font-medium flex items-center"
                  >
                    Explore Lagos Hospitals
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
                  alt="Abuja Medical Tourism"
                  className="w-full object-cover h-48"
                  height={200}
                  src="/indira-gandhi-hospital-exterior.png" // Retaining original image path
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Abuja</h3>
                  <p className="text-sm">Oncology, Neurology, Fertility Treatment</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  The capital city boasts modern hospitals and highly skilled specialists, particularly in advanced care.
                </p>
                <div className="mt-4">
                  <AffiliateLink
                    href="/hospitals?location=Abuja"
                    vendorId="abuja-tourism-board"
                    trackingId="featured-destination"
                    campaign="homepage-featured"
                    className="text-sm font-medium flex items-center"
                  >
                    Explore Abuja Hospitals
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
                  alt="Ibadan Medical Tourism"
                  className="w-full object-cover h-48"
                  height={200}
                  src="/modern-hospital-exterior.png" // Retaining original image path
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">Ibadan</h3>
                  <p className="text-sm">General Surgery, Ophthalmology, ENT</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  A city with a rich medical history, offering comprehensive care and renowned teaching hospitals.
                </p>
                <div className="mt-4">
                  <AffiliateLink
                    href="/hospitals?location=Ibadan"
                    vendorId="ibadan-tourism-board"
                    trackingId="featured-destination"
                    campaign="homepage-featured"
                    className="text-sm font-medium flex items-center"
                  >
                    Explore Ibadan Hospitals
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
              View All Hospitals in Nigeria
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
