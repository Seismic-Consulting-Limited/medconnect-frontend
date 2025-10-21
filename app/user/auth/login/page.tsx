"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PasswordLoginForm from "@/components/authenticate/passwordLoginForm";
import OtpLoginForm from "@/components/authenticate/otpLoginForm";


export default function LoginPage() {
  const [tab, setTab] = useState<"password" | "otp">("password");

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl font-bold text-foreground">Login</CardTitle>
          <div className="inline-flex mx-auto bg-muted/30 p-1 rounded-lg border">
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                tab === "password" ? "bg-background shadow" : "opacity-70"
              }`}
              onClick={() => setTab("password")}
            >
              Password
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                tab === "otp" ? "bg-background shadow" : "opacity-70"
              }`}
              onClick={() => setTab("otp")}
            >
              Login with OTP
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tab === "password" ? <PasswordLoginForm /> : <OtpLoginForm />}
        </CardContent>
      </Card>
    </main>
  );
}
