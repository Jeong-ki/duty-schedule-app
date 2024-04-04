import {api} from '../axios.instance';
import {IRefreshUser} from './types';

export const refreshUser = async (
  refreshToken: string,
): Promise<IRefreshUser> => {
  return (await api.post<IRefreshUser>('/auth/refresh-user', {refreshToken}))
    .data;
};
