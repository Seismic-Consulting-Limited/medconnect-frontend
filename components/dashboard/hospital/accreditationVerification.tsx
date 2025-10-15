import React from 'react'
import Image from 'next/image'
import { Card, CardHeader } from '@/components/ui/card'
import { CloudUpload, Info } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const AccreditationVerification = ({formData, setSelectedDocs, setFormData, selectedDocs}: any) => {
    const documents = [
        "Business Registration (CAC)",
        "Federal Ministry of Health Approval",
        "MDCN License",
        "State Operating License",
        "NAFDAC Certification",
        "Environmental & Building Permit",
        "NESREA",
        "Professional Indemnity Insurance",
    ];

  const handleCheckboxChange = (doc: string) => {
    setSelectedDocs((prev) => {
      const updated = prev.includes(doc)
        ? prev.filter((item) => item !== doc)
        : [...prev, doc];

      // Maintain formData consistency with selectedDocs
      setFormData((current) =>
        updated.map((d) => {
          const existing = current.find((item) => item.docName === d);
          return existing || { docName: d, file: null };
        })
      );
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) =>
      prev.map((item) =>
        item.docName === docName ? { ...item, file } : item
      )
    );
  };
  return (
    <div className='space-y-10 mt-5'>
        {/* Header Section */}
        <div className="flex items-center gap-5">
          <Image
            src="/62e053056b39ca0dc56361f8ba02ef1544bda60d.png"
            alt="Accreditation illustration"
            height={100}
            width={100}
            className="rounded-lg object-contain"
          />
          <div>
            <h1 className="text-[20px] font-bold text-gray-800">
              Accreditation & Certificates
            </h1>
            <p className="text-[16px] font-light text-gray-600">
              Share your accreditations and certifications relevant to
              international standards and Nigerian regulations.
            </p>
          </div>
        </div>
                {/* Important Notice */}
        <Card className="bg-[#EFF4FF] border-[#528BFF] border-[1px]">
          <CardHeader className="space-y-3">
            <h2 className="flex items-center gap-2 text-[16px] font-semibold text-[#1A1A1A]">
              <Info className="h-5 w-5 text-[#528BFF]" /> Important Notice
            </h2>
            <p className="text-[14px] font-light text-[#4A4A4A] leading-relaxed">
              To gain full access, you are required to{" "}
              <b>upload 4 compulsory documents</b> for initial verification.
              You’ll have <b>3 months of full platform access</b>, after which we
              will request the remaining 4 documents to complete your hospital’s
              licensing verification.
            </p>
          </CardHeader>
        </Card>

        {/* Document Selection */}
        <div>
          <h3 className="mb-5 text-[16px] font-medium text-gray-800">
            Select Documents
          </h3>
          <div className="grid grid-cols-2 gap-y-4">
            {documents.map((doc, index) => {
              const id = `doc-${index}`;
              const isChecked = selectedDocs.includes(doc);
              return (
                <div key={id} className="flex items-center gap-3">
                  <Checkbox
                    id={id}
                    checked={isChecked}
                    onCheckedChange={() => handleCheckboxChange(doc)}
                  />
                  <Label
                    htmlFor={id}
                    className={`text-[16px] font-light ${
                      isChecked ? "text-[#000]" : "text-[#555555]"
                    }`}
                  >
                    {doc}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

                {/* Upload fields for selected docs */}
        {formData.length > 0 && (
          <div className="space-y-4">
            {formData.map(({ docName, file }) => (
              <Card
                key={docName}
                className="border-dashed border-[1px] border-[#9946E1]"
              >
                <CardHeader>
                  <label
                    htmlFor={`file-${docName}`}
                    className="flex items-center gap-5 text-[#7E22CE] cursor-pointer"
                  >
                    <CloudUpload className="h-5 w-5" />
                    <span className="text-[14px] font-light text-[#555]">
                      {file
                        ? `Uploaded: ${file.name}`
                        : (
                          <>
                            Click to upload <b>{docName}</b>
                          </>
                        )}
                    </span>
                    <input
                      id={`file-${docName}`}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, docName)}
                    />
                  </label>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
    </div>
  )
}

export default AccreditationVerification