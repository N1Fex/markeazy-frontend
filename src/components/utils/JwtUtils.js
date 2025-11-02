import {jwtDecode} from "jwt-decode";

export function getExpiresDateFromToken(token) {
  const data = jwtDecode(token);
  return data.exp;
}

export function getRolesFromToken(token) {
  const data = jwtDecode(token);
  return data.roles;
}

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}

export function isUserValid() {
  const token = localStorage.getItem("token");
  return token !== null && getExpiresDateFromToken(token)*1000 > new Date().getTime();
}