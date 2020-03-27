import axios from "./axiosConfig";

export function getArrival(params) {
  return axios.get("/flights/arrival", { params });
}

export function getDeparture(params) {
  return axios.get("/flights/departure/", { params });
}
