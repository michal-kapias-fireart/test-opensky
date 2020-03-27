import axios from "./axiosConfig";

export function getArrival({ ICAO }) {
  return axios.get(
    `/flights/arrival?airport=${ICAO}&begin=1517227200&end=1517230800`
  );
}

export function getDeparture({ ICAO }) {
  return axios.get(
    `/flights/departure?airport=${ICAO}&begin=1517227200&end=1517230800`
  );
}
