import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import {api} from './axios.instance';
import {useUserStore} from '@/stores/useUserStore';
import {
  loadRefreshToken,
  removeRefreshToken,
  saveRefreshToken,
} from '@/utils/auth';

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const user = useUserStore.getState().user;
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
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
        if (
          error.response.status === 401 &&
          error.response.data?.code === 'expired' &&
          !originalRequest._retry
        ) {
          const refreshToken = await loadRefreshToken();
          if (refreshToken) {
            try {
              const response = await api.post('/auth/refresh-user', {
                refreshToken: refreshToken,
              });
              const {id, email, username, newAccessToken, newRefreshToken} =
                response.data;

              useUserStore.getState().setUser({
                id,
                email,
                username,
                accessToken: newAccessToken,
              });
              await saveRefreshToken(newRefreshToken);
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }
              return instance(originalRequest);
            } catch (refreshError) {
              console.error('refreshError: ', refreshError);
              await removeRefreshToken();
              useUserStore.getState().logout();
            }
          }
        } else {
          await removeRefreshToken();
          useUserStore.getState().logout();
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};
