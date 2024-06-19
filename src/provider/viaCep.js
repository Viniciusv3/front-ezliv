import axios from "axios";

export const viaCep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  // headers: {
  //   "Acess-Control-Allow-Origin": "*",
  // },
});
