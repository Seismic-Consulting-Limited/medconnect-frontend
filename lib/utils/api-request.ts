// /lib/utils/api-request.ts
import { buildApiUrl } from "@/lib/constants";

/** Human-friendly error extraction from API responses. */
export const parseError = async (response: Response): Promise<string> => {
  const status = response.status;
  const isServerError = status >= 500;

  // Try JSON first (avoid raw HTML debug pages)
  try {
    const data = await response.clone().json();
    if (typeof data === "string") return data;
    if ((data as any)?.message) return String((data as any).message);
    if ((data as any)?.detail) return String((data as any).detail);
    if (
      Array.isArray((data as any)?.non_field_errors) &&
      (data as any).non_field_errors.length
    ) {
      return String((data as any).non_field_errors[0]);
    }
    if (Array.isArray((data as any)?.errors) && (data as any).errors.length) {
      return String((data as any).errors[0]);
    }
    const keys = Object.keys(data as any);
    if (keys.length) {
      const first = (data as any)[keys[0]];
      if (Array.isArray(first) && first.length) return String(first[0]);
      if (typeof first === "string") return first;
    }
    return JSON.stringify(data);
  } catch {}

  // Then try raw text
  try {
    const text = (await response.text()).trim();
    if (text) return isServerError ? DEFAULT_SERVER_5XX_FALLBACK : text;
  } catch {}

  // Clean fallback
  return isServerError
    ? DEFAULT_SERVER_5XX_FALLBACK
    : response.statusText || `HTTP ${status}`;
};

const DEFAULT_SERVER_5XX_FALLBACK =
  (typeof process !== "undefined" &&
    typeof process.env !== "undefined" &&
    process.env.NEXT_PUBLIC_SERVER_ERROR_MESSAGE) ||
  "Something went wrong. Please try again.";

/** Normalize RequestInit.headers to a simple Record for easy merging/logging. */
function normalizeHeaders(input?: HeadersInit): Record<string, string> {
  if (!input) return {};
  if (input instanceof Headers) {
    const out: Record<string, string> = {};
    input.forEach((v, k) => (out[k] = v));
    return out;
  }
  if (Array.isArray(input)) {
    return input.reduce<Record<string, string>>((acc, [k, v]) => {
      acc[k] = v as string;
      return acc;
    }, {});
  }
  return { ...(input as Record<string, string>) };
}

export type ApiFlags<TAuth = unknown> = {
  /** If true, injects Authorization: Bearer <token> using getToken(). */
  auth?: boolean;
  /**
   * If true, caller intends to persist tokens/user after a successful response.
   * onSaveAuth will be called with the parsed JSON.
   */
  saveAuth?: boolean;
  /** Function used when auth=true to fetch the current token. */
  getToken?: () => string | null;
  /** Callback used when saveAuth=true to persist tokens/user from response. */
  onSaveAuth?: (data: TAuth) => void;
};

export async function apiRequest<T = unknown, TAuth = unknown>(
  endpoint: string,
  init: RequestInit,
  flags?: ApiFlags<TAuth>
): Promise<T> {
  const { auth = false, saveAuth = false, getToken, onSaveAuth } = flags || {};

  // Merge headers (use a plain object for clarity)
  const headers = normalizeHeaders(init.headers);
  const isJsonBody = init.body && !(init.body instanceof FormData);

  if (isJsonBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (auth && typeof getToken === "function") {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const url = buildApiUrl(endpoint);
  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const message = await parseError(response);
    const err = new Error(message) as Error & { status?: number };
    err.status = response.status;

    // Auto-logout policy: only on 401/403, and NOT for auth endpoints themselves.
    const status = response.status;
    const isAuthzError = status === 401 || status === 403;

    const endpointLower = endpoint.toLowerCase();
    const isAuthEndpoint =
      endpointLower.includes("/auth/login") ||
      endpointLower.includes("/auth/signin") ||
      endpointLower.includes("/auth/verify") ||
      endpointLower.includes("/auth/refresh") ||
      endpointLower.includes("/auth/password") ||
      endpointLower.includes("/auth/signup");

    if (isAuthzError && !isAuthEndpoint && typeof window !== "undefined") {
      try {
        localStorage.removeItem("medconnect_token");
        localStorage.removeItem("user_type");
      } catch {}
      document.cookie =
        "medconnect_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie =
        "role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      window.location.href = "/user/auth/login";
      // Prevent further processing in callers
      return {} as T;
    }

    throw err;
  }

  if (response.status === 204) return {} as T;

  const data = (await response.json()) as T;

  if (saveAuth && typeof onSaveAuth === "function") {
    try {
      onSaveAuth(data as unknown as TAuth);
    } catch {
      // ignore persistence errors
    }
  }

  return data;
}
