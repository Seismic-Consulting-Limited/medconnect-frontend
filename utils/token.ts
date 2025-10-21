// /lib/token.ts
import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function setAccessToken(token: string, expiresInDays = 1) {
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires: expiresInDays, secure: true });
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function removeAccessToken() {
  Cookies.remove(ACCESS_TOKEN_KEY);
}

export function setRefreshToken(token: string, expiresInDays = 7) {
  Cookies.set(REFRESH_TOKEN_KEY, token, { expires: expiresInDays, secure: true });
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

export function removeRefreshToken() {
  Cookies.remove(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
  removeAccessToken();
  removeRefreshToken();
}
