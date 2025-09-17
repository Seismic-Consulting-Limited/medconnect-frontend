import { API_CONFIG, API_ENDPOINTS } from "@/lib/constants"
import HospitalDetailView from "@/components/hospital-detail-view"

function transformHospitalData(apiData: any): any {
  if (!apiData) return null

  return {
    id: apiData.id,
    name: apiData.name,
    description: apiData.description,
    fullDescription: apiData.description,
    image: apiData.profile_image || apiData.cover_image_url,
    rating: apiData.rating || 0,
    reviews: apiData.reviews_count || 0,
    city: apiData.location?.address_1 || "",
    state: apiData.location?.state?.name || "",
    country: apiData.location?.country || "",
    specialties: Array.isArray(apiData.specialties)
      ? apiData.specialties.map((s: any) => (typeof s === "string" ? s : s.name || s.description))
      : [],
    treatments: Array.isArray(apiData.treatments)
      ? apiData.treatments.map((t: any) => (typeof t === "string" ? t : t.name || t.description))
      : [],
    facilities: Array.isArray(apiData.facilities)
      ? apiData.facilities.map((f: any) => (typeof f === "string" ? f : f.name || f.description))
      : [],
    accreditations: Array.isArray(apiData.accreditations)
      ? apiData.accreditations.map((a: any) => (typeof a === "string" ? a : a.name || a.description))
      : [],
    languages: Array.isArray(apiData.languages)
      ? apiData.languages.map((l: any) => (typeof l === "string" ? l : l.name || l.description))
      : [],
    founded: apiData.founded,
    beds: apiData.beds,
    doctors: apiData.doctors,
    internationalPatients: apiData.international_patients,
    images: Array.isArray(apiData.images) ? apiData.images : [],
  }
}

export default async function HospitalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  console.log("[v0] Hospital ID from params:", id)

  let hospitalDetails: any = null
  let similarHospitals: any[] = []
  let error: string | null = null

  try {
    const hospitalUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.META.HOSPITAL_DETAIL(id)}`
    console.log("[v0] Fetching hospital from:", hospitalUrl)

    const hospitalResponse = await fetch(hospitalUrl, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!hospitalResponse.ok) {
      const errorText = await hospitalResponse.text()
      error = `Failed to fetch hospital: ${hospitalResponse.status} ${hospitalResponse.statusText} - ${errorText}`
      console.log("[v0] Hospital fetch failed:", error)
    } else {
      const hospitalData = await hospitalResponse.json()
      console.log("[v0] Hospital data received:", hospitalData)

      let rawHospitalData = null
      if (hospitalData?.status === "success" && hospitalData?.data) {
        rawHospitalData = hospitalData.data
      } else {
        rawHospitalData = hospitalData?.data ?? hospitalData
      }

      hospitalDetails = transformHospitalData(rawHospitalData)

      if (hospitalDetails) {
        try {
          const hospitalsUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.META.HOSPITALS}`
          console.log("[v0] Fetching similar hospitals from:", hospitalsUrl)

          const hospitalsResponse = await fetch(hospitalsUrl, {
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          })

          if (hospitalsResponse.ok) {
            const hospitalsData = await hospitalsResponse.json()
            let allHospitals = hospitalsData?.data ?? hospitalsData
            if (hospitalsData?.data?.results) {
              allHospitals = hospitalsData.data.results
            }

            if (Array.isArray(allHospitals)) {
              similarHospitals = allHospitals
                .filter((h: any) => String(h?.id) !== String(id))
                .slice(0, 3)
                .map(transformHospitalData)
            }
          }
        } catch (similarError) {
          console.log("[v0] Failed to fetch similar hospitals:", similarError)
          // Don't fail the whole page if similar hospitals can't be loaded
        }
      }
    }
  } catch (fetchError) {
    error = `Network error: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`
    console.log("[v0] Network error:", fetchError)
  }

  console.log("[v0] Final hospital details:", hospitalDetails)
  console.log("[v0] Final error:", error)

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
