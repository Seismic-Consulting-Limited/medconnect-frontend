'use client'

import React, { useEffect, useState } from 'react'
import { Flag, MapPin, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Stethoscope } from '../ui/stethoscope'
import { fetchAllCountry, fetchCountryState } from '@/service/location.service'
import useLocationStore from '@/store/location.store'
import useHospitalStore from '@/store/hospital-store'
import { fetchSpecialties } from '@/service/hospital.service'
import { Skeleton } from '@/components/ui/skeleton'

const AdvancedFilter = ({fetchHospital}: any) => {
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingSpecialties, setLoadingSpecialties] = useState(true)

  const { setSpecialties, specialties, setSelectedSpecialty, selectedSpecialty } = useHospitalStore()
  const {
    countries,
    states,
    selectedCountry,
    selectedState,
    setCountries,
    setStates,
    setSelectedCountry,
    setSelectedState,
  } = useLocationStore()

  /** Fetch all specialties */
  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const res = await fetchSpecialties()
        setSpecialties(res?.data || [])
      } catch (err) {
        console.error('Failed to fetch specialties:', err)
      } finally {
        setLoadingSpecialties(false)
      }
    }
    getSpecialties()
  }, [setSpecialties])

  /** Fetch all countries */
  useEffect(() => {
    const getCountries = async () => {
      setLoadingCountries(true)
      try {
        const res = await fetchAllCountry()
        setCountries(res?.data || [])
      } catch (err) {
        console.error('Failed to fetch countries:', err)
      } finally {
        setLoadingCountries(false)
      }
    }
    getCountries()
  }, [setCountries])

  /** Fetch states for selected country */
  useEffect(() => {
    if (!selectedCountry) return
    const getStates = async () => {
      setLoadingStates(true)
      try {
        const res = await fetchCountryState(selectedCountry.id)
        setStates(res?.data || [])
      } catch (err) {
        console.error('Failed to fetch states:', err)
      } finally {
        setLoadingStates(false)
      }
    }
    getStates()
  }, [selectedCountry, setStates])

  useEffect(() => {
    if(!selectedSpecialty && !selectedState) return;
    fetchHospital()
  }, [selectedSpecialty, selectedState])

  return (
    <div className="p-[8px] bg-[#F3E9FB] border border-[#9946E1]/50 rounded-[16px] w-full max-w-[1003px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full bg-white border border-[#D7D7D7]/70 rounded-l-[12px] overflow-hidden">

          {/* Specialty */}
          <Select
            onValueChange={(id) => {
              const specialty = specialties.find((c) => c.id === id)
              if (specialty) setSelectedSpecialty(specialty);
            }}
            disabled={loadingSpecialties}
          >
            <SelectTrigger className="w-full h-[52px] text-[14px] text-[#717171] border-none focus:ring-0 focus:outline-none">
              <div className='flex items-center gap-2'>
                <Stethoscope className='w-[16px] h-[16px]' />
                <SelectValue placeholder={loadingSpecialties ? "Loading specialties..." : "Choose Specialty"} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {loadingSpecialties ? (
                <div className="p-2 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-4 w-[180px]" />
                  ))}
                </div>
              ) : (
                specialties.map((specialty) => (
                  <SelectItem key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Country */}
          <Select
            onValueChange={(id) => {
              const country = countries.find((c) => c.id === id)
              if (country) setSelectedCountry(country)
            }}
            disabled={loadingCountries}
          >
            <SelectTrigger className="w-full h-[52px] text-[14px] text-[#717171] border-none focus:ring-0 focus:outline-none">
              <div className='flex items-center gap-2'>
                <Flag className='w-[16px] h-[16px]' />
                <SelectValue placeholder={loadingCountries ? "Loading countries..." : "Select Country"} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {loadingCountries ? (
                <div className="p-2 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-4 w-[180px]" />
                  ))}
                </div>
              ) : (
                countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* State */}
          <Select
            disabled={!selectedCountry || loadingStates}
            onValueChange={(id) => {
              const state = states.find((s) => s.id === id)
              if (state) setSelectedState(state)
            }}
          >
            <SelectTrigger className="w-full h-[52px] text-[14px] text-[#717171] border-none focus:ring-0 focus:outline-none">
              <div className='flex items-center gap-2'>
                <MapPin className='w-[16px] h-[16px]' />
                <SelectValue placeholder={!selectedCountry ? "Select Country first" : loadingStates ? "Loading states..." : "Select State"} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {loadingStates ? (
                <div className="p-2 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-4 w-[180px]" />
                  ))}
                </div>
              ) : (
                states.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {state.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* City placeholder */}
          <Select disabled>
            <SelectTrigger className="w-full h-[52px] text-[14px] text-[#717171] border-none focus:ring-0 focus:outline-none">
              <div className='flex items-center gap-2'>
                <MapPin className='w-[16px] h-[16px]' />
                <SelectValue placeholder="Select City" />
              </div>
            </SelectTrigger>
          </Select>
        </div>

        {/* Search Button */}
        <Button
          onClick={() => {
            window.scrollTo({ top: 700, behavior: 'smooth' })
          }}
          className="flex items-center justify-center gap-2 bg-[#9946E1] text-white hover:bg-[#8535c6] rounded-r-[12px] h-[52px] lg:h-auto w-full lg:w-[180px] transition-all"
        >
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
    </div>
  )
}

export default AdvancedFilter
