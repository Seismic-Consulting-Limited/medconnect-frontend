import { TokenResponse } from "@/types/client.type";
import { getRefreshToken, removeAccessToken, setAccessToken, setRefreshToken } from "@/utils/token";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com";

/**
 * Attempts to refresh the access token using the stored refresh token.
 */
export async function refreshTokenService(): Promise<string | null> {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token found");

    const response = await axios.post<TokenResponse>(`${BASE_URL}/v1/auth/refresh-token/`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Store new tokens
    setAccessToken(accessToken);
    if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
    }

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    removeAccessToken();
    return null;
  }
}
