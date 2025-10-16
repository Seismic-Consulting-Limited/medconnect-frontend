"use client";

import ConsultantAddedModal from "@/components/dashboard/hospital/consultants/consultantAddedModal";
import IconInputField from "@/components/shared/IconInputField";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, Stethoscope, Wallet } from "lucide-react";
import React, { useState } from "react";

const AddConsultantPage = () => {
    const [open, setOpen] = useState(false);
  return (
    <div className="max-h-screen bg-[#FAFAFA]">
      {/* Header */}
        <div className='bg-white shadow flex items-center gap-5 h-[92px] p-[24px]'> 
            <ArrowLeft className='w-[20px] h-[20px]' /> 
            <div> 
                <span className='flex items-center gap-3 text-[#C0C0C0] text-[14px] font-light'>
                    Consultants 
                    <div>
                    </div> 
                    <p className='text-text'>Add New Consultant</p>
                </span> 
            </div> 
        </div>

      {/* Form */}
      <div className="max-w-[720px] mx-auto py-10 px-5 space-y-8">
        <h2 className="text-[28px] font-semibold text-gray-800">
          Add New Consultant
        </h2>

        <div className="space-y-6">
          {/* Name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <IconInputField
              label="First Name *"
              placeholder="e.g., Zainab"
              icon={<User />}
            />
            <IconInputField
              label="Surname *"
              placeholder="e.g., Ahmed"
              icon={<User />}
            />
          </div>

          {/* Contact fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <IconInputField
              label="Email *"
              placeholder="e.g., zainab@example.com"
              icon={<Mail />}
              type="email"
            />
            <IconInputField
              label="Phone Number"
              optionalText="Optional"
              placeholder="e.g., +234 812 345 6789"
              icon={<Phone />}
            />
          </div>

          {/* Specialties */}
          <IconInputField
            label="Specialties *"
            optionalText="Type specialties separated by commas"
            placeholder="e.g., Cardiology, Dermatology"
            icon={<Stethoscope />}
          />

          {/* Fee */}
          <IconInputField
            label="Consultation Fee *"
            placeholder="e.g., ₦10,000"
            icon={<Wallet />}
          />

            <div className="grid grid-cols-2 gap-5">
                <Button onClick={() => setOpen(true)}>Save & Invite Consultant</Button>
                <Button variant={'outline'}>Cancel</Button>
            </div>
        </div>
      </div>

      <ConsultantAddedModal  open={open} setOpen={setOpen} />
    </div>
  );
};

export default AddConsultantPage;
