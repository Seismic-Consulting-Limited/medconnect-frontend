"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
  MapPin,
  Globe,
  CheckCircle,
  DollarSign,
  Clock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Hospital type definition
interface Hospital {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  reviews: number;
  image: string;
  description: string;
  price: string;
  languages?: string[];
  accreditations?: string[];
  waitTime?: string;
  successRate?: number;
  procedures?: {
    name: string;
    cost: string;
    waitTime: string;
  }[];
}

interface HospitalComparisonProps {
  hospitals: Hospital[];
  selectedHospitals: string[];
  onClose: () => void;
  onRemoveHospital: (id: string) => void;
  onAddHospital: () => void;
}

const HOSPITALS_PER_PAGE = 3;
const MAX_COMPARE = 6;

export function HospitalComparison({
  hospitals,
  selectedHospitals,
  onClose,
  onRemoveHospital,
  onAddHospital,
}: HospitalComparisonProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState<"general" | "procedures">("general");

  // Derive selected hospital data
  const visibleHospitalsAll = useMemo(
    () => hospitals.filter((h) => selectedHospitals.includes(h.id)),
    [hospitals, selectedHospitals],
  );

  // Clamp selection length if needed (UI safeguard only; actual limiting should happen in parent)
  const visibleHospitals = useMemo(
    () => visibleHospitalsAll.slice(0, MAX_COMPARE),
    [visibleHospitalsAll],
  );

  // Pagination
  const totalPages = Math.max(1, Math.ceil(visibleHospitals.length / HOSPITALS_PER_PAGE));
  const pageStart = currentPage * HOSPITALS_PER_PAGE;
  const currentHospitals = visibleHospitals.slice(pageStart, pageStart + HOSPITALS_PER_PAGE);

  // Reset/clamp page when selection or page count changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedHospitals.length]);

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  // Keyboard shortcuts: Esc to close, ←/→ to paginate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
      if (e.key === "ArrowLeft" && currentPage > 0) setCurrentPage((p) => p - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentPage, totalPages, onClose]);

  // Comparison metrics (display-only)
  const comparisonMetrics = [
    { name: "Location", key: "location" as const, icon: <MapPin className="h-4 w-4 text-gray-500" /> },
    { name: "Rating", key: "rating" as const, icon: <Star className="h-4 w-4 text-yellow-500" /> },
    { name: "Price Level", key: "price" as const, icon: <DollarSign className="h-4 w-4 text-green-500" /> },
    { name: "Wait Time", key: "waitTime" as const, icon: <Clock className="h-4 w-4 text-blue-500" /> },
    { name: "Accreditations", key: "accreditations" as const, icon: <CheckCircle className="h-4 w-4 text-purple-500" /> },
    { name: "Languages", key: "languages" as const, icon: <Globe className="h-4 w-4 text-indigo-500" /> },
    { name: "Specialties", key: "specialties" as const, icon: <Star className="h-4 w-4 text-orange-500" /> },
  ];

  // Procedures (mock keys kept)
  const commonProcedures = [
    { name: "Heart Bypass Surgery", key: "heartBypass" },
    { name: "Hip Replacement", key: "hipReplacement" },
    { name: "Knee Replacement", key: "kneeReplacement" },
    { name: "Dental Implant", key: "dentalImplant" },
    { name: "Lasik Eye Surgery", key: "lasikSurgery" },
  ] as const;

  // Get procedure cost (mock data)
  const getProcedureCost = useCallback((hospitalId: string, procedureKey: string) => {
    const costs = {
      "1": {
        heartBypass: "$15,000 - $20,000",
        hipReplacement: "$12,000",
        kneeReplacement: "$11,500",
        dentalImplant: "$900",
        lasikSurgery: "$1,800",
      },
      "2": {
        heartBypass: "$12,000 - $16,000",
        hipReplacement: "$9,000",
        kneeReplacement: "$8,500",
        dentalImplant: "$700",
        lasikSurgery: "$1,200",
      },
      "3": {
        heartBypass: "$18,000 - $25,000",
        hipReplacement: "$14,000",
        kneeReplacement: "$13,500",
        dentalImplant: "$1,200",
        lasikSurgery: "$2,200",
      },
      "4": {
        heartBypass: "$13,000 - $18,000",
        hipReplacement: "$10,000",
        kneeReplacement: "$9,500",
        dentalImplant: "$800",
        lasikSurgery: "$1,500",
      },
      "5": {
        heartBypass: "$20,000 - $28,000",
        hipReplacement: "$16,000",
        kneeReplacement: "$15,000",
        dentalImplant: "$1,500",
        lasikSurgery: "$2,500",
      },
      "6": {
        heartBypass: "$14,000 - $19,000",
        hipReplacement: "$11,000",
        kneeReplacement: "$10,500",
        dentalImplant: "$850",
        lasikSurgery: "$1,700",
      },
    } as const;

    const table = costs[hospitalId as keyof typeof costs] as any;
    return table?.[procedureKey] ?? "N/A";
  }, []);

  // Shared grid style: one label column + one column per visible hospital on current page
  const gridColsStyle = useMemo(
    () => ({
      gridTemplateColumns: `200px repeat(${Math.max(currentHospitals.length, 1)}, minmax(200px, 1fr))`,
    }),
    [currentHospitals.length],
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Compare Hospitals</h2>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 disabled:opacity-60"
                      onClick={onAddHospital}
                      disabled={selectedHospitals.length >= MAX_COMPARE}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Hospital
                    </Button>
                  </span>
                </TooltipTrigger>
                {selectedHospitals.length >= MAX_COMPARE && (
                  <TooltipContent>Maximum of {MAX_COMPARE} hospitals</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={onClose} aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-6 pt-4 border-b">
            <h3 className="text-lg font-medium text-gray-800 pb-2">Hospital Comparison</h3>
          </div>

          <ScrollArea className="flex-1">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="m-0">
              <TabsList className="m-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="procedures">Procedures</TabsTrigger>
              </TabsList>

              {/* GENERAL TAB */}
              <TabsContent value="general" className="p-6 m-0">
                {selectedHospitals.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No hospitals selected for comparison</h3>
                    <p className="text-gray-500 mb-4">Add hospitals to compare their features, prices, and services.</p>
                    <Button onClick={onAddHospital}>Add Hospitals to Compare</Button>
                  </div>
                ) : (
                  <>
                    {/* Pagination controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-end mb-4 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                          disabled={currentPage === 0}
                          className="h-8 w-8 p-0"
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-gray-500 flex items-center">
                          {currentPage + 1} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                          disabled={currentPage === totalPages - 1}
                          className="h-8 w-8 p-0"
                          aria-label="Next page"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Hospital headers */}
                    <div className="grid gap-4" style={gridColsStyle}>
                      <div className="h-40" />

                      {currentHospitals.map((hospital) => (
                        <div key={hospital.id} className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-gray-100 hover:bg-gray-200 rounded-full"
                            onClick={() => onRemoveHospital(hospital.id)}
                            aria-label={`Remove ${hospital.name}`}
                          >
                            <X className="h-3 w-3" />
                          </Button>

                          <div className="flex flex-col items-center text-center">
                            <div className="w-full h-32 overflow-hidden rounded-lg mb-2 bg-gray-50">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={hospital.image || "/placeholder.svg"}
                                alt={hospital.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                                }}
                              />
                            </div>
                            <h3 className="font-bold text-sm">{hospital.name}</h3>
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs ml-1">
                                {Number.isFinite(hospital.rating) ? hospital.rating : 0} ({hospital.reviews ?? 0})
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Placeholder cell when fewer than per-page */}
                      {currentHospitals.length === 0 && (
                        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center h-40">
                          <Button variant="ghost" className="h-10 w-10 rounded-full p-0 mb-2" onClick={onAddHospital}>
                            <Plus className="h-5 w-5 text-gray-400" />
                          </Button>
                          <span className="text-xs text-gray-500">Add Hospital</span>
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-6" />

                    {/* General Information rows */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4 text-purple-700">General Information</h3>

                      {comparisonMetrics.map((metric) => (
                        <div key={metric.key} className="grid gap-4 mb-4 items-center" style={gridColsStyle}>
                          <div className="flex items-center gap-2 font-medium text-gray-700">
                            {metric.icon}
                            {metric.name}
                          </div>

                          {currentHospitals.map((hospital) => (
                            <div key={`${hospital.id}-${metric.key}`}>
                              {metric.key === "rating" && (
                                <div className="flex items-center">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < Math.floor(hospital.rating ?? 0)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="ml-2 text-sm">({hospital.reviews ?? 0})</span>
                                </div>
                              )}

                              {metric.key === "price" && (
                                <span className="text-sm font-medium">{hospital.price || "—"}</span>
                              )}

                              {metric.key === "waitTime" && (
                                <Badge
                                  className={
                                    hospital.waitTime === "Low"
                                      ? "bg-green-100 text-green-800"
                                      : hospital.waitTime === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : hospital.waitTime === "High"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-700"
                                  }
                                >
                                  {hospital.waitTime || "N/A"}
                                </Badge>
                              )}

                              {metric.key === "location" && (
                                <span className="text-sm">{hospital.location || "—"}</span>
                              )}

                              {metric.key === "accreditations" && (
                                <div className="flex flex-wrap gap-1">
                                  {(hospital.accreditations ?? []).length > 0
                                    ? hospital.accreditations!.map((acc) => (
                                        <Badge key={acc} variant="outline" className="text-xs">
                                          {acc}
                                        </Badge>
                                      ))
                                    : "None listed"}
                                </div>
                              )}

                              {metric.key === "languages" && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-sm cursor-help">
                                        {(hospital.languages ?? []).slice(0, 2).join(", ") || "—"}
                                        {hospital.languages && hospital.languages.length > 2 && "..."}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{(hospital.languages ?? []).join(", ") || "None listed"}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}

                              {metric.key === "specialties" && (
                                <div className="flex flex-wrap gap-1">
                                  {(hospital.specialties ?? []).slice(0, 2).map((specialty) => (
                                    <Badge key={specialty} className="text-xs bg-purple-100 text-purple-800">
                                      {specialty}
                                    </Badge>
                                  ))}
                                  {(hospital.specialties ?? []).length > 2 && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Badge className="text-xs bg-gray-100 text-gray-800 cursor-help">
                                            +{hospital.specialties.length - 2} more
                                          </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{hospital.specialties.slice(2).join(", ")}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                  {(hospital.specialties ?? []).length === 0 && <span className="text-sm">—</span>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>

              {/* PROCEDURES TAB */}
              <TabsContent value="procedures" className="p-6 m-0">
                {selectedHospitals.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No hospitals selected for comparison</h3>
                    <p className="text-gray-500 mb-4">Add hospitals to compare their procedures and costs.</p>
                    <Button onClick={onAddHospital}>Add Hospitals to Compare</Button>
                  </div>
                ) : (
                  <>
                    {/* Pagination controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-end mb-4 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                          disabled={currentPage === 0}
                          className="h-8 w-8 p-0"
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-gray-500 flex items-center">
                          {currentPage + 1} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                          disabled={currentPage === totalPages - 1}
                          className="h-8 w-8 p-0"
                          aria-label="Next page"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Hospital headers */}
                    <div className="grid gap-4" style={gridColsStyle}>
                      <div className="h-20" />

                      {currentHospitals.map((hospital) => (
                        <div key={hospital.id} className="flex flex-col items-center text-center">
                          <h3 className="font-bold text-sm">{hospital.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">{hospital.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-6" />

                    {/* Procedures and Costs */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-purple-700">Procedures & Costs</h3>

                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <div className="text-blue-500 mt-1">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-800">Cost Comparison</h3>
                          <p className="text-blue-600 text-sm">
                            The prices below are estimates and may vary based on individual patient needs. Costs typically
                            include the procedure, hospital stay, and basic follow-up care.
                          </p>
                        </div>
                      </div>

                      {commonProcedures.map((procedure) => (
                        <div key={procedure.key} className="grid gap-4 mb-4 items-center" style={gridColsStyle}>
                          <div className="font-medium text-gray-700">{procedure.name}</div>

                          {currentHospitals.map((hospital) => (
                            <div key={`${hospital.id}-${procedure.key}`} className="text-sm">
                              <div className="font-medium text-purple-700">
                                {getProcedureCost(hospital.id, procedure.key)}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                US Cost: $
                                {procedure.key === "heartBypass"
                                  ? "70,000 - 200,000"
                                  : procedure.key === "hipReplacement"
                                  ? "30,000 - 50,000"
                                  : procedure.key === "kneeReplacement"
                                  ? "35,000 - 60,000"
                                  : procedure.key === "dentalImplant"
                                  ? "3,000 - 5,000"
                                  : "2,000 - 4,000"}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}

                      <div className="mt-8 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-2">What's Included in These Costs?</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Hospital stay (duration varies by procedure)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Surgeon and anesthesiologist fees</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Basic medications and supplies</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Standard pre-operative tests</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Basic follow-up care</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center">
          <Button variant="outline" onClick={onClose}>
            Close Comparison
          </Button>

          <div className="flex gap-2">
            {selectedHospitals.length > 0 && (
              <Button className="bg-purple-600 hover:bg-purple-700">
                Request Information
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
