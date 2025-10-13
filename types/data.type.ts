export interface Session {
  id: number
  doctor: string
  specialty: string
  date: string
  time: string
  status: "Ongoing" | "Upcoming" | "Completed" | "Canceled" | "In 15 Mins"
  image: string
}