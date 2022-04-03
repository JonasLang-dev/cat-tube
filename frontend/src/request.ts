import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

// export const baseURL: string = "http://localhost:5020";
export const baseURL: string = " http://192.168.1.7:5020";

let refreshToken = localStorage.getItem("refreshToken");
let accessToken = localStorage.getItem("accessToken");

// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL,
  timeout: 6000, // 请求超时时间
});

// request interceptor
axiosInstance.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (accessToken) {
      requestConfig.headers = { authorization: `Bearer ${accessToken}` };
    }
    return requestConfig;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (responseConfig: AxiosResponse) => {
    if (
      responseConfig.config.url === "/api/session" &&
      responseConfig.config.method === "post"
    ) {
      accessToken = responseConfig.data.accessToken;
      refreshToken = responseConfig.data.refreshToken;
    }
    return responseConfig;
  },
  async (err: AxiosError) => {
    if (err.response) {
      if (err.response.status === 403 && refreshToken) {
        try {
          const res = await axios.get(`${baseURL}/api/session/refresh`, {
            headers: {
              "x-refresh": refreshToken,
            },
          });
          localStorage.setItem("accessToken", res.data.accessToken);
          accessToken = res.data.accessToken;
          return axiosInstance.request(err.response.config);
        } catch (error: any) {
          refreshToken = null;
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
