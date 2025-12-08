'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function HospitalCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Image placeholder */}
      <Skeleton className="h-[220px] w-full" />

      <div className="space-y-3 p-5">
        {/* Hospital name */}
        <Skeleton className="h-4 w-3/4" />

        {/* Specialties */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* Accreditations */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* Footer (location + rating) */}
        <div className="flex items-center justify-between mt-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
}
