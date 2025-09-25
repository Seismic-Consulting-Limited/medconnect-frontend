"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/utils/api-request";
import { API_ENDPOINTS, HTTP_METHODS } from "@/lib/constants";
import { authService } from "@/lib/auth";

type HospitalApi = any; // backend shape can vary; we normalize below

type HospitalUI = {
  name: string;
  state?: string;
  yearEstablished?: string;
  numberOfDoctors?: string;
  numberOfNurses?: string;
  numberOfBeds?: string;
  about?: string;
  address?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
  photos?: string[];
};

function pickFirst(...vals: (string | number | null | undefined)[]) {
  for (const v of vals) {
    if (v !== undefined && v !== null && `${v}`.trim() !== "") return v as string | number;
  }
  return undefined;
}

function normalizeHospital(raw: HospitalApi): HospitalUI {
  const data = raw?.data ?? raw ?? {};

  // Common fields across possible shapes
  const name = pickFirst(
    data.name,
    data.hospital_name,
    data.profile?.name,
  ) as string | undefined;

  // Location/state
  const state = pickFirst(
    data?.location?.state?.name,
    data?.state?.name,
    data?.location?.state,
    data?.state,
  ) as string | undefined;

  // Year founded / established
  const year = pickFirst(
    data.year_founded,
    data.yearEstablished,
    data.profile?.year_founded,
  );

  // Stats
  const numDoctors = pickFirst(
    data?.stats?.number_of_doctors,
    data?.number_of_doctors,
    data?.doctors_count,
  );

  const numNurses = pickFirst(
    data?.stats?.number_of_nurses,
    data?.number_of_nurses,
    data?.nurses_count,
  );

  const numBeds = pickFirst(
    data?.stats?.number_of_beds,
    data?.number_of_beds,
    data?.beds_count,
  );

  // About / description
  const about = pickFirst(
    data.description,
    data.about,
    data.profile?.description,
  ) as string | undefined;

  // Address
  const address = pickFirst(
    data?.location?.address_1,
    data?.address_1,
    data?.address,
    [data?.location?.city, data?.location?.address_1].filter(Boolean).join(", "),
  ) as string | undefined;

  // Contact
  const email = pickFirst(
    data?.email,
    data?.contact_email,
    data?.profile?.email,
  ) as string | undefined;

  const phone = pickFirst(
    data?.phone_number_1,
    data?.phone,
    data?.contact_phone,
    data?.profile?.phone_number_1,
  ) as string | undefined;

  // Media
  const profileImage = pickFirst(
    data?.logo_url,
    data?.profile_image_url,
    data?.profile?.logo_url,
  ) as string | undefined;

  const photosArr =
    (data?.photos as string[] | undefined) ||
    (data?.gallery as string[] | undefined) ||
    [];

  return {
    name: name || "Hospital",
    state: state ? String(state) : undefined,
    yearEstablished: year ? String(year) : undefined,
    numberOfDoctors: numDoctors !== undefined ? String(numDoctors) : undefined,
    numberOfNurses: numNurses !== undefined ? String(numNurses) : undefined,
    numberOfBeds: numBeds !== undefined ? String(numBeds) : undefined,
    about: about || undefined,
    address: address || undefined,
    email: email || undefined,
    phone: phone || undefined,
    profileImage: profileImage || undefined,
    photos: photosArr,
  };
}

