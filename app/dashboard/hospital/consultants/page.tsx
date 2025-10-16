"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Users,
  CheckCircle2,
  Clock4,
  Archive,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterPopover from "@/components/dashboard/hospital/consultants/filterPopover";
import DownloadPopover from "@/components/dashboard/hospital/consultants/downloadPopover";
import { useRouter } from "next/navigation";
import { consultantStats } from "@/constant/consultationData";

const ConsultantsPage = () => {
  const router = useRouter()
  // ✅ Summary stats


  // ✅ Consultants data (mock)
  const consultants = [
    {
      id: 1,
      name: "Dr. John Adewale",
      specialty: "Cardiology",
      fee: "₦15,000",
      profileStatus: "Completed",
      dateAdded: "2025-10-01",
      appointments: 12,
    },
    {
      id: 2,
      name: "Dr. Grace Eze",
      specialty: "Dermatology",
      fee: "₦10,000",
      profileStatus: "Pending",
      dateAdded: "2025-09-25",
      appointments: 8,
    },
    {
      id: 3,
      name: "Dr. Musa Ibrahim",
      specialty: "Neurology",
      fee: "₦18,000",
      profileStatus: "Completed",
      dateAdded: "2025-09-10",
      appointments: 15,
    },
    {
      id: 4,
      name: "Dr. Ngozi Okafor",
      specialty: "Pediatrics",
      fee: "₦12,000",
      profileStatus: "Completed",
      dateAdded: "2025-09-05",
      appointments: 9,
    },
  ];

  return (
    <div className="px-5 my-5 space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {consultantStats.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full w-[40px] h-[40px] flex items-center justify-center"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    {card.icon}
                  </div>
                  <h2>{card.title}</h2>
                </div>
                <div className="rounded-full w-[40px] h-[40px] bg-[#E6E6E6] flex items-center justify-center">
                  <ChevronRight />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h1 className="text-[48px] font-bold">{card.count}</h1>
              <p className="font-light text-[#717171] text-[14px]">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header with actions */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[20px] font-semibold">Consultants</h2>
        <div className="flex items-center justify-end gap-3">
          <Input placeholder="Search for name and specialty" className="w-[250px]" />
          <DownloadPopover />
          <FilterPopover />
          <Button onClick={() => router.push('/dashboard/hospital/consultants/addConsultant')} className="text-[14px] font-light gap-2">
            <Plus size={16} /> Add Consultant
          </Button>
        </div>
      </div>

      {/* Table section */}
      <div>
        <Card>
          <CardContent>
            {consultants.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S/N</TableHead>
                    <TableHead>Consultant Name</TableHead>
                    <TableHead>Primary Specialty</TableHead>
                    <TableHead>Consultation Fee</TableHead>
                    <TableHead>Profile Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Appointments</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultants.map((consultant, index) => (
                    <TableRow key={consultant.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image src={""} alt={""} width={50} height={50} className="rounded-full"/>
                          {consultant.name}
                        </div>
                      </TableCell>
                      <TableCell>{consultant.specialty}</TableCell>
                      <TableCell>{consultant.fee}</TableCell>
                      <TableCell>
                        <span className={
                          consultant.profileStatus === "Completed"
                            ? "text-[#155EEF] w-[131px] px-[24px] py-[14px] rounded-full font-medium border-[0.5px] border-[#155EEF] bg-[#D1E0FF]"
                            : "text-[#DC6803] w-[131px] px-[24px] py-[14px] rounded-full font-medium border-[0.5px] border-[#DC6803] bg-[#FEF0C7]"
                        }>
                          {consultant.profileStatus}
                        </span>
                      </TableCell>
                      <TableCell>{consultant.dateAdded}</TableCell>
                      <TableCell>{consultant.appointments}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-20 space-y-2 w-full">
                <Image
                  src={"/d39c20e3e93e46cb3db2037b492288d0f08332e9.png"}
                  alt={""}
                  width={100}
                  height={100}
                  className="mx-auto w-[84px] h-[84px]"
                />
                <h2 className="text-[18px] font-semibold">
                  No Consultants Added Yet
                </h2>
                <p className="w-[278px] mx-auto text-[14px] font-light text-[#717171]">
                  You haven’t added any Consultants to your hospital profile.
                  Add Consultants so patients can view and book them.
                </p>
                <Button variant="outline" className="text-[14px] font-light gap-2">
                  <Plus size={16} /> Add First Consultant
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsultantsPage;
