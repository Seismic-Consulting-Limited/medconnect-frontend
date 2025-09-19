"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [newsUpdates, setNewsUpdates] = useState(true)
  const [reminders, setReminders] = useState(false)
  const [activityNotifications, setActivityNotifications] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 ml-0 lg:ml-64">
        <div className="p-6 pt-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Security Settings */}
            <Card className="w-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Security Settings</CardTitle>
                <div className="border-b border-gray-200 mt-4"></div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-start justify-between py-4">
                  <div className="flex-1 pr-8">
                    <h3 className="font-medium text-gray-900 mb-2">Change your password</h3>
                    <p className="text-sm text-gray-600">Set a unique password for better protection.</p>
                  </div>
                  <Button variant="outline" className="border-gray-300 bg-transparent shrink-0">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-start justify-between py-4">
                  <div className="flex-1 pr-8">
                    <h3 className="font-medium text-gray-900 mb-2">Deactivate Account</h3>
                    <p className="text-sm text-gray-600">All operations on this account will be discontinued.</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent shrink-0"
                  >
                    Deactivate Account
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="border-b border-gray-200"></div>

            {/* Notification Settings */}
            <Card className="w-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Notification Settings</CardTitle>
                <div className="border-b border-gray-200 mt-4"></div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="py-4">
                  <h3 className="font-medium text-gray-900 mb-3">Email Notifications</h3>
                  <p className="text-sm text-gray-600 mb-8">
                    Get emails to find out what's going on when you're not online. You can turn this off.
                  </p>

                  <div className="space-y-8">
                    <div className="flex items-start justify-between py-2">
                      <div className="flex-1 pr-8">
                        <h4 className="font-medium text-gray-900 mb-1">News & Updates</h4>
                        <p className="text-sm text-gray-600">
                          News about <span className="font-medium">Medkonnect</span> and feature updates.
                        </p>
                      </div>
                      <Switch
                        checked={newsUpdates}
                        onCheckedChange={setNewsUpdates}
                        className="data-[state=checked]:bg-purple-600 shrink-0"
                      />
                    </div>

                    <div className="flex items-start justify-between py-2">
                      <div className="flex-1 pr-8">
                        <h4 className="font-medium text-gray-900 mb-1">Reminders</h4>
                        <p className="text-sm text-gray-600">
                          News about <span className="font-medium">Medkonnect</span> and feature updates.
                        </p>
                      </div>
                      <Switch
                        checked={reminders}
                        onCheckedChange={setReminders}
                        className="data-[state=checked]:bg-purple-600 shrink-0"
                      />
                    </div>

                    <div className="flex items-start justify-between py-2">
                      <div className="flex-1 pr-8">
                        <h4 className="font-medium text-gray-900 mb-1">More activity about you</h4>
                        <p className="text-sm text-gray-600">
                          These are notifications for your activities on Medkonnect.
                        </p>
                      </div>
                      <Switch
                        checked={activityNotifications}
                        onCheckedChange={setActivityNotifications}
                        className="data-[state=checked]:bg-purple-600 shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="border-b border-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
