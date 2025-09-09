import Cookies from "js-cookie";
import { authKey } from "./constants";

export function setAuthCookie(key: string, value: string) {
  return Cookies.set(key, value);
}

export function getAuthCookie(key: string): string | undefined {
  return Cookies.get(key);
}

export function removeAuthCookie(key: string) {
  return Cookies.remove(key);
}

export function hasAuthToken() {
  return Cookies.get(authKey);
}
