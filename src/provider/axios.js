import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Acess-Control-Allow-Origin": "*",
    "Content-type" : "application/json"
  },
});

api.interceptors.request.use(
  function (config) {
    if (config.url === "/users/authenticate") {
      config.headers.clear("Authorization");
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      // window.location = "/login";
      console.log("403: " + error)
    }

    return Promise.reject(error);
  }
);
