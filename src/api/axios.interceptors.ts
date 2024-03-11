import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const userInfo = await EncryptedStorage.getItem('userInfo');

      if (userInfo) {
        const {token} = JSON.parse(userInfo);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError | Error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use((response: AxiosResponse) => {
    console.log('response', response);
    return response;
  });
  return instance;
};
