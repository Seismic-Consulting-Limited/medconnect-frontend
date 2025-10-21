export const storage = {
  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("localStorage set error:", err);
    }
  },

  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (err) {
      console.error("localStorage get error:", err);
      return null;
    }
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("localStorage remove error:", err);
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.clear();
    } catch (err) {
      console.error("localStorage clear error:", err);
    }
  },
};
