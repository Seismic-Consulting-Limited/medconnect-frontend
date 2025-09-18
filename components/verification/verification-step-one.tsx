"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Info, Upload, X, CheckCircle } from "lucide-react"
import { API_ENDPOINTS, buildApiUrl, FILE_UPLOAD_CONSTANTS } from "@/lib/constants"
import { useAuth } from "@/hooks/use-auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface VerificationStepOneProps {
  onNext: () => void
  onBack: () => void
}

interface DocumentStatus {
  id: string
  label: string
  uploaded: boolean
  fileName?: string
  uploadedAt?: string
  accreditationIds?: string[] // Changed from single accreditationId to array
}

interface ApiDocument {
  id: string
  name: string
  fileName?: string
  uploadedAt?: string
}

interface UploadedFile {
  file: File
  documentType: string
  uploading: boolean
  uploaded: boolean
  error?: string
}

export function VerificationStepOne({ onNext, onBack }: VerificationStepOneProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({})
  const [documentStatuses, setDocumentStatuses] = useState<DocumentStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [submittedToBackend, setSubmittedToBackend] = useState(false)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const { user, isAuthenticated, isLoading } = useAuth()

  const checkDocumentStatus = async () => {
    try {
      const token = localStorage.getItem("medconnect_token")
      if (!token) return

      const response = await fetch(buildApiUrl(API_ENDPOINTS.META.CHECK_APPROVAL_DOCUMENTS), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const result = await response.json()
        if (result.data) {
          const allDocuments: DocumentStatus[] = []

          // Add uploaded documents
          if (result.data.uploaded) {
            result.data.uploaded.forEach((doc: ApiDocument) => {
              allDocuments.push({
                id: doc.id,
                label: doc.name,
                uploaded: true,
                fileName: doc.fileName,
                uploadedAt: doc.uploadedAt,
                accreditationIds: [doc.id], // Convert single ID to array
              })
            })
          }

          // Add missing documents
          if (result.data.missing) {
            result.data.missing.forEach((doc: ApiDocument) => {
              allDocuments.push({
                id: doc.id,
                label: doc.name,
                uploaded: false,
                fileName: undefined,
                uploadedAt: undefined,
                accreditationIds: [doc.id], // Convert single ID to array
              })
            })
          }

          setDocumentStatuses(allDocuments)

          const uploadedDocIds = allDocuments.filter((doc) => doc.uploaded).map((doc) => doc.id)
          setSelectedDocuments(uploadedDocIds)
        }
      }
    } catch (error) {
      console.error("Failed to check document status:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      checkDocumentStatus()
    }
  }, [isAuthenticated])

  const handleDocumentChange = (documentId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, documentId])
    } else {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== documentId))
      const newUploadedFiles = { ...uploadedFiles }
      delete newUploadedFiles[documentId]
      setUploadedFiles(newUploadedFiles)
    }
  }

  const handleFileSelect = (documentId: string) => {
    fileInputRefs.current[documentId]?.click()
  }

  const validateFile = (file: File): string | null => {
    if (file.size > FILE_UPLOAD_CONSTANTS.MAX_FILE_SIZE) {
      return FILE_UPLOAD_CONSTANTS.ERROR_MESSAGES.FILE_SIZE
    }

    if (!FILE_UPLOAD_CONSTANTS.ALLOWED_TYPES.includes(file.type as any)) {
      return FILE_UPLOAD_CONSTANTS.ERROR_MESSAGES.FILE_TYPE
    }

    return null
  }

  const handleFileChange = async (documentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      setUploadedFiles((prev) => ({
        ...prev,
        [documentId]: {
          file,
          documentType: documentId,
          uploading: false,
          uploaded: false,
          error: validationError,
        },
      }))
      return
    }

    setUploadedFiles((prev) => ({
      ...prev,
      [documentId]: {
        file,
        documentType: documentId,
        uploading: false,
        uploaded: true, // Mark as uploaded locally
      },
    }))
  }

  const removeUploadedFile = (documentId: string) => {
    const newUploadedFiles = { ...uploadedFiles }
    delete newUploadedFiles[documentId]
    setUploadedFiles(newUploadedFiles)

    // Reset the document status to allow re-upload
    setDocumentStatuses((prev) =>
      prev.map((doc) =>
        doc.id === documentId ? { ...doc, uploaded: false, fileName: undefined, uploadedAt: undefined } : doc,
      ),
    )

    if (fileInputRefs.current[documentId]) {
      fileInputRefs.current[documentId]!.value = ""
    }
  }

  const getDocumentStatus = (documentId: string) => {
    const backendStatus = documentStatuses.find((doc) => doc.id === documentId)
    const localUpload = uploadedFiles[documentId]

    return {
      uploaded: backendStatus?.uploaded || localUpload?.uploaded || false,
      uploading: localUpload?.uploading || false,
      error: localUpload?.error,
      fileName: backendStatus?.fileName || localUpload?.file?.name,
    }
  }

  const hasUploadedDocuments =
    documentStatuses.some((doc) => doc.uploaded) || Object.values(uploadedFiles).some((file) => file.uploaded)

  const uploadedCount =
    documentStatuses.filter((doc) => doc.uploaded).length +
    Object.values(uploadedFiles).filter((file) => file.uploaded).length

  const handleNext = async () => {
    if (!hasUploadedDocuments) return

    setSubmittedToBackend(true)

    try {
      const token = localStorage.getItem("medconnect_token")
      if (!token) return

      // Upload all locally stored files
      for (const [documentId, uploadedFile] of Object.entries(uploadedFiles)) {
        if (uploadedFile.uploaded && uploadedFile.file) {
          const formData = new FormData()
          formData.append("[0]file", uploadedFile.file, uploadedFile.file.name)

          const documentStatus = documentStatuses.find((doc) => doc.id === documentId)
          if (documentStatus?.accreditationIds && documentStatus.accreditationIds.length > 0) {
            documentStatus.accreditationIds.forEach((id, index) => {
              formData.append(`[${index}]accreditation_id`, id)
            })
          }

          await fetch(buildApiUrl(API_ENDPOINTS.META.HOSPITAL_DOCUMENTS), {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
        }
      }

      onNext()
    } catch (error) {
      console.error("Upload error:", error)
      setSubmittedToBackend(false)
    }
  }

  const handleContinueLater = async () => {
    if (!hasUploadedDocuments) return

    setSubmittedToBackend(true)

    try {
      const token = localStorage.getItem("medconnect_token")
      if (!token) return

      // Upload all locally stored files
      for (const [documentId, uploadedFile] of Object.entries(uploadedFiles)) {
        if (uploadedFile.uploaded && uploadedFile.file) {
          const formData = new FormData()
          formData.append("[0]file", uploadedFile.file, uploadedFile.file.name)

          const documentStatus = documentStatuses.find((doc) => doc.id === documentId)
          if (documentStatus?.accreditationIds && documentStatus.accreditationIds.length > 0) {
            documentStatus.accreditationIds.forEach((id, index) => {
              formData.append(`[${index}]accreditation_id`, id)
            })
          }

          await fetch(buildApiUrl(API_ENDPOINTS.META.HOSPITAL_DOCUMENTS), {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
        }
      }

      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Upload error:", error)
      setSubmittedToBackend(false)
    }
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to upload documents and continue with verification.</p>
          <Button onClick={() => (window.location.href = "/login")} className="bg-primary hover:bg-primary/90">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 lg:px-6 py-4 flex items-center justify-between ml-0 lg:ml-64">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Hospital Verification</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="h-5 w-5 bg-gray-400 rounded-full"></div>
            </Button>
            <Button variant="ghost" className="gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm">{user.name?.[0] || user.email?.[0] || "U"}</span>
              </div>
              <span>{user.name || user.email}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="bg-white rounded-lg p-4 lg:p-8">
              {/* Header Section */}
              <div className="flex items-start gap-4 mb-8">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="h-6 w-6 bg-blue-200 rounded"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Accreditation & Certificates</h3>
                  <p className="text-gray-600">
                    Share your accreditations and certifications relevant to international standards and Nigerian
                    regulations.
                  </p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Important Notice</h4>
                    <p className="text-blue-800 text-sm">
                      To gain full access, you are required to <strong>upload 4 compulsory</strong> documents for
                      initial verification. You will have <strong>3 months of full platform access</strong>, after which
                      we will request the remaining 4 documents to complete your hospital's licensing verification.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Selection */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-6">Select Documents to Upload</h4>
                <div className="grid gap-4">
                  {documentStatuses.map((document) => {
                    const docStatus = getDocumentStatus(document.id)
                    const isSelected = selectedDocuments.includes(document.id)

                    return (
                      <div key={document.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={document.id}
                                checked={isSelected}
                                onCheckedChange={(checked) => handleDocumentChange(document.id, checked as boolean)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                              />
                              <div>
                                <label htmlFor={document.id} className="font-medium text-gray-900 cursor-pointer">
                                  {document.label}
                                </label>
                              </div>
                            </div>

                            {docStatus.uploaded && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-green-700">
                                  {submittedToBackend ? "Complete" : "Uploaded"}
                                </span>
                              </div>
                            )}
                          </div>

                          {isSelected && !docStatus.uploaded && (
                            <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                              {docStatus.uploading ? (
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
                                  <p className="text-sm font-medium text-gray-700">Uploading {document.label}...</p>
                                  <p className="text-xs text-gray-500 mt-1">Please wait</p>
                                </div>
                              ) : docStatus.error ? (
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                                    <X className="h-6 w-6 text-red-600" />
                                  </div>
                                  <p className="text-sm font-medium text-red-700 mb-1">Upload Failed</p>
                                  <p className="text-xs text-gray-600 mb-3">{docStatus.error}</p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFileSelect(document.id)}
                                    className="border-red-200 text-red-700 hover:bg-red-50"
                                  >
                                    Try Again
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                    <Upload className="h-6 w-6 text-blue-600" />
                                  </div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">Upload {document.label}</p>
                                  <p className="text-xs text-gray-500 mb-4">
                                    {FILE_UPLOAD_CONSTANTS.ALLOWED_EXTENSIONS.replace(/\./g, "").toUpperCase()} up to{" "}
                                    {FILE_UPLOAD_CONSTANTS.MAX_FILE_SIZE / (1024 * 1024)}MB
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFileSelect(document.id)}
                                    className="bg-white hover:bg-gray-50"
                                  >
                                    Choose File
                                  </Button>
                                  <input
                                    type="file"
                                    ref={(el) => {
                                      fileInputRefs.current[document.id] = el
                                    }}
                                    onChange={(e) => handleFileChange(document.id, e)}
                                    accept={FILE_UPLOAD_CONSTANTS.ALLOWED_EXTENSIONS}
                                    className="hidden"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {docStatus.uploaded && docStatus.fileName && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                  <div className="flex flex-col">
                                    <span className="text-xs text-green-600">{docStatus.fileName}</span>
                                  </div>
                                </div>
                                {!submittedToBackend && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeUploadedFile(document.id)}
                                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  onClick={handleNext}
                  disabled={!hasUploadedDocuments}
                  className={`w-full sm:w-auto px-6 transition-colors ${
                    hasUploadedDocuments
                      ? "bg-primary hover:bg-primary/90 text-white hover:text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next | Upload Logo and Photos →
                </Button>
                <div className="flex flex-col items-end">
                  <Button
                    variant="outline"
                    onClick={handleContinueLater}
                    disabled={!hasUploadedDocuments}
                    className={`w-full sm:w-auto transition-colors ${
                      !hasUploadedDocuments
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary hover:text-white hover:border-primary"
                    }`}
                  >
                    Submit & Continue Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
