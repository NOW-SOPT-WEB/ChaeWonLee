import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "http://34.64.233.12:8080",
});

export default axiosInstance;
