'use client';

import { useEffect, useState } from 'react';
import AdvancedFilter from '@/components/hospital/advancedFilter';
import Filters from '@/components/hospital/filters';
import HospitalCard from '@/components/hospital/hospitalCard';
import Paginations from '@/components/hospital/pagination';
import { fetchAllHospitals } from '@/service/hospital.service';
import useHospitalStore from '@/store/hospital-store';
import HospitalCardSkeleton from '@/components/skeletons/hospitalCardSkeleton';
import useLocationStore from '@/store/location.store';

const HospitalsPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10; // default items per page (from your API)

  const {
    selectedState,
  } = useLocationStore()

  const { hospitals, setHospitals, selectedSpecialty } = useHospitalStore();

  const fetchHospital = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await fetchAllHospitals({ limit, offset }, selectedSpecialty?.id, selectedState?.id);

      const data = response?.data;
      setHospitals(data?.results || []);

      // Calculate total pages = total count / limit
      const total = Math.ceil((data?.count || 0) / (data?.limit || limit));
      setTotalPages(total);
    } catch (error: any) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospital(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div>
      <div className="text-center space-y-5 py-10 bg-white px-5 lg:px-0">
        <h1 className="font-semibold text-[32px] text-text">
          Find Your Ideal Hospital in Nigeria
        </h1>
        <p className="lg:w-[622px] text-[14px] lg:text-[16px] text-[#717171] mx-auto">
          Search our network of accredited hospitals across Nigeria to find the
          perfect match for your healthcare needs.
        </p>

        <AdvancedFilter fetchHospital={fetchHospital} />

        {/* Popular and Top Destination Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-6 lg:gap-16 w-full px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            <p className="text-[12px] lg:text-[16px] font-light text-left">
              Popular:
            </p>
            <div className="flex flex-wrap gap-2">
              {['Cardiology', 'Orthopedics', 'Dental'].map((specialty, i) => (
                <span
                  key={i}
                  className="py-[6px] px-[8px] lg:px-[14px] bg-[#F2F2F2] text-[8px] lg:text-[10px] uppercase text-[#555] border border-[#D7D7D7] rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            <p className="text-[12px] lg:text-[16px] font-light text-left">
              Top Destinations:
            </p>
            <div className="flex flex-wrap gap-3">
              {['Lagos', 'Abuja', 'Kano'].map((location, i) => (
                <span
                  key={i}
                  className="py-[6px] px-[8px] lg:px-[14px] bg-[#F2F2F2] text-[8px] lg:text-[10px] uppercase text-[#555] border border-[#D7D7D7] rounded-full"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <Filters />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <HospitalCardSkeleton key={i} />
            ))}
          </div>
        ) : hospitals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {hospitals.map((hospital, index) => (
                <HospitalCard key={index} hospitals={hospital} />
              ))}
            </div>

            <Paginations
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No hospitals found.
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalsPage;
