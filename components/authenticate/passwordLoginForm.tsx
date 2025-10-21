"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getDashboardPath,
  getNextParam,
} from "../../utils/authhelpers";
import { loginService } from "@/service/auth.service";
import { setAccessToken, setRefreshToken } from "@/utils/token";
import { toast } from "sonner";
import { useRoleStore } from "@/store/role";

export default function PasswordLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setRole } = useRoleStore();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await loginService({email, password});

      const accessToken = response?.data?.access_token
      const refreshToken = response?.data?.refresh_token
      const role = response?.data?.user_type

      if(response?.data) {
        toast.success(response?.message)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken);
        setRole(role)
      }

      router.replace(getDashboardPath(role));
    } catch (error: any) {
      const is_Not_Verified = error?.response?.data?.error?.label === 'unverified_user'
      if(is_Not_Verified) {
        sessionStorage.setItem("pending_email", email.toLowerCase());
        router.replace("/user/auth/verify");
      }
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePasswordLogin} className="space-y-4">
      {error && <p className="p-3 text-sm bg-destructive/10 text-destructive rounded-lg">{error}</p>}

      <div className="space-y-2">
        <Label>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-12"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(c) => setRememberMe(!!c)}
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground">
            Remember me
          </label>
        </div>
        <Link href="/user/auth/reset" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full h-12" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Login"}
      </Button>
    </form>
  );
}
