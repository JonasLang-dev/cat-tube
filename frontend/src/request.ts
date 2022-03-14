import axios from "axios";

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  timeout: 6000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: any) => {
  return error;
};

// request interceptor
request.interceptors.request.use((config) => {
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (localStorage.getItem("accessToken")) {
    config.headers = {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
  return response;
});

export default request;

export { request as axios };
