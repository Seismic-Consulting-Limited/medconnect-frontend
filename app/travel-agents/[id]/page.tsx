import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { apiRequest } from "@/lib/utils/api-request"
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants"
import type { TravelAgentDTO, TravelAgentUI } from "@/lib/types/travel-agent"
import { TravelAgentDetailView } from "@/components/travel-agent-detail-view"

type Props = {
  params: Promise<{ id: string }>
}

// Data transformation function to convert API response to UI format
function transformTravelAgentData(dto: TravelAgentDTO): TravelAgentUI {
  const locationParts = [dto.location?.address_1, dto.location?.state?.name].filter(Boolean)

  return {
    id: String(dto.id),
    name: dto.name,
    description: dto.description || "—",
    fullDescription: dto.full_description || dto.description,
    location: locationParts.join(", ") || "—",
    address: dto.location?.address_1,
    state: dto.location?.state?.name,
    country: "Nigeria",
    image: dto.profile_image || dto.cover_image_url || dto.logo_url || "/placeholder.svg",
    rating: typeof dto.rating === "number" ? dto.rating : 0,
    reviews: typeof dto.reviews_count === "number" ? dto.reviews_count : 0,
    destinations: Array.isArray(dto.destinations)
      ? dto.destinations.map((d) => (typeof d === "string" ? d : d?.name)).filter(Boolean)
      : [],
    services: Array.isArray(dto.services)
      ? dto.services.map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean)
      : [],
    hospitalPartners: Array.isArray(dto.hospital_partners)
      ? dto.hospital_partners.map((h) => (typeof h === "string" ? h : h?.name)).filter(Boolean)
      : [],
    certifications: Array.isArray(dto.certifications)
      ? dto.certifications.map((c) => (typeof c === "string" ? c : c?.name)).filter(Boolean)
      : [],
    price:
      dto.price_tier === 1 || dto.price_tier === "$"
        ? "$"
        : dto.price_tier === 2 || dto.price_tier === "$$"
          ? "$$"
          : "$$$",
    languages: dto.languages,
    yearFounded: dto.year_founded,
    yearsOfExperience: dto.years_of_experience,
    phoneNumber1: dto.phone_number_1,
    phoneNumber2: dto.phone_number_2,
    websiteUrl: dto.website_url,
    registrationNumber: dto.registration_number,
    images: dto.images,
    internationalClients: dto.international_clients,
  }
}

async function getTravelAgent(id: string): Promise<TravelAgentUI | null> {
  try {
    console.log("[v0] Fetching travel agent with ID:", id)
    const url = API_ENDPOINTS.META.TRAVEL_AGENT_DETAIL(id)
    console.log("[v0] API URL:", url)

    const response = await apiRequest<{ data: TravelAgentDTO }>(url, {
      method: HTTP_METHODS.GET,
    })

    console.log("[v0] Travel agent data received:", response)

    if (!response?.data) {
      console.log("[v0] No travel agent data in response")
      return null
    }

    const transformedData = transformTravelAgentData(response.data)
    console.log("[v0] Transformed travel agent data:", transformedData)

    return transformedData
  } catch (error) {
    console.error("[v0] Error fetching travel agent:", error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const agent = await getTravelAgent(id)

  if (!agent) {
    return {
      title: "Travel Agent Not Found",
      description: "The requested travel agent could not be found.",
    }
  }

  return {
    title: `${agent.name} - Travel Agent | MedConnect`,
    description: agent.description,
    openGraph: {
      title: `${agent.name} - Travel Agent`,
      description: agent.description,
      images: agent.image ? [{ url: agent.image }] : [],
    },
  }
}

export default async function TravelAgentDetailPage({ params }: Props) {
  const { id } = await params
  console.log("[v0] Travel agent detail page - ID:", id)

  const agent = await getTravelAgent(id)

  if (!agent) {
    console.log("[v0] Travel agent not found, showing 404")
    notFound()
  }

  console.log("[v0] Rendering travel agent detail view for:", agent.name)

  return <TravelAgentDetailView agent={agent} />
}
