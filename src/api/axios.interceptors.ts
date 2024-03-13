import {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await EncryptedStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError | Error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => response,
    // async (response: AxiosResponse) => {
    //   const userInfo = await EncryptedStorage.getItem('userInfo');
    //   if (response.data.code === 401) {
    //     if (userInfo && response.data.message === 'Token has expired') {
    //       const curUserInfo = JSON.parse(userInfo);
    //       if (!isRefreshing) {
    //         isRefreshing = true;
    //         try {
    //           const res = await instance.post('/auth/refresh-token', {
    //             refreshToken: curUserInfo.refreshToken,
    //           });
    //           const {newAccessToken, newRefreshToken} = res.data;
    //           console.log('newAccessToken', newAccessToken);

    //           const newUserInfo = {
    //             ...curUserInfo,
    //             accessToken: newAccessToken,
    //             refreshToken: newRefreshToken,
    //           };
    //           EncryptedStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    //           response.config.headers.Authorization = `Bearer ${newAccessToken}`;
    //           return axios.request(response.config);
    //         } catch (refreshError) {
    //           const formattedError = {
    //             message: 'Refresh Token renewal failed',
    //             originalError: refreshError,
    //           };
    //           return Promise.reject(formattedError);
    //         } finally {
    //           isRefreshing = false;
    //         }
    //       }
    //     } else {
    //       await EncryptedStorage.removeItem('userInfo');
    //       // TODO: 로그아웃
    //     }
    //   }
    //   return response;
    // },
    // async (error: AxiosError | Error) => {
    //   if (axios.isAxiosError(error)) {
    //     return Promise.reject({...error, isAxiosError: true});
    //   }
    //   return Promise.reject(error);
    // },
    async (error: AxiosError | Error) => {
      if (
        isAxiosError(error) &&
        error.response?.status === 401 &&
        !error.config?._retry
      ) {
        const originalRequest = error.config;
        if (originalRequest) {
          originalRequest._retry = true;
          const refreshToken = await EncryptedStorage.getItem('refreshToken');

          return instance
            .post('/auth/refresh-token', {
              refreshToken,
            })
            .then(res => {
              if (res.status === 200) {
                EncryptedStorage.setItem('token', res.data.token);
                EncryptedStorage.setItem('refreshToken', res.data.refreshToken);
                instance.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
                originalRequest.headers.Authorization = `Bearer ${res.data.token}`;

                return instance(originalRequest);
              }
            })
            .catch(refreshError => {
              // TODO: logout
              EncryptedStorage.removeItem('token');
              EncryptedStorage.removeItem('refreshToken');

              const formattedError = {
                message: 'Refresh Token renewal failed',
                originalError: refreshError,
              };
              return Promise.reject(formattedError);
            });
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};
