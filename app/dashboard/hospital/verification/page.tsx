"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AccreditationVerification from "@/components/dashboard/hospital/accreditationVerification";
import LogoAndPhotoVerification from "@/components/dashboard/hospital/logoAndPhotoVerification";
import TermsOfAgreementModal from "@/components/dashboard/hospital/termsOfAgreementModal";

const VerificationPage = () => {
  const [step, setStep] = useState(1);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [formData, setFormData] = useState<{ docName: string; file: File | null }[]>([]);
  const [open, setOpen] = useState(false)

  const handleNext = () => {
    if (step === 1) setStep(2);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSaveAndContinueLater = () => {
    const savedData = {
      step,
      selectedDocs,
      formData,
    };
    localStorage.setItem("verification-progress", JSON.stringify(savedData));
    console.log("Progress saved:", savedData);
    alert("Your progress has been saved. You can continue later.");
  };

  const handleSubmit = () => {
    const uploaded = formData.filter((item) => item.file);
    console.log("FormData ready to send:", uploaded);

    setOpen(true);

    // Example API prep
    // const form = new FormData();
    // uploaded.forEach(({ docName, file }) => {
    //   if (file) form.append(docName, file);
    // });
    // fetch("/api/upload-docs", { method: "POST", body: form });
  };

  // Dynamic step progress
  const progress = step === 1 ? 35 : 100;

  return (
    <div className="relative max-h-screen py-8 bg-gray-50">
      <div className="max-w-[720px] mx-auto pb-24">
        {/* Progress Header */}
        <div className="space-y-5 mb-10">
          <div className="flex items-center justify-between">
            <span className="text-[18px] font-semibold">
              Step {step} of 2
            </span>
            <p className="text-[18px] font-light text-gray-600">{progress}%</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#7E22CE] h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 ? (
          <AccreditationVerification
            formData={formData}
            setFormData={setFormData}
            selectedDocs={selectedDocs}
            setSelectedDocs={setSelectedDocs}
          />
        ) : (
          <LogoAndPhotoVerification />
        )}
      </div>

      {/* Bottom Actions */}
      <div className="w-full bg-white border-t border-gray-200 flex items-center justify-center fixed bottom-0 left-0 py-5 gap-6">
        {step > 1 && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}

        <Button
          className="flex items-center gap-2"
          onClick={handleNext}
          disabled={step === 1 && formData.length === 0}
        >
          {step === 1 ? (
            <>
              Next | Upload Logo and Photos <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            "Submit Verification"
          )}
        </Button>
        {step >= 1 && (
            <Button variant="outline" onClick={handleSaveAndContinueLater}>
                Save & Continue Later
            </Button>
        )}

      </div>

      <TermsOfAgreementModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default VerificationPage;
