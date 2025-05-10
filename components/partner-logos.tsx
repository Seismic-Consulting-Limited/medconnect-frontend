export function PartnerLogos() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Trusted Partners</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Network</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We partner with accredited hospitals, travel providers, and insurance companies worldwide.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 items-center justify-center mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-center p-4">
              <div className="h-12 w-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-medium">
                Partner {i}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
