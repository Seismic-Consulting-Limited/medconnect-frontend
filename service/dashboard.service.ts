// /services/authService.ts
import axios from "axios";
import { get, post } from "@/utils/request";


export async function patientDashboardService(){
    try {
        await get('/patients/dashboard/');
    } catch(error: any) {
        console.log(error)
    }
}

export async function hospitalDashboardService(){
    try {
        await get('/hospitals/dashboard');
    } catch(error: any) {
        console.log(error)
    }
}

export async function medicalStaffDashboardService(){
    try {
        await get('/medical-staff/dashboard');
    } catch(error: any) {
        console.log(error)
    }
}