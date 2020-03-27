import axios from "axios";

const apiURL = "https://opensky-network.org/api";

const instance = axios.create({
  baseURL: apiURL
});

export default instance;
