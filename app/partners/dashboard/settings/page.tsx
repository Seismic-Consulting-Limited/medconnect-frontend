import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences.</p>
      </div>

      <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
        <AlertCircle className="h-4 w-4 text-yellow-800" />
        <AlertTitle>Limited Settings Available</AlertTitle>
        <AlertDescription>
          Some settings are limited while your application is under review. More options will be available once your
          application is approved.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-500">Receive updates about your application via email</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-emails" className="font-medium">
                  Marketing Communications
                </Label>
                <p className="text-sm text-gray-500">Receive news and promotional content from MedConnect</p>
              </div>
              <Switch id="marketing-emails" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>View and update your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Email Address</Label>
                <p className="font-medium">contact@bangkokinternational.com</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Account Type</Label>
                <p className="font-medium">Hospital Partner</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Account Created</Label>
                <p className="font-medium">May 12, 2023</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Application ID</Label>
                <p className="font-medium">APP-2023-05-12</p>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="outline">Update Contact Information</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-500">Password</Label>
              <p className="font-medium">••••••••••••</p>
            </div>

            <div className="pt-2">
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
