import { AUTH_CONSTANTS, HTTP_METHODS, API_ENDPOINTS } from "./constants";
import { apiRequest } from "./utils/api-request";

export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role?: string;
}

export interface AuthResponse {
  user?: User;
  token?: string;
  refreshToken?: string;
  success?: boolean;
  error?: string;
  data?: any;
  [key: string]: any;
}

const setTokens = (token?: string, refreshToken?: string) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, token);
    // Also set as cookie for server-side access
    document.cookie = `medconnect_token=${token}; path=/; max-age=${
      7 * 24 * 60 * 60
    }; secure; samesite=strict`;
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
  // Clear cookie
  document.cookie =
    "medconnect_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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
    if (
      parsed &&
      typeof parsed === "object" &&
      ("email" in parsed || "id" in parsed)
    ) {
      return parsed as User;
    }
  } catch {}
  localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
  return null;
};

function persistAuthFromResponse(payload: AuthResponse) {
  const token =
    payload?.token || payload?.data?.token || payload?.data?.access_token;
  const refreshToken =
    payload?.refreshToken ||
    payload?.data?.refresh_token ||
    payload?.data?.refreshToken;
  const user = payload?.user || payload?.data?.user;
  const userType =
    payload?.user_type ||
    payload?.data?.user_type ||
    user?.user_type ||
    user?.role;

  if (token || refreshToken) {
    setTokens(token, refreshToken);
    if (userType && typeof window !== "undefined") {
      localStorage.setItem("user_type", userType);
    }
    setUserLocal(user);
  }
}

const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token has expired
    if (payload.exp && payload.exp < currentTime) {
      return false;
    }

    // Check if token has required fields
    if (!payload.user_id && !payload.sub) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

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
      if (isTokenValid(localToken)) {
        return localToken;
      } else {
        this.clearAuth();
        return null;
      }
    }

    // Fallback to cookie
    const cookieToken =
      document.cookie
        .split("; ")
        .find((c) => c.startsWith("medconnect_token="))
        ?.split("=")[1] || null;

    if (cookieToken) {
      if (isTokenValid(cookieToken)) {
        return cookieToken;
      } else {
        this.clearAuth();
        return null;
      }
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
      // Clear all possible localStorage keys
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

      // Clear all possible cookies
      const cookiesToClear = [
        "medconnect_token",
        "role",
        "auth_token",
        "token",
      ];
      cookiesToClear.forEach((cookie) => {
        document.cookie = `${cookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });
    }
  }

  public getCurrentUser(): User | null {
    const user = getUserLocal();
    return user;
  }

  public isAuthenticated(): boolean {
    const token = this.getToken(); // This now validates the token
    const user = this.getCurrentUser();
    const isAuth = !!token && !!user;
    return isAuth;
  }

  // Patient Signup
  public async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType?: string,
    metadata?: any
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
      }
    );
  }

  // Hospital Signup
  public async signupHospital(
    payload: Record<string, any>
  ): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP_HOSPITAL,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(payload),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      }
    );
  }

  public async signupTravelAgent(
    payload: Record<string, any>
  ): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP_TRAVEL_AGENT,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(payload),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      }
    );
  }

  // Login (password)
  public async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await apiRequest<AuthResponse, AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          method: HTTP_METHODS.POST,
          body: JSON.stringify({ email: email.toLowerCase(), password }),
        },
        {
          saveAuth: true,
          onSaveAuth: persistAuthFromResponse,
        }
      );
      return response;
    } catch (error) {
      console.error("Auth service login error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      } as AuthResponse;
    }
  }

  // Logout
  public async logout(): Promise<void> {
    try {
      await apiRequest(
        API_ENDPOINTS.AUTH.LOGOUT,
        { method: HTTP_METHODS.POST },
        {
          auth: true,
          getToken: () => this.getToken(),
        }
      );
    } catch {
      // ignore – we'll still clear local state
    } finally {
      this.clearAuth();
    }
  }

  // Refresh token
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
        }
      );
      return data?.token ?? null;
    } catch {
      this.clearAuth();
      return null;
    }
  }

  // Signup OTP
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
      }
    );
  }

  public async resendEmailOtp(email: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(API_ENDPOINTS.AUTH.RESEND_OTP, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
  }

  // Login OTP
  public async signinOtpInit(email: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(API_ENDPOINTS.AUTH.SIGNIN_OTP_INIT, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
  }

  public async signinOtpVerify(
    email: string,
    otp: string
  ): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNIN_OTP_VERIFY,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ email: email.toLowerCase(), otp }),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      }
    );
  }

  // Password reset
  public async resetPasswordInit(email: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(API_ENDPOINTS.AUTH.PASSWORD_RESET, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
  }

  public async resetPasswordConfirm(
    uid: string,
    token: string,
    newPassword: string
  ): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
      API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ uid, token, new_password: newPassword }),
      },
      {
        saveAuth: true,
        onSaveAuth: persistAuthFromResponse,
      }
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
