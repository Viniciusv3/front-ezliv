import axios from "axios";

export const apiCond = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Acess-Control-Allow-Origin": "*",
    "Content-type" : "multipart/form-data; boundary=<calculated when request is sent>",
  },
});

apiCond.interceptors.request.use(
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
