// /lib/cookies.ts
/**
 * Sets a cookie from the client side with proper attributes.
 * - Adds `Secure` only when running over https.
 * - Uses canonical casing so browsers don't ignore attributes.
 */
export const setAuthCookie = (name: string, value: string, maxAgeSeconds: number) => {
  const isHttps =
    typeof window !== "undefined" &&
    typeof window.location !== "undefined" &&
    window.location.protocol === "https:";

  const parts = [
    `${name}=${value}`,
    "Path=/",
    `Max-Age=${maxAgeSeconds}`,
    "SameSite=Strict",
  ];

  if (isHttps) parts.push("Secure"); // IMPORTANT: do NOT use Secure on http://localhost
  document.cookie = parts.join("; ");
};
