"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, FileText, Heart, MessageSquare, Search, Stethoscope } from "lucide-react"

interface Activity {
  id: string
  type: "view" | "save" | "inquiry" | "appointment" | "document" | "search"
  title: string
  description: string
  time: string
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-500">No recent activity to display</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "view":
        return <Building2 className="h-4 w-4" />
      case "save":
        return <Heart className="h-4 w-4" />
      case "inquiry":
        return <MessageSquare className="h-4 w-4" />
      case "appointment":
        return <Calendar className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "search":
        return <Search className="h-4 w-4" />
      default:
        return <Stethoscope className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "view":
        return "bg-blue-100 text-blue-600"
      case "save":
        return "bg-red-100 text-red-600"
      case "inquiry":
        return "bg-amber-100 text-amber-600"
      case "appointment":
        return "bg-green-100 text-green-600"
      case "document":
        return "bg-purple-100 text-purple-600"
      case "search":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest interactions</CardDescription>
        </div>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${getActivityColor(activity.type)}`}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
