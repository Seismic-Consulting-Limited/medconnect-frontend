import { create } from "zustand";

interface Location {
  id: string;
  name: string;
  code: string;
}

interface LocationState {
  countries: Location[];
  states: Location[];
  selectedCountry: Location | null;
  selectedState: Location | null;
  setCountries: (countries: Location[]) => void;
  setStates: (states: Location[]) => void;
  setSelectedCountry: (country: Location) => void;
  setSelectedState: (state: Location) => void;
  resetLocation: () => void;
}

const useLocationStore = create<LocationState>((set) => ({
  countries: [],
  states: [],
  selectedCountry: null,
  selectedState: null,

  setCountries: (countries) => set({ countries }),
  setStates: (states) => set({ states }),
  setSelectedCountry: (selectedCountry) => set({ selectedCountry }),
  setSelectedState: (selectedState) => set({ selectedState }),

  resetLocation: () =>
    set({
      countries: [],
      states: [],
      selectedCountry: null,
      selectedState: null,
    }),
}));

export default useLocationStore;
