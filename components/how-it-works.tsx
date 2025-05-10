import { CheckCircle, HeartPulse, MessageSquare, Plane } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Simple Process</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How MedConnect Works</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Your journey to quality healthcare abroad in four simple steps.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <HeartPulse className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold">1. Find Treatment</h3>
            <p className="text-sm text-gray-500">
              Search for treatments and compare providers based on specialties, costs, and reviews.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <MessageSquare className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold">2. Connect</h3>
            <p className="text-sm text-gray-500">
              Schedule virtual consultations with healthcare providers to discuss your needs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <Plane className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold">3. Travel</h3>
            <p className="text-sm text-gray-500">
              We arrange your travel, accommodation, and local support for a worry-free journey.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
              <CheckCircle className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold">4. Receive Care</h3>
            <p className="text-sm text-gray-500">
              Get your treatment and follow-up care with continued support from our team.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
