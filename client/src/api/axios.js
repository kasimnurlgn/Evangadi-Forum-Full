import axios from "axios";
const instance = axios.create({
  baseURL: "https://evangadi-forum-backend-m6d7.onrender.com/api",
});
export default instance;
