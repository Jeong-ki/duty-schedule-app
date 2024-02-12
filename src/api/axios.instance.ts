import axios, {AxiosInstance} from 'axios';

export const BASE_URL = 'https://fakestoreapi.com';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
