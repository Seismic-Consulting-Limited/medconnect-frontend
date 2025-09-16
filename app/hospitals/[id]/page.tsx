// app/hospitals/[id]/page.tsx
import { API_CONFIG, API_ENDPOINTS } from "@/lib/constants"
import HospitalDetailView from "@/components/hospital-detail-view"

export default async function HospitalDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  let hospitalDetails: any = null
  let similarHospitals: any[] = []
  let error: string | null = null

  try {
    const hospitalsUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.META.HOSPITALS}`
    const hospitalsResponse = await fetch(hospitalsUrl, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!hospitalsResponse.ok) {
      error = `Failed to fetch hospitals: ${hospitalsResponse.status} ${hospitalsResponse.statusText}`
    } else {
      const hospitalsData = await hospitalsResponse.json()

      let allHospitals = hospitalsData?.data ?? hospitalsData
      if (hospitalsData?.data?.results) {
        allHospitals = hospitalsData.data.results
      }

      if (Array.isArray(allHospitals)) {
        hospitalDetails = allHospitals.find((h: any) => String(h?.id) === String(id)) ?? null
        if (hospitalDetails) {
          similarHospitals = allHospitals.filter((h: any) => String(h?.id) !== String(id)).slice(0, 3)
        } else {
          error = `Hospital with ID ${id} not found`
        }
      } else {
        error = "Unexpected hospitals payload shape."
      }
    }
  } catch (fetchError) {
    error = `Network error: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`

  }

  return (
    <div className="min-h-screen bg-gray-50">
      {hospitalDetails ? (
        <HospitalDetailView hospital={hospitalDetails} similarHospitals={similarHospitals} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Hospital Details</h1>
              <div className="text-gray-600 mb-6">
                <p>Hospital ID: {String(id)}</p>
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{String(error)}</p>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                <p>The hospital details could not be loaded at this time.</p>
                <p>Please try again later or contact support if the issue persists.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
