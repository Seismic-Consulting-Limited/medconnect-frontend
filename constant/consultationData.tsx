import { Session } from "@/types/data.type";
import { Archive, CheckCircle2, Clock4, Users } from "lucide-react";

export const sessions: Session[] = [
  {
    id: 1,
    doctor: "Bruce Banner",
    specialty: "Pediatrics",
    date: "27th Aug, 2025",
    time: "09:30 AM",
    status: "Ongoing",
    image: "/5508e5b8c372c3f2a167c4f551b69fbb28203a98.png",
  },
  {
    id: 2,
    doctor: "Dr. Natasha Romanoff",
    specialty: "Cardiology",
    date: "29th Aug, 2025",
    time: "10:00 AM",
    status: "Upcoming",
    image: "/fb4996dd2f3bece621cfd3cf3a8f5361a14ddc31.jpg",
  },
  {
    id: 3,
    doctor: "Dr. Steve Rogers",
    specialty: "Neurosurgery",
    date: "25th Aug, 2025",
    time: "01:00 PM",
    status: "Completed",
    image: "/doctor.png",
  },
  {
    id: 4,
    doctor: "Dr. Tony Stark",
    specialty: "Orthopedics",
    date: "26th Aug, 2025",
    time: "02:15 PM",
    status: "Canceled",
    image: "/5508e5b8c372c3f2a167c4f551b69fbb28203a98.png",
  },
  {
    id: 5,
    doctor: "Dr. Strange",
    specialty: "Psychiatry",
    date: "30th Aug, 2025",
    time: "04:00 PM",
    status: "In 15 Mins",
    image: "/doctor.png",
  },
  {
    id: 6,
    doctor: "Dr. Thor Odinson",
    specialty: "Endocrinology",
    date: "28th Aug, 2025",
    time: "08:30 AM",
    status: "Completed",
    image: "/doctor.png",
  },
]


  export const payments = [
    {
      id: 1,
      referenceId: 'REF123456',
      service: 'Telemedicine Consultation',
      amount: '₦25,000',
      date: '27th Aug, 2025',
      time: '09:30 AM',
      status: 'Confirmed',
    },
    {
      id: 2,
      referenceId: 'REF789012',
      service: 'Lab Test Booking',
      amount: '₦10,000',
      date: '29th Aug, 2025',
      time: '11:00 AM',
      status: 'Pending',
    },
    {
      id: 3,
      referenceId: 'REF345678',
      service: 'Medication Purchase',
      amount: '₦15,500',
      date: '25th Aug, 2025',
      time: '02:45 PM',
      status: 'Failed',
    },
    {
      id: 4,
      referenceId: 'REF901234',
      service: 'Specialist Appointment',
      amount: '₦7,200',
      date: '30th Aug, 2025',
      time: '04:10 PM',
      status: 'Confirmed',
    },
    {
      id: 5,
      referenceId: 'REF567890',
      service: 'Physiotherapy Session',
      amount: '₦8,000',
      date: '2nd Sep, 2025',
      time: '03:20 PM',
      status: 'Refunded',
    },
  ]

  export const consultantStats = [
    {
      title: "Consultants",
      count: 4,
      description: "Total registered consultants",
      iconBg: "#7E22CE",
      icon: <Users color="white" />,
    },
    {
      title: "Profile Completed",
      count: 3,
      description: "Have updated their profiles",
      iconBg: "#30B0C7",
      icon: <CheckCircle2 color="white" />,
    },
    {
      title: "Pending Updates",
      count: 1,
      description: "Yet to update their profiles",
      iconBg: "#F59E0B",
      icon: <Clock4 color="white" />,
    },
    {
      title: "Archived Consultants",
      count: 2,
      description: "Consultants data that are archived",
      iconBg: "#717171",
      icon: <Archive color="white" />,
    },
  ];