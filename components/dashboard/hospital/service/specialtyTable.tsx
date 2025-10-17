'use client'

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import EditSpecialtyModal from './editSpecialtyModal';

const specialties = [
  { id: 1, name: 'Cardiology', category: 'Medicine' },
  { id: 2, name: 'Orthopedics', category: 'Surgery' },
  { id: 3, name: 'Pediatrics', category: 'Medicine' },
];

const SpecialtyTable = () => {
    const [selected, setSelected] = useState<number[]>([])

    const hasSpecialties = specialties.length > 0;

    const handleSelect = (id: number) => {
        if(selected.includes(id)) {
            setSelected((prev) => prev.filter((item) => item !== id))
        } else {
            setSelected((prev) => [...prev, id])
        }
    }

    const selectAll = () => {
        if (selected.length === specialties.length) {
            // Unselect all
            setSelected([]);
        } else {
            // Select all
            const allIds = specialties.map((data) => data.id);
            setSelected(allIds as any);
        }
    };

  return (
    <div>
      <Card>
        <CardContent>
          {hasSpecialties ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S/N</TableHead>
                  <TableHead>Specialty Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specialties.map((specialty, index) => (
                  <TableRow key={specialty.id} className={`${selected.includes(specialty.id as any) && 'bg-[#E4CFF7] border-[1px] border-[#9946E1]'}`} onClick={() => handleSelect(specialty.id)}>
                    <TableCell>{selected.includes(specialty.id) ? <Checkbox checked className="text-white" /> : index + 1}</TableCell>
                    <TableCell>{specialty.name}</TableCell>
                    <TableCell>{specialty.category}</TableCell>
                    <TableCell className="text-right space-x-5">
                        <EditSpecialtyModal />
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
            <div className="text-center py-20 space-y-2 w-full">
              <Image
                src={"/1cc65dfddceb330bcb3ed3054ec7c351350534ce.png"}
                alt=""
                width={100}
                height={100}
                className="mx-auto w-[84px] h-[84px]"
              />
              <h2 className="text-[18px] font-semibold">No Specialties Added</h2>
              <p className="w-[278px] mx-auto text-[14px] font-light text-[#717171]">
                You haven’t added any medical specialties yet. 
                Add specialties so patients can understand your hospital’s areas of expertise.
              </p>
              <Button variant="outline" className="text-[14px] font-light gap-2">
                <Plus size={16} /> Add Specialty
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

export default SpecialtyTable;
