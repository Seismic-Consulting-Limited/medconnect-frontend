'use client'
import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit2 } from 'lucide-react'

type InfoField = {
  label: string
  value: string
}

type InfoSectionProps = {
  title: string
  editable?: boolean
  twoColumn?: boolean
  fields: InfoField[]
  EditComponent?: ReactNode // 👈 modal or trigger component
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  editable = true,
  twoColumn = false,
  fields,
  EditComponent,
}) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[18px]">{title}</CardTitle>
          {editable && (
            EditComponent || (
              <Button variant="outline" className="font-light flex items-center gap-2">
                <Edit2 size={16} /> Edit Details
              </Button>
            )
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="mt-5 space-y-3">
          <div className={`grid ${twoColumn ? 'grid-cols-2 gap-3' : 'grid-cols-1'}`}>
            {fields.map((field, index) => (
              <div key={index} className="p-[12px] border rounded-[8px]">
                <span className="text-[#717171] text-[12px]">{field.label}</span>
                <h2 className="text-[18px] font-semibold">{field.value}</h2>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InfoSection
