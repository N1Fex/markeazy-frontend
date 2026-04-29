import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

function getTokenData(token) {
  return jwtDecode(token);
}

function getTokenExpirationTime(token) {
  try {
    return getExpiresDateFromToken(token) * 1000;
  } catch (error) {
    return null;
  }
}

function isTokenStillValid(token) {
  const expirationTime = getTokenExpirationTime(token);
  return Boolean(expirationTime && expirationTime > Date.now());
}

export function getExpiresDateFromToken(token) {
  const data = getTokenData(token);
  return data.exp;
}

export function getRolesFromToken(token) {
  const data = getTokenData(token);
  return data.roles;
}

export function getAccountTypeFromToken(token = localStorage.getItem("token")) {
  if (!token) {
    return null;
  }

  try {
    if (!isTokenStillValid(token)) {
      return null;
    }
    const data = getTokenData(token);
    return data.accountType ?? null;
  } catch (error) {
    return null;
  }
}

export function isSellerAccount(token = localStorage.getItem("token")) {
  if (!token) {
    return false;
  }

  try {
    return isTokenStillValid(token) && getAccountTypeFromToken(token) === "SELLER";
  } catch (error) {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}

export function isUserValid() {
  try {
    const token = localStorage.getItem("token");
    return token !== null && isTokenStillValid(token);
  } catch (error) {
    return false;
  }
}

export function useAuthState() {
  const getSnapshot = () => ({
    isAuthorized: isUserValid(),
    accountType: getAccountTypeFromToken(),
    isSeller: isSellerAccount(),
  });

  const [authState, setAuthState] = useState(getSnapshot);

  useEffect(() => {
    let timeoutId = null;

    const refreshAuthState = () => {
      setAuthState(getSnapshot());
    };

    const scheduleRefresh = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const token = localStorage.getItem("token");
      const expirationTime = token ? getTokenExpirationTime(token) : null;

      if (expirationTime && expirationTime > Date.now()) {
        timeoutId = setTimeout(() => {
          refreshAuthState();
          scheduleRefresh();
        }, expirationTime - Date.now() + 150);
      }
    };

    const syncAuthState = () => {
      refreshAuthState();
      scheduleRefresh();
    };

    syncAuthState();

    window.addEventListener("focus", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("focus", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  return authState;
}
