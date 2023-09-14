import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import AuthService from './authService';

const authService = new AuthService();

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  let accessToken: string | null = '';

  try {
    accessToken = await authService.getAccessToken();

    if (config && config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch {
    // Could not get access token; request will not be auth'd
  }

  return config;
},
(error: AxiosError) => {
  Promise.reject(error);
});

instance.interceptors.response.use((response: AxiosResponse) => {
  return response;
},
(error: AxiosError) => {
  console.error(error);
  throw error;
});

const Api = {
  get(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    if (params) {
      const search = new URLSearchParams(params).toString();
      url = `${url}?${search}`;
    }

    return instance.get(url, config);
  },

  post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return instance.post(url, data, config);
  },

  put(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return instance.put(url, data, config);
  },

  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return instance.delete(url, config);
  },
};

export default Api;
