import axios, { AxiosError } from 'axios';
import { useAuthStore } from './store/useAuthStore';
import { BASE_URL } from '@/utils/env';

export const axiosAdmin = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosAdmin.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosAdmin.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }

    return Promise.reject(err);
  },
);

export default axiosAdmin;
