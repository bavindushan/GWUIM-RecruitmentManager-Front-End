import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decoded.exp < currentTime;
  } catch {
    return true; // treat invalid tokens as expired
  }
}

export function validateStoredToken() {
  const token = localStorage.getItem("token") || localStorage.getItem("adminToken");

  if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    return false;
  }

  return !!token;
}
