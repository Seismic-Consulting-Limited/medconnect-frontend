import React from 'react'
import { Button } from '../ui/button'
import { CalendarDays, X } from 'lucide-react'

  const notifications = [
    {
      id: 1,
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. James has been confirmed.",
      time: "5 mins ago",
      isRead: false
    },
    {
      id: 2,
      title: "New Message",
      message: "You have a new message from City Hospital.",
      time: "15 mins ago",
      isRead: false
    },
    {
      id: 3,
      title: "Payment Successful",
      message: "Your payment for the teleconsultation was successful.",
      time: "1 hour ago",
      isRead: true
    },
  ];


const NotificationDropdown = ({setShowNotifications}: any) => {
  return (
    <div>
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <h3 className="text-[20px] font-semibold text-[#313131]">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 flex items-start gap-4 relative"
                  >
                    {
                        n.isRead && (
                            <div className='w-[8px] h-[8px] bg-[#17B26A] absolute top-5 right-5 rounded-full'></div>
                        )
                    } 
                    {/* ✅ Icon container — perfectly round */}
                    <div className="flex-shrink-0">
                      <div className="bg-[#DCFAE6] border border-[#47CD89] w-[50px] h-[50px] rounded-full flex items-center justify-center">
                        <CalendarDays className="w-[20px] h-[20px]" color="#067647" />
                      </div>
                    </div>

                    {/* Notification text area */}
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-semibold text-[16px] text-[#313131]">{n.title}</h4>
                        <small className="text-[#717171] text-[14px] ">{n.time}</small>
                      </div>
                      <p className="text-[14px] text-gray-500 leading-relaxed">{n.message}</p>
                      <Button
                        variant="outline"
                        className="w-full border border-[#7E22CE] text-primary font-light hover:bg-transparent hover:text-primary"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                )}
              </div>
    </div>
  )
}

export default NotificationDropdown
