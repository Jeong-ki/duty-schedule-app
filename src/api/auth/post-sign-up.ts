import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {SignUpData, SignUpResponse} from './types';
import {AxiosError} from 'axios';

const signUpUser = async (signUpData: SignUpData): Promise<SignUpResponse> => {
  return (await api.post<SignUpResponse>('/auth/signUp', signUpData)).data;
};

export const useSignUpUser = (
  options?: UseMutationOptions<SignUpResponse, AxiosError, SignUpData>,
) => {
  return useMutation({
    mutationFn: signUpUser,
    ...options,
  });
};
