import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {SignIn} from './types';
import {AxiosError} from 'axios';
import {ObjType} from '@/types';

const signInUser = async (signInData: ObjType): Promise<SignIn> => {
  return (await api.post<SignIn>('/auth/signIn', signInData)).data;
};

export const useSignInUser = (
  options?: UseMutationOptions<SignIn, AxiosError, ObjType>,
) => {
  return useMutation({
    mutationFn: signInUser,
    ...options,
  });
};
