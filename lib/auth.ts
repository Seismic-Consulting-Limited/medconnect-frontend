// /lib/auth.ts
import { AUTH_CONSTANTS, HTTP_METHODS, API_ENDPOINTS } from "./constants";
import { apiRequest } from "./utils/api-request";
import { setAuthCookie } from "../lib/cookies";

export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role?: string;
  hospitalId?: string;
}

export interface AuthResponse {
  user?: User;
  token?: string;
  refreshToken?: string;
  success?: boolean;
  error?: string;
  data?: any;
  next?: string; // e.g. "verify" when backend says user is unverified
  [key: string]: any;
}

const setTokens = (token?: string, refreshToken?: string) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, token);
    // cookie (skip Secure on http://localhost)
    setAuthCookie("medconnect_token", token, 7 * 24 * 60 * 60);
  }
  if (refreshToken) {
    localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, refreshToken);
  }
};

const setUserLocal = (user?: User) => {
  if (typeof window === "undefined") return;
  try {
    if (user && typeof user === "object") {
      localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
    }
  } catch {
    localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
  }
};

const getTokenLocal = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY);
};

const getRefreshTokenLocal = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
};

const clearAuthLocal = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_CONSTANTS.TOKEN_KEY);
  localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
  localStorage.removeItem("user_type");
  localStorage.removeItem("medconnect_token");
  // expire cookies
  document.cookie = "medconnect_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "role=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

const getUserLocal = (): User | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_CONSTANTS.USER_KEY);
  if (!raw || raw === "undefined" || raw === "null") {
    localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && ("email" in parsed || "id" in parsed)) {
      return parsed as User;
    }
  } catch {}
  localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
  return null;
};

// base64url-safe decoder for JWT payloads (browser env)
const decodeJwt = (token: string): any | null => {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (part.length % 4)) % 4);
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const isTokenValid = (token: string): boolean => {
  const payload = decodeJwt(token);
  if (!payload) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  const leeway = 60; // small clock skew
  if (payload.exp && payload.exp < currentTime - leeway) return false;
  if (!payload.user_id && !payload.sub && !payload.id) return false;
  return true;
};

