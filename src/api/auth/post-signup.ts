import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {SignUpData, SignUpResponse} from './types';
import {AxiosError} from 'axios';

const signupUser = async (signupData: SignUpData): Promise<SignUpResponse> => {
  return (await api.post<SignUpResponse>('/auth/signup', signupData)).data;
};

export const useSignupUser = (
  options?: UseMutationOptions<SignUpResponse, AxiosError, SignUpData>,
) => {
  return useMutation({
    mutationFn: signupUser,
    ...options,
  });
};
