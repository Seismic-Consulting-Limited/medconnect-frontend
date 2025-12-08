import { get } from "@/utils/request"

export const fetchAllCountry = async () => {
    return await get('/countries')
}

export const fetchCountryState = async (id: string) => {
    return await get(`/countries/${id}/states`)
}