"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, User, Loader2, ArrowLeft, Check, ChevronsUpDown, X } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

import { apiRequest } from "@/lib/utils/api-request";
import { API_ENDPOINTS } from "@/lib/constants";
import { dashboardService } from "@/lib/services/dashboard-service";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { authService } from "@/lib/auth";

type FieldErrors = Partial<{
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  specialty: string;
  consultationFee: string;
}>;

type Specialty = { id: number; name: string };

// ------- helpers (robust to where you placed the endpoints) -------
function buildMedicalStaffUrl(hospitalId: string) {
  const A = API_ENDPOINTS as any;
  return (
    A?.HOSPITAL?.MEDICAL_STAFF?.(hospitalId) ??
    A?.CLIENT?.HOSPITAL?.MEDICAL_STAFF?.(hospitalId) ??
    A?.META?.HOSPITAL?.MEDICAL_STAFF?.(hospitalId) ??
    `/v1/hospitals/${hospitalId}/medical-staff/`
  );
}

function buildSpecialtiesUrl() {
  const A = API_ENDPOINTS as any;
  // Using only META.SPECIALTIES as requested
  return A?.META?.SPECIALTIES;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9\s\-()]{7,}$/; // simple intl-ish

export default function AddConsultantPage() {
  const router = useRouter();

  // form state
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consultationFee, setConsultationFee] = useState("");

  // SINGLE specialty selection (we send as number)
  const [allSpecialties, setAllSpecialties] = useState<Specialty[]>([]);
  const [specialtyId, setSpecialtyId] = useState<number | null>(null);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(false);
  const [specialtiesError, setSpecialtiesError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // fetched from dashboard
  const [hospitalId, setHospitalId] = useState<string | null>(null);

  // Load hospital id (consistent with rest of app)
  useEffect(() => {
    let off = false;
    (async () => {
      try {
        const data = await dashboardService.getHospitalDashboard();
        if (off) return;
        const id = String((data as any)?.id ?? (data as any)?.hospital_id ?? "");
        if (id) setHospitalId(id);
        else setError("Could not determine hospital id.");
      } catch (e: any) {
        setError(e?.message || "Could not load hospital info.");
      }
    })();
    return () => {
      off = true;
    };
  }, []);

  // Load specialties
  useEffect(() => {
    let off = false;
    (async () => {
      setSpecialtiesLoading(true);
      setSpecialtiesError(null);
      try {
        const url = buildSpecialtiesUrl();
        const res: any = await apiRequest(
          url,
          { method: "GET" },
          { auth: true, getToken: () => authService.getToken() }
        );

        const raw =
          (Array.isArray(res?.data) ? res?.data :
           res?.data?.results ??
           res?.results ??
           (Array.isArray(res) ? res : [])) || [];

        const mapped: Specialty[] = raw
          .map((x: any) => {
            const name = String(x?.name ?? x?.title ?? x?.label ?? "").trim();
            const idNum = Number(x?.id);
            return name && Number.isFinite(idNum) ? { id: idNum, name } : null;
          })
          .filter(Boolean) as Specialty[];

        if (!off) setAllSpecialties(mapped);
      } catch (e: any) {
        if (!off) setSpecialtiesError(e?.message || "Failed to load specialties.");
      } finally {
        if (!off) setSpecialtiesLoading(false);
      }
    })();
    return () => {
      off = true;
    };
  }, []);

  const selectedSpecialtyName = useMemo(() => {
    return allSpecialties.find((s) => s.id === specialtyId)?.name || "";
  }, [allSpecialties, specialtyId]);

  const validate = (): boolean => {
    const errs: FieldErrors = {};

    if (!firstName.trim()) errs.firstName = "First name is required.";
    if (!surname.trim()) errs.surname = "Surname is required.";

    if (!email.trim()) errs.email = "Email is required.";
    else if (!emailRegex.test(email.trim())) errs.email = "Enter a valid email address.";

    if (phone.trim() && !phoneRegex.test(phone.trim())) {
      errs.phone = "Enter a valid phone number (e.g., +234 8012345678).";
    }

    if (!specialtyId) {
      errs.specialty = "Please select a specialty.";
    }

    if (consultationFee.trim()) {
      if (!/^\d+$/.test(consultationFee.trim())) {
        errs.consultationFee = "Consultation fee must contain digits only (e.g., 150000).";
      } else if (Number(consultationFee) < 0) {
        errs.consultationFee = "Consultation fee cannot be negative.";
      }
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const isFormValid = useMemo(() => {
    return (
      firstName.trim().length > 0 &&
      surname.trim().length > 0 &&
      emailRegex.test(email.trim()) &&
      (phone.trim().length === 0 || phoneRegex.test(phone.trim())) &&
      specialtyId !== null &&
      (consultationFee.trim().length === 0 || /^\d+$/.test(consultationFee.trim()))
    );
  }, [firstName, surname, email, phone, specialtyId, consultationFee]);

  const onCancel = () => router.back();

const onSubmit = async () => {
  if (submitting) return;                     
  setError(null);

  
    if (!hospitalId) {
      setError("Hospital id is missing.");
      return;
    }
    if (!validate()) return;

    // ✅ SINGLE specialty as NUMBER (no brackets)
    const payload: any = {
      first_name: firstName.trim(),
      last_name: surname.trim(),
      email: email.trim().toLowerCase(),
      phone_number: phone.trim() || undefined,
      specialty: specialtyId as number, // <— exactly like: "specialty": 39
    };

    if (consultationFee.trim()) payload.consultation_fee = Number(consultationFee);

    setSubmitting(true);
    try {
      await apiRequest(
        buildMedicalStaffUrl(hospitalId),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        {
          auth: true,
          getToken: () => authService.getToken(), // keep Authorization so you don't get logged out
        }
      );

      toast.success("Consultant invitation sent.");
      router.push("/dashboard/hospital/consultants");
    } catch (e: any) {
      const msg = e?.data?.message || e?.data?.detail || e?.message || "Could not add consultant.";
      setError(msg);
      toast.error(String(msg));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="bg-transparent" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <div className="text-sm text-gray-500">Consultants • Add New Consultant</div>
              <h1 className="text-xl font-semibold text-gray-900">Add New Consultant</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        {/* Center the card in the main viewport area */}
        <main className="flex-1 ml-0 lg:ml-64">
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
            <div className="w-full max-w-3xl">
              <Card>
                <CardContent className="p-6 space-y-6">
                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                      {error}
                    </div>
                  )}

                  {/* Names */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Zainab"
                          className={`pl-9 ${fieldErrors.firstName ? "border-red-500" : ""}`}
                          aria-invalid={!!fieldErrors.firstName}
                        />
                      </div>
                      {fieldErrors.firstName && <p className="text-xs text-red-600">{fieldErrors.firstName}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Surname *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                          placeholder="Aliyu"
                          className={`pl-9 ${fieldErrors.surname ? "border-red-500" : ""}`}
                          aria-invalid={!!fieldErrors.surname}
                        />
                      </div>
                      {fieldErrors.surname && <p className="text-xs text-red-600">{fieldErrors.surname}</p>}
                    </div>
                  </div>

                  {/* Email + Phone on one line */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="zainab.aliyu@youremail.com"
                          className={`pl-9 ${fieldErrors.email ? "border-red-500" : ""}`}
                          type="email"
                          aria-invalid={!!fieldErrors.email}
                        />
                      </div>
                      {fieldErrors.email && <p className="text-xs text-red-600">{fieldErrors.email}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Phone Number (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 8012345678"
                          className={`pl-9 ${fieldErrors.phone ? "border-red-500" : ""}`}
                          aria-invalid={!!fieldErrors.phone}
                        />
                      </div>
                      {fieldErrors.phone && <p className="text-xs text-red-600">{fieldErrors.phone}</p>}
                    </div>
                  </div>

                  {/* SINGLE Specialty (searchable) */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Specialty *</Label>

                    <Popover open={specialtyOpen} onOpenChange={setSpecialtyOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={specialtyOpen}
                          className={`w-full justify-between ${fieldErrors.specialty ? "border-red-500" : ""}`}
                        >
                          {specialtyId ? selectedSpecialtyName : "Select specialty"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput placeholder="Search specialties..." />
                          <CommandList>
                            {specialtiesLoading && (
                              <div className="py-6 text-center text-sm text-muted-foreground">Loading…</div>
                            )}
                            {!specialtiesLoading && specialtiesError && <CommandEmpty>{specialtiesError}</CommandEmpty>}
                            {!specialtiesLoading && !specialtiesError && (
                              <>
                                <CommandEmpty>No specialty found.</CommandEmpty>
                                <CommandGroup>
                                  {allSpecialties.map((sp) => {
                                    const selected = specialtyId === sp.id;
                                    return (
                                      <CommandItem
                                        key={sp.id}
                                        value={sp.name}
                                        onSelect={() => {
                                          setSpecialtyId(sp.id);
                                          setSpecialtyOpen(false);
                                        }}
                                      >
                                        <Check className={`mr-2 h-4 w-4 ${selected ? "opacity-100" : "opacity-0"}`} />
                                        {sp.name}
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {specialtyId && (
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        Selected: <span className="font-medium">{selectedSpecialtyName}</span>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded hover:bg-gray-100 p-1"
                          onClick={() => setSpecialtyId(null)}
                          aria-label="Clear specialty"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    {fieldErrors.specialty && <p className="text-xs text-red-600">{fieldErrors.specialty}</p>}
                  </div>

                  {/* Fee (digits only) */}
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Consultation Fee</Label>
                    <Input
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(e.target.value.replace(/\D/g, ""))}
                      placeholder="150000"
                      inputMode="numeric"
                      className={fieldErrors.consultationFee ? "border-red-500" : ""}
                      aria-invalid={!!fieldErrors.consultationFee}
                    />
                    {fieldErrors.consultationFee ? (
                      <p className="text-xs text-red-600">{fieldErrors.consultationFee}</p>
                    ) : (
                      <p className="text-xs text-gray-500">Digits only, e.g. 150000</p>
                    )}
                  </div>

                  {/* (Optional) Note */}
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Note (Optional)</Label>
                    <Textarea placeholder="Add any notes for the consultant invitation (optional)" />
                  </div>

                  {/* Actions UNDER the form */}
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" className="bg-transparent" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button onClick={onSubmit} disabled={submitting || !hospitalId || !isFormValid}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving…
                        </>
                      ) : (
                        "Save & Invite Consultant"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
