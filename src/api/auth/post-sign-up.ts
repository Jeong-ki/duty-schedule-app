import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {api} from '../axios.instance';
import {SignUp} from './types';
import {AxiosError} from 'axios';
import {ObjType} from '@/types';

const signUpUser = async (signUpData: ObjType): Promise<SignUp> => {
  return (await api.post<SignUp>('/auth/signUp', signUpData)).data;
};

export const useSignUpUser = (
  options?: UseMutationOptions<SignUp, AxiosError, ObjType>,
) => {
  return useMutation({
    mutationFn: signUpUser,
    ...options,
  });
};