function persistAuthFromResponse(payload: AuthResponse) {
  console.log("[v0] AUTH: persistAuthFromResponse called");

  let token: string | null = null;
  let user: any = null;
  let userType: string | null = null;

  const tokenPaths = [
    payload?.token,
    payload?.data?.token,
    payload?.data?.access_token,
    payload?.access_token,
    payload?.authToken,
    payload?.data?.authToken,
    payload?.jwt,
    payload?.data?.jwt,
  ];

  for (const t of tokenPaths) {
    if (t && typeof t === "string" && t.length > 10) {
      token = t;
      break;
    }
  }

  const userPaths = [payload?.user, payload?.data?.user, payload?.data];

  for (const u of userPaths) {
    if (u && typeof u === "object" && (u.email || u.id)) {
      user = u;
      break;
    }
  }

  const userTypePaths = [
    payload?.user_type,
    payload?.data?.user_type,
    user?.user_type,
    user?.role,
    payload?.role,
    payload?.data?.role,
  ];

  for (const ut of userTypePaths) {
    if (ut && typeof ut === "string") {
      userType = ut;
      break;
    }
  }

  if (token) {
    console.log("[v0] AUTH: Storing token and user data...");

    try {
      localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, token);
      localStorage.setItem("medconnect_token", token);

      // cookie (IMPORTANT: no Secure on http)
      setAuthCookie("medconnect_token", token, 7 * 24 * 60 * 60);

      const immediateCheck = localStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY);
      if (!immediateCheck) {
        console.error("[v0] AUTH: Token storage failed");
        return false;
      }
    } catch (error) {
      console.error("[v0] AUTH: Error storing token:", error);
      return false;
    }

    if (user) {
      try {
       const safeUser =
  user && typeof user === "object"
    ? {
        id: user.id ?? user.sub ?? user.user_id,
        email: user.email,
        name: user.name ?? [user.first_name, user.last_name].filter(Boolean).join(" "),
        role: user.role ?? user.user_type,
        emailVerified: user.emailVerified ?? user.email_verified ?? false,
        createdAt: user.createdAt ?? user.created_at ?? "",
        updatedAt: user.updatedAt ?? user.updated_at ?? "",
        // ✅ persist hospital id in the stored user
        hospitalId:
          user.hospitalId ??
          user.hospital_id ??
          user.hospital?.id ??
          user.hospital?.uuid ??
          undefined,
      }
    : null;
        if (safeUser) localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(safeUser));
      } catch {
        // ignore bad user shapes
      }
    }

    if (userType) {
      localStorage.setItem("user_type", userType);
    }

    console.log("[v0] AUTH: Successfully stored auth data");
    return true;
  } else {
    console.error("[v0] AUTH: No token found in response");
    return false;
  }
}

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService();
    return AuthService.instance;
  }

  public getToken(): string | null {
    if (typeof window === "undefined") return null;

    // First try localStorage
    const localToken = getTokenLocal();
    if (localToken) {
      if (isTokenValid(localToken)) return localToken;
      return null;
    }

    // Fallback to cookie
    const cookieToken =
      document.cookie.split("; ").find((c) => c.startsWith("medconnect_token="))?.split("=")[1] || null;

    if (cookieToken) {
      if (isTokenValid(cookieToken)) {
        localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, cookieToken);
        return cookieToken;
      }
      return null;
    }

    return null;
  }

  private getRefreshToken(): string | null {
    return getRefreshTokenLocal();
  }

  public clearAuth(): void {
    clearAuthLocal();
  }

  public debugClearAll(): void {
    if (typeof window !== "undefined") {
      const keysToRemove = [
        AUTH_CONSTANTS.TOKEN_KEY,
        AUTH_CONSTANTS.REFRESH_TOKEN_KEY,
        AUTH_CONSTANTS.USER_KEY,
        "user_type",
        "medconnect_token",
        "auth_token",
        "token",
      ];
      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });

      const cookiesToClear = ["medconnect_token", "role", "auth_token", "token"];
      cookiesToClear.forEach((cookie) => {
        document.cookie = `${cookie}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });
    }
  }

  public getCurrentUser(): User | null {
    return getUserLocal();
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!token && !!user;
  }

  // Patient Signup
  public async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any,
  ): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email.toLowerCase(),
          password,
          terms_of_service_agreement_checked: true,
          ...(accountType && { account_type: accountType }),
          ...(metadata && { metadata }),
        }),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      },
    );
  }

  public async signupHospital(payload: Record<string, any>): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP_HOSPITAL,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(payload),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      },
    );
  }

  public async signupTravelAgent(payload: Record<string, any>): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP_TRAVEL_AGENT,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(payload),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      },
    );
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await apiRequest<AuthResponse, AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          method: HTTP_METHODS.POST,
          body: JSON.stringify({ email: email.toLowerCase(), password }),
        },
        { saveAuth: false } // manual persist below
      );

      const persisted = persistAuthFromResponse(response);

      // handle “unverified” path even if token wasn't persisted
      if (!persisted) {
        const backendMsg =
          (response as any)?.message ||
          (response as any)?.detail ||
          (response as any)?.error;

        if (backendMsg === "User not verified, an OTP has been sent to your email") {
          return { success: false, error: backendMsg, next: "verify" };
        }
        return { success: false, error: "Authentication failed - could not store login data" };
      }

      const storedToken = this.getToken();
      if (!storedToken) {
        return { success: false, error: "Authentication failed - token not stored" };
      }

      return response;
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Login failed";
      if (msg === "User not verified, an OTP has been sent to your email") {
        return { success: false, error: msg, next: "verify" };
      }
      return { success: false, error: msg };
    }
  }

  public async logout(): Promise<void> {
    try {
      await apiRequest(
        API_ENDPOINTS.AUTH.LOGOUT,
        { method: HTTP_METHODS.POST },
        {
          auth: true,
          getToken: () => this.getToken(),
        },
      );
    } catch {
      // ignore
    } finally {
      this.clearAuth();
    }
  }

  public async refreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const data = await apiRequest<AuthResponse, AuthResponse>(
        API_ENDPOINTS.AUTH.REFRESH,
        {
          method: HTTP_METHODS.POST,
          body: JSON.stringify({ refreshToken }),
        },
        {
          saveAuth: true,
          onSaveAuth: persistAuthFromResponse,
        },
      );
      return data?.token ?? null;
    } catch {
      this.clearAuth();
      return null;
    }
  }

  public async verifyEmail(email: string, otp: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ email: email.toLowerCase(), otp }),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      },
    );
  }

  public async resendEmailOtp(email: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(API_ENDPOINTS.AUTH.RESEND_OTP, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
  }

  public async signinOtpInit(email: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(API_ENDPOINTS.AUTH.SIGNIN_OTP_INIT, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
  }

  public async signinOtpVerify(email: string, otp: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNIN_OTP_VERIFY,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ email: email.toLowerCase(), otp }),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      },
    );
  }

  public async resetPasswordInit(email: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(API_ENDPOINTS.AUTH.PASSWORD_RESET, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
  }

  public async resetPasswordConfirm(uid: string, token: string, newPassword: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ uid, token, new_password: newPassword }),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      },
    );
  }
}

export const authService = AuthService.getInstance();

if (typeof window !== "undefined") {
  (window as any).debugClearAuth = () => {
    authService.debugClearAll();
    window.location.reload();
  };
}
