import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export const baseURL: string = "http://localhost:5020";

const refreshToken = localStorage.getItem("refreshToken");
const accessToken = localStorage.getItem("accessToken");

// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL,
  timeout: 6000, // 请求超时时间
});

if (accessToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

// request interceptor
axiosInstance.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改

    return requestConfig;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (responseConfig: AxiosRequestConfig) => {
    return responseConfig;
  },
  async (err: AxiosError) => {
    if (err.response) {
      if (err.response.status === 403 && refreshToken) {
        localStorage.removeItem("accessToken");
        try {
          const res = await axios.get(`${baseURL}/api/session/refresh`, {
            headers: {
              "x-refresh": refreshToken,
            },
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;
          return axiosInstance.request(err.response.config);
        } catch (error: any) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
