"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { FileImage, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const LogoAndPhotoVerification = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const newImages = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 6 - images.length); // limit to 6
    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) =>
        setImages((prev) => [...prev, event.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeLogo = () => setLogo(null);

  return (
    <div className="space-y-10 mt-10">
      {/* Header Section */}
      <div className="flex items-center gap-5">
        <Image
          src="/1a27ee87fe58943d482c05ad81fe6a64cf3e2b77.png"
          alt="Accreditation illustration"
          height={100}
          width={100}
          className="rounded-lg object-contain"
        />
        <div>
          <h1 className="text-[20px] font-bold text-gray-800">
            Logo & Photos
          </h1>
          <p className="text-[16px] font-light text-gray-600">
            Upload your hospital logo and clear front-view photos of your facility.
            These will appear on your public profile for patients to identify and trust your hospital.
          </p>
        </div>
      </div>

      {/* Hospital Logo */}
      <div>
        <h3 className="mb-3 text-[16px] font-medium text-gray-800">
          Hospital Logo
        </h3>
        <input
          type="file"
          accept="image/*"
          ref={logoInputRef}
          className="hidden"
          onChange={handleLogoChange}
        />
        <Card
          className="border-dashed border-[1px] border-[#9946E1] cursor-pointer"
          onClick={() => logoInputRef.current?.click()}
        >
          <CardHeader>
            <div className="text-center space-y-3">
              {logo ? (
                <div className="relative w-[120px] h-[120px] mx-auto">
                  <Image
                    src={logo}
                    alt="Hospital Logo"
                    fill
                    className="object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLogo();
                    }}
                    className="absolute top-[-8px] right-[-8px] bg-white rounded-full p-[2px] shadow"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <>
                  <FileImage className="mx-auto w-[48px] h-[48px]" color="#7E22CE" />
                  <h4 className="text-[16px]">Click to upload or drag and drop</h4>
                  <span className="text-[12px] font-light text-[#A2A2A2]">
                    JPEG, JPG, PNG, SVG
                  </span>
                </>
              )}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Hospital Images */}
      <div>
        <h3 className="mb-3 text-[16px] font-medium text-gray-800">
          Hospital Images{" "}
          <span className="font-light text-[#717171]">(Maximum of 6 photos)</span>
        </h3>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={handleImagesChange}
        />
        <Card
          className="border-dashed border-[1px] border-[#9946E1] cursor-pointer"
          onClick={() => imageInputRef.current?.click()}
        >
          <CardHeader>
            <div className="text-center space-y-3">
              <FileImage className="mx-auto w-[48px] h-[48px]" color="#7E22CE" />
              <h4 className="text-[16px]">Click to upload or drag and drop</h4>
              <span className="text-[12px] font-light text-[#A2A2A2]">
                JPEG, JPG, PNG, SVG
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative w-full aspect-square h-[182px]">
                <Image
                  src={img}
                  alt={`Hospital image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-[-6px] right-[-6px] bg-white rounded-full p-[2px] shadow"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoAndPhotoVerification;
