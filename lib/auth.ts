
import { AUTH_CONSTANTS, HTTP_METHODS, API_ENDPOINTS } from "./constants";
import { apiRequest } from "./utils/api-request";

export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user?: User;
  token?: string;
  refreshToken?: string;
  [key: string]: any;
}


  // Local storage helpers
const setTokens = (token?: string, refreshToken?: string) => {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, token);
  if (refreshToken) localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, refreshToken);
};

const setUserLocal = (user?: unknown) => {
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

/** Centralized "saveAuth" handler used by apiRequest when flags.saveAuth=true. */
function persistAuthFromResponse(payload: AuthResponse) {
  if (payload?.token || payload?.refreshToken) {
    setTokens(payload.token, payload.refreshToken);
    setUserLocal(payload.user);
  }
}


  // Auth Service

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService();
    return AuthService.instance;
  }

  // ---- State helpers
  public getToken(): string | null {
    return getTokenLocal();
  }

  private getRefreshToken(): string | null {
    return getRefreshTokenLocal();
  }

  public clearAuth(): void {
    clearAuthLocal();
  }

  public getCurrentUser(): User | null {
    return getUserLocal();
  }

  public isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
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

  //  Hospital Signup
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
      }
    );
  }

  // Login (password)
  public async login(email: string, password: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse, AuthResponse>(
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
    return apiRequest<AuthResponse>(
      API_ENDPOINTS.AUTH.RESEND_OTP,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ email: email.toLowerCase() }),
      }
    );
  }

  // Login OTP
  public async signinOtpInit(email: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNIN_OTP_INIT,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ email: email.toLowerCase() }),
      }
    );
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
      }
    );
  }

  // Password reset
  public async resetPasswordInit(email: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(
      API_ENDPOINTS.AUTH.PASSWORD_RESET,
      {
        method: HTTP_METHODS.POST,
        body: JSON.stringify({ email: email.toLowerCase() }),
      }
    );
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
      }
    );
  }
}

export const authService = AuthService.getInstance();
