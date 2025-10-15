'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import InfoSection from '@/components/profile/InfoSection'
import PersonalDetailsModal from './personalDetailsModal'
import MedicalInformationModal from './medicalInformationModal'
import EmergencyContactModal from './emergencyContactModal'

const ProfilePage = () => {
  return (
    <div className="w-[968px] mx-auto my-5 space-y-5">
      {/* Profile Photo */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-[18px]">Profile Photo</CardTitle>
          <CardDescription>View and manage your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3 mt-5">
            <div className="font-semibold text-[24px] w-[76px] h-[76px] bg-[#E4CFF7] rounded-full border-[0.5px] border-[#9946E1] flex items-center justify-center">
              PP
            </div>
            <div>
              <h2 className="text-[16px] font-semibold">Profile Picture</h2>
              <span className="text-[#717171] text-[12px] font-light">PNG, JPEG, Under 15MB</span>
            </div>
          </div>
          <Button variant="outline" className="font-light">View new picture</Button>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <InfoSection
        title="Personal Details"
        fields={[
          { label: 'Full Names', value: 'Peter Parker' },
          { label: 'Email', value: 'peterparker@gmail.com' },
          { label: 'Phone Number', value: '+234 800 123 4567' },
          { label: 'Gender', value: 'Male' },
          { label: 'Date Of Birth', value: '1998-04-10' },
          { label: 'Location', value: 'New York, USA' },
        ]}
        twoColumn
        EditComponent={<PersonalDetailsModal />}
      />

      {/* Medical Information */}
      <InfoSection
        title="Medical Information"
        fields={[
          { label: 'Blood Group', value: 'O+' },
          { label: 'Genotype', value: 'AA' },
          { label: 'Allergies', value: 'Peanuts' },
          { label: 'Existing Conditions', value: 'Asthma' },
        ]}
        twoColumn
        EditComponent={<MedicalInformationModal />}
      />

      {/* Emergency Contact */}
      <InfoSection
        title="Emergency Contact"
        fields={[
          { label: 'Full Name', value: 'Mary Jane' },
          { label: 'Email', value: 'maryjane@gmail.com' },
          { label: 'Phone Number', value: '+234 812 123 4567' },
          { label: 'Location', value: 'Brooklyn, NY' },
        ]}
        twoColumn
        EditComponent={<EmergencyContactModal />}
      />
    </div>
  )
}

export default ProfilePage
