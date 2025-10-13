// components/schedule/statusStyle.ts
export const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "ongoing":
      return "text-[#079455] border-[#079455] bg-[#DCFAE6]"
    case "in 15 mins":
      return "text-[#7E22CE] border-[#7E22CE] bg-[#E4CFF7]"
    case "upcoming":
      return "text-[#B54708] border-[#B54708] bg-[#FEF0C7]"
    case "completed":
      return "text-[#155EEF] border-[#155EEF] bg-[#D1E0FF]"
    case "canceled":
      return "text-[#D92D20] border-[#D92D20] bg-[#FEE4E2]"
    case "booking":
      return "text-[#007AFF] border-[#007AFF] bg-[#E0F7FF]"
    default:
      return "text-[#555] border-[#CCC] bg-[#EEE]"
  }
}
