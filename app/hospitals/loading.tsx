import { Skeleton } from "@/components/ui/skeleton"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-20 border-b bg-white"></div>
      <main className="flex-1">
        {/* Search Section Loading State */}
        <section className="w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 md:py-16 lg:py-20">
          <ResponsiveContainer>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Skeleton className="h-10 w-[300px] sm:w-[400px] md:w-[500px] mx-auto" />
                <Skeleton className="h-6 w-[250px] sm:w-[350px] md:w-[450px] mx-auto" />
              </div>
            </div>
            <div className="mt-8 max-w-5xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="h-14 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                <div className="p-6 bg-white">
                  <Skeleton className="h-12 w-full" />
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <Skeleton className="h-5 w-32 mb-3" />
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Skeleton key={i} className="h-5 w-full" />
                            ))}
                        </div>
                      </div>
                      <div>
                        <Skeleton className="h-5 w-32 mb-3" />
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Skeleton key={i} className="h-5 w-full" />
                            ))}
                        </div>
                      </div>
                      <div>
                        <Skeleton className="h-5 w-32 mb-3" />
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Skeleton key={i} className="h-5 w-full" />
                            ))}
                        </div>
                      </div>
                      <div>
                        <Skeleton className="h-5 w-32 mb-3" />
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Skeleton key={i} className="h-5 w-full" />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Results Section Loading State */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <ResponsiveContainer>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-5 w-[300px] mt-2" />
              </div>
              <div className="mt-4 md:mt-0">
                <Skeleton className="h-10 w-[180px]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <Skeleton className="h-[200px] w-full" />
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-6 w-[150px]" />
                        <Skeleton className="h-6 w-[60px]" />
                      </div>
                      <Skeleton className="h-4 w-[120px] mt-2" />
                      <Skeleton className="h-4 w-full mt-3" />
                      <Skeleton className="h-4 w-full mt-1" />
                      <Skeleton className="h-4 w-2/3 mt-1" />
                      <div className="mt-4 flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="mt-4 pt-4 border-t flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-12 text-center">
              <Skeleton className="h-10 w-[200px] mx-auto" />
            </div>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  )
}
