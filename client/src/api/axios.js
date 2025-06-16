import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://evangasi-forum-backenend-deploy.onrender.com/api",
});
export default instance;
