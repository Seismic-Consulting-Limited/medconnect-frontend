"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Edit2, Plus, Trash2 } from "lucide-react";
import DownloadPopover from "@/components/dashboard/hospital/consultants/downloadPopover";
import FilterPopover from "@/components/dashboard/hospital/consultants/filterPopover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteTreatmentModal from "@/components/dashboard/hospital/treatments/deleteTreatmentModal";
import ArchiveTreatmentModal from "@/components/dashboard/hospital/treatments/archiveTreatmentModal";

// ✅ Treatments Array
const treatments = [
  {
    id: 1,
    name: "Knee Replacement Surgery",
    description: "A procedure to replace damaged knee joints with artificial ones.",
    priceRange: "₦2,000,000 - ₦3,500,000",
    duration: "3 hours",
    recoveryPeriod: "6 - 8 weeks",
    hospitalStay: "5 days",
  },
  {
    id: 2,
    name: "Cataract Surgery",
    description: "Removal of cloudy lens and replacement with an artificial lens.",
    priceRange: "₦500,000 - ₦800,000",
    duration: "1 hour",
    recoveryPeriod: "1 - 2 weeks",
    hospitalStay: "1 day",
  },
  {
    id: 3,
    name: "Appendectomy",
    description: "Surgical removal of the appendix.",
    priceRange: "₦400,000 - ₦700,000",
    duration: "1.5 hours",
    recoveryPeriod: "2 - 4 weeks",
    hospitalStay: "3 days",
  },
];

const TreatmentPage = () => {
const [selectedTreatment, setSelectedTreatment] = useState<string[]>([]);
const [openDelete, setOpenDelete] = useState(false)
const [openArchive, setOpenArchive] = useState(false)

  const addAndRemoveTreatment = async (id: string) => {
      setSelectedTreatment((prev) => {
        if(prev.includes(id)) {
          return prev.filter((item) => item !== id)
        } else {
          return [...prev, id]
        }
      });
  }

const selectAll = () => {
  if (selectedTreatment.length === treatments.length) {
    // Unselect all
    setSelectedTreatment([]);
  } else {
    // Select all
    const allIds = treatments.map((data) => data.id);
    setSelectedTreatment(allIds as any);
  }
};

  return (
    <div className="p-5 space-y-5">
      {/* Header with actions */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[20px] font-semibold">Treatments</h2>
        <div className="flex items-center justify-end gap-3">
          <Input placeholder="Search for name and specialty" className="w-[250px]" />
          <DownloadPopover />
          <FilterPopover />
          <Button className="text-[14px] font-light gap-2">
            <Plus size={16} /> Add Treatment
          </Button>
        </div>
      </div>

      {/* Table section */}
      <div>
        <Card>
          <CardContent>
            {treatments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S/N</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price Range</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Recovery Period</TableHead>
                    <TableHead>Hospital Stay</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treatments.map((treatment, index) => (
                    <TableRow className={`${selectedTreatment.includes(treatment.id as any) && 'bg-[#E4CFF7] border-[1px] border-[#9946E1]'}`} key={treatment.id} onClick={() => addAndRemoveTreatment(treatment.id as any)}>
                      <TableCell>
                        {
                          selectedTreatment.includes(treatment.id as any) ? <Checkbox checked className="text-white" /> : index + 1
                        }
                      </TableCell>
                      <TableCell>{treatment.name}</TableCell>
                      <TableCell>{treatment.description}</TableCell>
                      <TableCell>{treatment.priceRange}</TableCell>
                      <TableCell>{treatment.duration}</TableCell>
                      <TableCell>{treatment.recoveryPeriod}</TableCell>
                      <TableCell>{treatment.hospitalStay}</TableCell>
                      <TableCell className="text-right space-x-3">
                        <Button variant="outline" size="sm">
                          <Edit2 />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setOpenDelete(true)}>
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-20 space-y-2 w-full">
                <Image
                  src={"/8e1e1ab8042d6bd38da90afb81a7baddbc633c2d.png"}
                  alt=""
                  width={100}
                  height={100}
                  className="mx-auto w-[84px] h-[84px]"
                />
                <h2 className="text-[18px] font-semibold">No Treatments Added</h2>
                <p className="w-[278px] mx-auto text-[14px] font-light text-[#717171]">
                  You haven’t added any treatments yet. Add treatments to showcase your
                  hospital’s medical services to patients.
                </p>
                <Button variant="outline" className="text-[14px] font-light gap-2">
                  <Plus size={16} /> Add Treatment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {
        selectedTreatment.length > 0 && (
          <Card className="w-[632px] bg-text text-white fixed bottom-10 left-1/2 -translate-x-1/2">
            <CardContent className="py-5">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px]">{selectedTreatment.length} Selected</h2>
                <div className="flex items-center gap-5">
                  <Button variant={'outline'} onClick={selectAll} className="text-[14px] font-light bg-transparent">Select All</Button>
                  <Button onClick={() => setOpenArchive(true)} className="text-[14px] font-light bg-white text-black" variant={'secondary'}>Archive Selected</Button>
                  <Button onClick={() => setOpenDelete(true)} className="text-[14px] font-light bg-[#F04438] text-white">Deleted Selected</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      }


      <DeleteTreatmentModal open={openDelete} setOpen={setOpenDelete} />
      <ArchiveTreatmentModal open={openArchive} setOpen={setOpenArchive} />
    </div>
  );
};

export default TreatmentPage;
