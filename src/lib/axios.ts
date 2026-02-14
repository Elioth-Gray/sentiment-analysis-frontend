/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { useAuthStore } from './store/useAuthStore';
import { BASE_URL } from '@/utils/env';
import type { RefreshTokenResponse } from '@/types/auth.type';

export const axiosAdmin = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: any) => void;
};

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error?: any, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosAdmin.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.withCredentials = true;

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosAdmin.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig | undefined;
    if (!originalRequest) return Promise.reject(err);

    const status = err.response?.status;

    if (status === 401) {
      const { token, clearAuth } = useAuthStore.getState();

      if (!token) {
        clearAuth();
        return Promise.reject(err);
      }

      // Queue requests if refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (!originalRequest.headers) originalRequest.headers = {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosAdmin(originalRequest));
            },
            reject,
          });
        });
      }

      (originalRequest as any)._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.get(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });

        const data = response.data as RefreshTokenResponse;

        if (!data || !data.data?.token) {
          throw new Error('Failed to refresh token');
        }

        const newAccessToken = data.data.token;

        useAuthStore
          .getState()
          .setAuth(newAccessToken, useAuthStore.getState().user);

        processQueue(null, newAccessToken);

        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.withCredentials = true;

        return axiosAdmin(originalRequest);
      } catch (err) {
        processQueue(err, undefined);
        clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
  },
);

export default axiosAdmin;
