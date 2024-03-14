import {loadTokens, saveTokens} from '@/utils/auth';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import {api} from './axios.instance';

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const tokens = await loadTokens();
      if (tokens) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      return config;
    },
    (error: AxiosError | Error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.config) {
        const originalRequest = error.config as AxiosRequestConfig;
        if (error.response.status === 401 && !originalRequest._retry) {
          const tokens = await loadTokens();
          if (tokens && tokens.refreshToken) {
            try {
              const response = await api.post('/auth/refresh-token', {
                refreshToken: tokens.refreshToken,
              });
              const {
                newAccessToken: accessToken,
                newRefreshToken: refreshToken,
              } = response.data;
              await saveTokens({accessToken, refreshToken});
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return instance(originalRequest);
            } catch (refreshError) {
              console.error('Unable to refresh token', refreshError);
              return Promise.reject(refreshError);
            }
          }
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};