export default function HospitalProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, userRole } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hospital, setHospital] = useState<HospitalUI | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const hospitalId = useMemo(() => {
    // Prefer explicit hospitalId from user; otherwise try token payload
    const idFromUser = (user as any)?.hospitalId || (user as any)?.hospital_id;
    if (idFromUser) return idFromUser;

    const token = authService.getToken();
    if (!token) return undefined;

    try {
      const payloadPart = token.split(".")[1];
      if (!payloadPart) return undefined;
      const b64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (payloadPart.length % 4)) % 4);
      const json = decodeURIComponent(escape(atob(b64)));
      const payload = JSON.parse(json);
      return payload?.hospitalId || payload?.hospital_id;
    } catch {
      return undefined;
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      setError("You need to be logged in to view this page.");
      return;
    }
    if (!hospitalId) {
      setLoading(false);
      setError("No hospital ID found on your account.");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = API_ENDPOINTS.META.HOSPITAL_DETAIL(String(hospitalId));
        // Helpful debug: remove if noisy
        // console.log("Fetching hospital detail:", url);

        const res = await apiRequest<HospitalApi>(
          url,
          { method: HTTP_METHODS.GET, signal: controller.signal },
          { auth: true, getToken: () => authService.getToken() }
        );

        if (!controller.signal.aborted) {
          setHospital(normalizeHospital(res));
        }
      } catch (err: any) {
        if (!controller.signal.aborted) {
          const msg =
            err?.message ||
            (err?.status === 404 ? "Hospital profile not found." : "Failed to load hospital profile.");
          setError(msg);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [isAuthenticated, hospitalId]);

  const handleBack = () => router.back();
  const handleEditProfile = () => router.push("/dashboard/hospital/profile/edit");

  // Simple placeholders while loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4 ml-0 lg:ml-64">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
            </div>
          </div>
        </div>
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6 ml-0 lg:ml-64 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="h-44 bg-white border border-gray-200 rounded-lg animate-pulse" />
              <div className="h-40 bg-white border border-gray-200 rounded-lg animate-pulse" />
              <div className="h-52 bg-white border border-gray-200 rounded-lg animate-pulse" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4 ml-0 lg:ml-64">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
            </div>
          </div>
        </div>

        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 p-6 ml-0 lg:ml-64 min-h-screen">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <p className="text-sm text-red-600">{error}</p>
                  <div className="mt-4">
                    <Link href="/dashboard/hospital" className="text-primary underline">
                      Go back to dashboard
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Display
  const h = hospital as HospitalUI;
  const photos = (h.photos && h.photos.length > 0 ? h.photos : [
    "/doctors-in-hospital-consultation.jpg",
    "/medical-team-in-hospital-corridor.jpg",
    "/hospital-waiting-area.jpg",
    "/doctor-patient-consultation.png",
    "/hospital-operating-room.png",
    "/medical-professionals-in-surgery.jpg",
  ]) as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 ml-0 lg:ml-64">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6 ml-0 lg:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hospital Information */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Hospital Information</h2>
                  <p className="text-gray-600 text-sm">Basic information about your hospital</p>
                </div>
                <Button onClick={handleEditProfile} className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                  Edit Profile
                </Button>
              </div>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  {/* Profile Photo */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20 border border-gray-200">
                        <AvatarImage src={h.profileImage || "/hospital-logo.png"} />
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">H</span>
                          </div>
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">Profile Photo</h3>
                        <p className="text-sm text-gray-500">PNG, JPEG, Under 10MB</p>
                      </div>
                    </div>
                    <Button variant="outline" className="ml-auto bg-transparent">
                      Upload new picture
                    </Button>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">HOSPITAL NAME</label>
                      <p className="mt-1 text-gray-900 font-medium">{h.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">STATE</label>
                      <p className="mt-1 text-gray-900 font-medium">{h.state ?? "—"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        YEAR ESTABLISHED
                      </label>
                      <p className="mt-1 text-gray-900 font-medium">{h.yearEstablished ?? "—"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        NUMBER OF DOCTORS
                      </label>
                      <p className="mt-1 text-gray-900 font-medium">{h.numberOfDoctors ?? "—"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        NUMBER OF NURSES
                      </label>
                      <p className="mt-1 text-gray-900 font-medium">{h.numberOfNurses ?? "—"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        NUMBER OF BEDS
                      </label>
                      <p className="mt-1 text-gray-900 font-medium">{h.numberOfBeds ?? "—"}</p>
                    </div>
                  </div>

                  {/* About */}
                  <div className="mt-8">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">ABOUT HOSPITAL</label>
                    <p className="mt-2 text-gray-900 leading-relaxed text-justify">
                      {h.about ?? "No description provided yet."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                <p className="text-gray-600 text-sm">Description text goes here</p>
              </div>

              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        HOSPITAL ADDRESS
                      </label>
                      <p className="mt-1 text-gray-900">{h.address ?? "—"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          EMAIL ADDRESS
                        </label>
                        <p className="mt-1 text-gray-900">{h.email ?? "—"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          PHONE NUMBER
                        </label>
                        <p className="mt-1 text-gray-900">{h.phone ?? "—"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Photos */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Upload Photos</h2>
                  <p className="text-gray-600 text-sm">
                    Give customers a glimpse of your Specialties and ambience with stunning photos.{" "}
                    <span className="font-medium">6 photos maximum.</span>
                  </p>
                </div>
                <Button variant="outline">Change Photos</Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {photos.slice(0, 6).map((photo, index) => (
                  <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Hospital photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
