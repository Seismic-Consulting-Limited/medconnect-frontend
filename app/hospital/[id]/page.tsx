import { use } from "react"
import { HospitalDetailClient } from "./hospital-detail-client"

// Define the type for params
interface HospitalParams {
  id: string
}

export default function HospitalDetailPage({ params }: { params: HospitalParams }) {
  // Use React.use() to unwrap the params object and properly type the result
  const unwrappedParams = use(params as any) as HospitalParams
  const hospitalId = unwrappedParams.id

  // Now we can safely pass the unwrapped ID to our client component
  return <HospitalDetailClient hospitalId={hospitalId} />
}
