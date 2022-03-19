import axios from "axios";

export const baseURL = "http://localhost:5020";

const refreshToken = localStorage.getItem("refreshToken")
let accessToken = localStorage.getItem("accessToken")

// 创建 axios 实例
const axiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL,
  timeout: 6000, // 请求超时时间
});

// request interceptor
axiosInstance.interceptors.request.use((config) => {
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  
  if (accessToken) {
    config.headers = {
      authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
}, err => {
  return Promise.reject(err)
});

// response interceptor
axiosInstance.interceptors.response.use((res) => {
  return res
}, async (err) => {
  if (err.response) {
    if (err.response.status === 403 && refreshToken) {
      try {
        const res = await axios.get(`${baseURL}/api/session/refresh`, {
          headers: {
            "x-refresh": refreshToken
          }
        })
        localStorage.setItem("accessToken", res.data.accessToken)
        accessToken = res.data.accessToken
        return axiosInstance.request(err.response.config)
      } catch (error: any) {
        return Promise.reject(error)
      }
    }
  }
  return Promise.reject(err)
})

export default axiosInstance;
