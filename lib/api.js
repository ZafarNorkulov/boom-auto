import axios from "axios";

const api = axios.create({
  baseURL: "https://api.boomavto.ru/",
});

export default api;


// https://api.boomavto.ru/avto/?marka_avto=KIA&page=1&page_size=4
