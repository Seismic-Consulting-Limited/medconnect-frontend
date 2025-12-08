import { get } from "@/utils/request"

export const fetchAllHospitals = async (
  { limit, offset }: { limit: number; offset: number },
  specialtyId?: string | number,
  stateId?: string | number,
  minPrice?: number
) => {
  // Build query params dynamically
  const params = new URLSearchParams();

  // Pagination
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  // Conditional filters
  if (specialtyId) params.append('specialties', specialtyId.toString());
  if (stateId) params.append('state', stateId.toString());
  if (minPrice) params.append('min_price', minPrice.toString());

  // Build final query string
  const query = params.toString();

  // Send request
  return await get(`/hospitals/?${query}`);
};

export const fetchSingleHospital = async (id: string) => {
    return await get(`/hospitals/${id}`)
}


export const fetchSpecialties = async () => {
    return await get('/specialties/')
}

export const fetchSingleSpecialties = async (id: string) => {
    return await get(`/hospitals/${id}/specialties/`)
}

export const fetchHospitalConsultants = async (id: string) => {
  return await get(`/hospitals/${id}/medical-staff`)
}