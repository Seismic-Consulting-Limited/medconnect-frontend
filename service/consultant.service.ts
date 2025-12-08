import { get } from "@/utils/request"

export const fetchAllConsultants = async () => {
    return await get(`/medical-staff/`)
}

export const fetchHospitalConsultants = async (id: string) => {
  return await get(`/hospitals/${id}/medical-staff`)
}