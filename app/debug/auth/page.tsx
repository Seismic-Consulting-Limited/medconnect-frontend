"use client";
import { useEffect, useMemo, useState } from "react";

const decode = (t?: string) => {
  try {
    if (!t) return null;
    const p = t.split(".")[1]; if (!p) return null;
    const b64 = p.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (p.length % 4)) % 4);
    return JSON.parse(decodeURIComponent(escape(atob(b64))));
  } catch { return null; }
};

export default function DebugAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const c = document.cookie.split("; ").find(x => x.startsWith("medconnect_token="));
    setToken(c ? c.split("=")[1] : null);
  }, []);

  const payload = useMemo(() => decode(token || undefined), [token]);
  const nowS = Math.floor(Date.now()/1000);
  const expRaw = payload?.exp;
  const expS = typeof expRaw === "number" ? (expRaw > 1e12 ? Math.floor(expRaw/1000) : expRaw) : undefined;
  const secondsLeft = typeof expS === "number" ? expS - nowS : undefined;

  return (
    <div style={{ padding: 16, fontFamily: "monospace" }}>
      <h2>/debug/auth</h2>
      <pre>cookie present: {String(Boolean(token))}</pre>
      <pre>token length  : {token?.length ?? 0}</pre>
      <pre>payload keys  : {payload ? Object.keys(payload).join(", ") : "null"}</pre>
      <pre>role          : {String(payload?.role || payload?.user_type || payload?.user?.role)}</pre>
      <pre>sub/user_id   : {String(payload?.sub || payload?.user_id || payload?.id)}</pre>
      <pre>exp (raw)     : {String(expRaw)}</pre>
      <pre>seconds left  : {typeof secondsLeft === "number" ? secondsLeft : "n/a"}</pre>
    </div>
  );
}
