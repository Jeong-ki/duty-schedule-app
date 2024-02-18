import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {SignInData, SignInResponse} from './types';
import {AxiosError} from 'axios';

const signInUser = async (signInData: SignInData): Promise<SignInResponse> => {
  return (await api.post<SignInResponse>('/auth/signIn', signInData)).data;
};

export const useSignInUser = (
  options?: UseMutationOptions<SignInResponse, AxiosError, SignInData>,
) => {
  return useMutation({
    mutationFn: signInUser,
    ...options,
  });
};
