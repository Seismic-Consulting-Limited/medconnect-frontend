"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const FacilitiesTable = () => {
    const [selected, setSelected] = useState<number[]>([])
  // ✅ Array of facilities
  const facilities = [
    {
      id: 1,
      name: "MRI Machine",
      category: "Diagnostic Equipment",
    },
    {
      id: 2,
      name: "Operating Theater",
      category: "Surgical Facility",
    },
    {
      id: 3,
      name: "Pediatric Ward",
      category: "Hospital Department",
    },
  ];

    const handleSelect = (id: number) => {
        if(selected.includes(id)) {
            setSelected((prev) => prev.filter((item) => item !== id))
        } else {
            setSelected((prev) => [...prev, id])
        }
    }

    const selectAll = () => {
        if (selected.length === facilities.length) {
            // Unselect all
            setSelected([]);
        } else {
            // Select all
            const allIds = facilities.map((data) => data.id);
            setSelected(allIds as any);
        }
    };

  return (
    <div>
      <Card>
        <CardContent>
          {facilities.length > 0 ? (
            // ✅ Table view when facilities exist
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilities.map((facility, index) => (
                  <TableRow key={facility.id} className={`${selected.includes(facility.id as any) && 'bg-[#E4CFF7] border-[1px] border-[#9946E1]'}`} onClick={() => handleSelect(facility.id)}>
                    <TableCell>{selected.includes(facility.id) ? <Checkbox checked className="text-white" /> : index + 1}</TableCell>
                    <TableCell>{facility.name}</TableCell>
                    <TableCell>{facility.category}</TableCell>
                    <TableCell className="text-right space-x-5">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-[13px] font-light"
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-[13px] font-light"
                        >
                            <Trash2 /> Delete
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // ❌ Empty state
            <div className="text-center py-20 space-y-2 w-full">
              <Image
                src={"/7bacd3f1e5316b0b65a6a17172fad410672a54cc.png"}
                alt=""
                width={100}
                height={100}
                className="mx-auto w-[84px] h-[84px]"
              />
              <h2 className="text-[18px] font-semibold">
                No Facilities Added
              </h2>
              <p className="w-[278px] mx-auto text-[14px] font-light text-[#717171]">
                Your hospital facilities will appear here once you add them.
                Highlight available infrastructure to attract patients.
              </p>
              <Button
                variant="outline"
                className="text-[14px] font-light gap-2"
              >
                <Plus size={16} /> Add Facility
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

        {
                    selected.length > 0 && (
                      <Card className="w-[632px] bg-text text-white fixed bottom-10 left-1/2 -translate-x-1/2">
                        <CardContent className="py-5">
                          <div className="flex items-center justify-between">
                            <h2 className="text-[16px]">{selected.length} Selected</h2>
                            <div className="flex items-center gap-5">
                              <Button onClick={selectAll} variant={'outline'}  className="text-[14px] font-light bg-transparent">Select All</Button>
                              <Button  className="text-[14px] font-light bg-[#F04438] text-white">Deleted Selected</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
        }
    </div>
  );
};

export default FacilitiesTable;
