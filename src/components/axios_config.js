import axios from "axios";


const API = axios.create({
  baseURL: "http://192.168.0.6:8080/api/v1",
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

export function getToUrl(path, config) {
  controlToken();
  return API.get(path, config);
}

export function postToUrl(path, params, config) {
  controlToken();
  return API.post(path, params, config);
}
