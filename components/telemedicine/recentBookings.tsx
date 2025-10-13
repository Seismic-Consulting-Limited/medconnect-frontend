import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";

const bookings = [
  {
    id: 1,
    doctorName: "Dr. Stephen Strange",
    specialty: "Cardiologist",
    service: "Telemedicine",
    date: "27th Aug, 2025",
    time: "09:00 AM",
    status: "Upcoming",
    image: "/Doctor.svg",
  },
  {
    id: 2,
    doctorName: "Dr. Jane Foster",
    specialty: "Neurologist",
    service: "Consultation",
    date: "25th Aug, 2025",
    time: "01:00 PM",
    status: "Completed",
    image: "/Doctor.svg",
  },
  {
    id: 3,
    doctorName: "Dr. Bruce Banner",
    specialty: "Psychiatrist",
    service: "Therapy",
    date: "20th Aug, 2025",
    time: "10:30 AM",
    status: "Canceled",
    image: "/Doctor.svg",
  },
];

const statusColors: Record<string, string> = {
  Upcoming: "bg-[#FEF0C7] border text-[#DC6803] border-[#DC6803]",
  Completed: "bg-[#E8F5E9] border text-[#388E3C] border-[#388E3C]",
  Canceled: "bg-[#FFEBEE] border text-[#D32F2F] border-[#D92D20]",
};

const RecentBookings = () => {
  return (
    <Card className="overflow-hidden xl:w-full lg:w-[844px] lg:max-h-[449px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between py-[12px] px-[16px] h-auto md:h-[61px] border-b gap-3">
        <div className="flex items-center gap-3 text-text">
          <Calendar className="w-[24px] h-[24px]" />
          <h2 className="text-[18px] font-semibold">Recent Bookings</h2>
        </div>
        <Link
          href="#"
          className="flex items-center gap-2 text-[14px] text-text hover:underline"
        >
          View All <ArrowRight className="w-[18px] h-[18px]" />
        </Link>
      </div>

      {/* Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[#717171] text-[14px]">
              <th className="py-3 px-6 font-medium">Booking Name</th>
              <th className="py-3 px-6 font-medium">Service</th>
              <th className="py-3 px-6 font-medium">Date & Time</th>
              <th className="py-3 px-6 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-t hover:bg-[#FAFAFA] transition-colors"
              >
                <td className="py-2 px-6 flex items-center gap-3">
                  <Image
                    src={booking.image}
                    width={60}
                    height={60}
                    alt={booking.doctorName}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-[16px] font-semibold text-text">
                      {booking.doctorName}
                    </h3>
                    <p className="text-[14px] text-[#717171]">
                      {booking.specialty}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <h3 className="text-[16px] font-medium text-text">
                    {booking.specialty}
                  </h3>
                  <p className="text-[14px] text-[#717171]">{booking.service}</p>
                </td>
                <td className="py-4 px-6">
                  <h3 className="text-[16px] font-medium text-text">
                    {booking.date}
                  </h3>
                  <p className="text-[14px] text-[#717171]">{booking.time}</p>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-[16px] py-[8px] h-[39px] rounded-full text-[13px] font-medium ${statusColors[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-2xl p-4 shadow-sm bg-[#FAFAFA]"
          >
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={booking.image}
                width={50}
                height={50}
                alt={booking.doctorName}
                className="rounded-full"
              />
              <div>
                <h3 className="text-[16px] font-semibold text-text">
                  {booking.doctorName}
                </h3>
                <p className="text-[14px] text-[#717171]">
                  {booking.specialty}
                </p>
              </div>
            </div>

            <div className="text-[14px] text-[#717171] mb-2">
              <span className="font-semibold text-text">Service:</span>{" "}
              {booking.service}
            </div>
            <div className="text-[14px] text-[#717171] mb-2">
              <span className="font-semibold text-text">Date:</span>{" "}
              {booking.date}
            </div>
            <div className="text-[14px] text-[#717171] mb-3">
              <span className="font-semibold text-text">Time:</span>{" "}
              {booking.time}
            </div>

            <span
              className={`px-[14px] py-[6px] rounded-full text-[13px] font-medium ${statusColors[booking.status]}`}
            >
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentBookings;
