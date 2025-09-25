// hooks/use-auth.ts
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { authService, type User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
  getUserRole: () => string | null;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---- helpers ----
const b64urlJSON = (token?: string): any | null => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const p = parts[1];
  try {
    const b64 = p.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (p.length % 4)) % 4);
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const expToSeconds = (expRaw: any): number | undefined =>
  typeof expRaw === "number" ? (expRaw > 1e12 ? Math.floor(expRaw / 1000) : expRaw) : undefined;

const isExpired = (payload: any): boolean => {
  const expS = expToSeconds(payload?.exp);
  if (typeof expS !== "number") return false;
  const now = Math.floor(Date.now() / 1000);
  const leeway = 30;
  return expS + leeway < now;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // derive role robustly
  const userRole = useMemo<string | null>(() => {
    if (user?.role) return user.role;
    if (typeof window !== "undefined") {
      const storedUserType = localStorage.getItem("user_type");
      if (storedUserType) return storedUserType;
      const token = authService.getToken();
      if (token) {
        const payload = b64urlJSON(token);
        if (payload) return (payload.role || payload.user_type || null) as string | null;
      }
    }
    return null;
  }, [user]);

  const getUserRole = useCallback((): string | null => userRole, [userRole]);

  // initialize from token/cached user
  useEffect(() => {
    const init = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          setUser(null);
          return;
        }

        // try cached user first
        const cached = authService.getCurrentUser();
        if (cached) {
          setUser(cached);
          return;
        }

        // decode from token safely
        const payload = b64urlJSON(token);
        if (!payload) {
          setUser(null);
          return;
        }

        if (isExpired(payload)) {
          authService.clearAuth();
          setUser(null);
          return;
        }

        const userData: User = {
  id: payload.user_id || payload.sub || payload.id || "",
  email: payload.email || "",
  role: payload.role || payload.user_type || undefined,
  name: payload.name || "",
  emailVerified: payload.emailVerified ?? payload.email_verified ?? false,
  createdAt: payload.createdAt || payload.created_at || "",
  updatedAt: payload.updatedAt || payload.updated_at || "",
  hospitalId:
    payload.hospitalId ||
    payload.hospital_id ||
    payload.hospital?.id ||
    undefined,
};

        setUser(userData);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ) => {
    setIsLoading(true);
    try {
      const response = await authService.signup(firstName, lastName, email, password, accountType, metadata);
      setUser(response.user ?? null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);

      const token = authService.getToken();
      if (token) {
        const payload = b64urlJSON(token);
        if (payload && !isExpired(payload)) {
          const roleFromStorage = typeof window !== "undefined" ? localStorage.getItem("user_type") : null;
          const userData: User = {
            id: payload.user_id || payload.sub || payload.id || "",
            email: payload.email || "",
            role: payload.role || payload.user_type || roleFromStorage || undefined,
            name: payload.name || "",
            emailVerified: payload.emailVerified ?? payload.email_verified ?? false,
            createdAt: payload.createdAt || payload.created_at || "",
            updatedAt: payload.updatedAt || payload.updated_at || "",
            hospitalId:
    payload.hospitalId ||
    payload.hospital_id ||
    payload.hospital?.id ||
    (response?.user?.hospitalId ??
     response?.data?.user?.hospital_id ??
     undefined),
          };
          setUser(userData);
        }
      }

      return response || { success: false, error: "Login failed" };
    } catch (error) {
      setUser(null);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // SAFE refresh: if unsupported/missing, it's a no-op and never clears the user
  const refreshAuth = async () => {
    try {
      const newToken = await authService.refreshToken();

      // No refresh support or no refresh token → keep current session
      if (!newToken) {
        return;
      }

      const payload = b64urlJSON(newToken);
      if (payload && !isExpired(payload)) {
        setUser({
          id: payload.user_id || payload.sub || payload.id || "",
          email: payload.email || "",
          role: payload.role || payload.user_type || undefined,
          name: payload.name || "",
          emailVerified: payload.emailVerified ?? payload.email_verified ?? false,
          createdAt: payload.createdAt || payload.created_at || "",
          updatedAt: payload.updatedAt || payload.updated_at || "",
        });
      }
      // If payload is bad, do nothing (don't nuke session here).
    } catch (e) {
      console.warn("[auth] refreshAuth failed; keeping existing session", e);
      // No state clear on refresh failures
    }
  };

  // Authenticated only if we have a valid token *and* a user object
  const isAuthenticated = useMemo(() => {
    return Boolean(authService.getToken() && user);
  }, [user]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    userRole,
    getUserRole,
    signup,
    login,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    if (typeof window === "undefined") {
      return {
        user: null,
        isLoading: true,
        isAuthenticated: false,
        userRole: null,
        getUserRole: () => null,
        signup: async () => { throw new Error("Auth not available during SSR"); },
        login: async () => { throw new Error("Auth not available during SSR"); },
        logout: async () => { throw new Error("Auth not available during SSR"); },
        refreshAuth: async () => { throw new Error("Auth not available during SSR"); },
      };
    }
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      userRole: null,
      getUserRole: () => null,
      signup: async () => { throw new Error("Authentication not properly initialized - AuthProvider missing"); },
      login: async () => { throw new Error("Authentication not properly initialized - AuthProvider missing"); },
      logout: async () => { throw new Error("Authentication not properly initialized - AuthProvider missing"); },
      refreshAuth: async () => { throw new Error("Authentication not properly initialized - AuthProvider missing"); },
    };
  }
  return context;
}
