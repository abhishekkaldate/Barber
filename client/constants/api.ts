import axios from "axios";

const api = axios.create({baseURL: "https://barber-server-seven.vercel.app/api"})

export default api;