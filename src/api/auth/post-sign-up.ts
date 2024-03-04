import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {SignUpResponse} from './types';
import {AxiosError} from 'axios';
import {ObjType} from '@/types';

const signUpUser = async (signUpData: ObjType): Promise<SignUpResponse> => {
  return (await api.post<SignUpResponse>('/auth/signUp', signUpData)).data;
};

export const useSignUpUser = (
  options?: UseMutationOptions<SignUpResponse, AxiosError, ObjType>,
) => {
  return useMutation({
    mutationFn: signUpUser,
    ...options,
  });
};
