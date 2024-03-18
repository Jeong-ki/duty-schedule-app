import {api} from '../axios.instance';
import {RefreshUser} from './types';

export const refreshUser = async (
  refreshToken: string,
): Promise<RefreshUser> => {
  return (await api.post<RefreshUser>('/auth/refresh-user', {refreshToken}))
    .data;
};
