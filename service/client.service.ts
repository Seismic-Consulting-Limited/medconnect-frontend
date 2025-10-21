// /services/authService.ts
import axios from "axios";
import { post } from "@/utils/request";
import { ClientRegisterProp } from "@/types/client.type";
import { RequestResponse } from "@/types/response.type";


export async function registerPatientService(data: ClientRegisterProp){
        return await post<RequestResponse>('/auth/patients/signup/', data);
}