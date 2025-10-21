import Cookies from "js-cookie";

export const cookies = {
  set(key: string, value: string, days = 7): void {
    try {
      Cookies.set(key, value, { expires: days, path: "/" });
    } catch (err) {
      console.error("Cookie set error:", err);
    }
  },

  get(key: string): string | undefined {
        try {
        return Cookies.get(key);
        } catch (err) {
        console.error("Cookie get error:", err);
        return undefined;
        }
  },

  remove(key: string): void {
        try {
        Cookies.remove(key, { path: "/" });
        } catch (err) {
        console.error("Cookie remove error:", err);
        }
  },
};
