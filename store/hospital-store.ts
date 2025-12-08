import { HospitalListDTO } from "@/types/hospital.type";
import { create } from "zustand";

interface HospitalStateProp {
    hospitals: HospitalListDTO[];
    specialties: any[];
    selectedSpecialty: any;
    setSelectedSpecialty: (data: any) => void;
    setSpecialties: (data: any) => void;
    setHospitals: (data: HospitalListDTO[]) => void;
    clearHospitals: () => void;
}

const useHospitalStore = create<HospitalStateProp>((set) => ({
    hospitals: [],
    specialties: [],
    selectedSpecialty: null,
    setSelectedSpecialty: (data) => set({selectedSpecialty: data}),
    setSpecialties: (data) => set({specialties: data}),
    setHospitals: (data) => set({hospitals: data}),
    clearHospitals: () => set({hospitals: []}),
}))

export default useHospitalStore