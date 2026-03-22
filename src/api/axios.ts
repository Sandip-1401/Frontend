import axios, { type InternalAxiosRequestConfig, AxiosError } from "axios";

export const axiosInstance  = axios.create({
   baseURL: "http://localhost:5152/api",
   headers: {
      "Content-Type" : "application/json"
   }
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
   const token = localStorage.getItem("accessToken");
   
   if(token && config.headers){
      config.headers.Authorization = `Bearer ${token}`
   }

   return config;
   },
   (error: AxiosError) => {
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    const isAuthRoute = originalRequest.url?.includes("/auth/");

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
        
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");

      //don not throw customr error
      if (!refreshToken) {
        return Promise.reject(error);
      }

      const res = await axios.post(
        "http://localhost:5152/api/auth/refresh-token",
        { refreshToken }
      );

      const newAccessToken = res.data.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);

    } catch (err) {
      localStorage.clear();
      return Promise.reject(err);
    }
  }
);