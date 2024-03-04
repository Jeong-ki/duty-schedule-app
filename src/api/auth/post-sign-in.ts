import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {SignInResponse} from './types';
import {AxiosError} from 'axios';
import {ObjType} from '@/types';

const signInUser = async (signInData: ObjType): Promise<SignInResponse> => {
  return (await api.post<SignInResponse>('/auth/signIn', signInData)).data;
};

export const useSignInUser = (
  options?: UseMutationOptions<SignInResponse, AxiosError, ObjType>,
) => {
  return useMutation({
    mutationFn: signInUser,
    ...options,
  });
};
