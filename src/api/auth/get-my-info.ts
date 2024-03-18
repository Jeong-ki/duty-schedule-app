import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import {tokenApi} from '../axios.instance';
import {MyInfo} from './types';
import {AxiosError} from 'axios';
import {authKeyFactory} from './key-factory';

type UseGetMyInfoOptions = Omit<
  UseQueryOptions<MyInfo, AxiosError, MyInfo, readonly [string]>,
  'queryKey'
>;

export const getMyInfo = async () => {
  return (await tokenApi.get<MyInfo>('/auth/my')).data;
};

export const useGetMyInfo = (options?: UseGetMyInfoOptions) => {
  return useQuery({
    queryKey: [...authKeyFactory.myInfo],
    queryFn: getMyInfo,
    ...options,
  });
};
