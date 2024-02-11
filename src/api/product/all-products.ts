import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import {api} from '../instance';
import {Product} from './product-type';
import {AxiosError} from 'axios';
import {productKeyFactory} from '../key-factory';

export const getAllProducts = async () => {
  return (await api.get<Array<Product>>('/products')).data;
};

export const useGetAllProducts = (
  options?: UseQueryOptions<
    Array<Product>,
    AxiosError,
    Array<Product>,
    readonly [string]
  >,
) => {
  return useQuery({
    queryKey: [...productKeyFactory.products],
    queryFn: getAllProducts,
    ...options,
  });
};
