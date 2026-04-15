import axios from "axios";

let previousUrl = "/";

const API = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  //baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

function controlToken() {
  if (localStorage.getItem("token")) {
    API.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  } else {
    delete API.defaults.headers.Authorization;
  }
}

function savePreviousPath() {
  const path = window.location.pathname;
  if (!path.includes("login") && !path.includes("recovery")) {
    previousUrl = window.location.href;
  }
}

export function getToUrl(path, config) {
  controlToken();
  savePreviousPath();
  return API.get(path, config);
}

export function postToUrl(path, params, config) {
  controlToken();
  savePreviousPath();
  return API.post(path, params, config);
}

export function patchToUrl(path, params, config) {
  controlToken();
  return API.patch(path, params, config);
}

export function backToPreviousUrl() {
  window.location.assign(previousUrl);
}