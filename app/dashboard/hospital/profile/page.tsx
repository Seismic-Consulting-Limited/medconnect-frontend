"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

const mockHospitalData = {
  name: "LAGOS STATE UNIVERSITY TEACHING HOSPITAL",
  state: "LAGOS",
  yearEstablished: "1985",
  numberOfDoctors: "75",
  numberOfNurses: "143",
  numberOfBeds: "200",
  about:
    "Lagos University Teaching Hospital (LUTH) is one of Nigeria's foremost tertiary healthcare institutions, located in Lagos. As a leading teaching hospital, it is renowned for providing comprehensive medical specialties across a wide range of disciplines, while also serving as a centre for medical education, research, and training. LUTH is particularly recognised for its strengths in internal medicine, surgery, oncology, paediatrics, and maternal health. Equipped with experienced professionals and essential medical facilities, the hospital caters to both routine and complex cases, supporting patients locally and internationally with affordable, quality-driven care.",
  address: "Block 3, Mko Abiola Gardens, State Secretariat Alausa",
  email: "luth.lagos@gmail.com",
  phone: "08063828880",
  profileImage: "/hospital-logo.png",
}

const hospitalPhotos = [
  "/doctors-in-hospital-consultation.jpg",
  "/medical-team-in-hospital-corridor.jpg",
  "/hospital-waiting-area.jpg",
  "/doctor-patient-consultation.png",
  "/hospital-operating-room.png",
  "/medical-professionals-in-surgery.jpg",
]

export default function HospitalProfilePage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleEditProfile = () => {
    router.push("/dashboard/hospital/profile/edit")
  }

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
            {/* Hospital Information Section */}
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
                  {/* Profile Photo Section */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20 border border-gray-200">
                        <AvatarImage src={mockHospitalData.profileImage || "/placeholder.svg"} />
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

                  {/* Hospital Details Grid */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">HOSPITAL NAME</label>
                      <p className="mt-1 text-gray-900 font-medium">{mockHospitalData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">STATE</label>
                      <p className="mt-1 text-gray-900 font-medium">{mockHospitalData.state}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        YEAR ESTABLISHED
                      </label>
                      <p className="mt-1 text-gray-900 font-medium">{mockHospitalData.yearEstablished}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        NUMBER OF DOCTORS
                      </label>
                      <p className="mt-1 text-gray-900 font-medium">{mockHospitalData.numberOfDoctors}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        NUMBER OF NURSES
                      </label>
                      <p className="mt-1 text-gray-900 font-medium">{mockHospitalData.numberOfNurses}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        NUMBER OF BEDS
                      </label>
                      <p className="mt-1 text-gray-900 font-medium">{mockHospitalData.numberOfBeds}</p>
                    </div>
                  </div>

                  {/* About Hospital Section */}
                  <div className="mt-8">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">ABOUT HOSPITAL</label>
                    <p className="mt-2 text-gray-900 leading-relaxed text-justify">{mockHospitalData.about}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information Section */}
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
                      <p className="mt-1 text-gray-900">{mockHospitalData.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          EMAIL ADDRESS
                        </label>
                        <p className="mt-1 text-gray-900">{mockHospitalData.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          PHONE NUMBER
                        </label>
                        <p className="mt-1 text-gray-900">{mockHospitalData.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upload Photos Section */}
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
                {hospitalPhotos.map((photo, index) => (
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
  )
}
