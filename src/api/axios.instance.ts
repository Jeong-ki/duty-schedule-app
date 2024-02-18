import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';

export const IOS_BASE_URL = 'http://localhost:3000';
export const ANDROID_BASE_URL = 'http://10.0.2.2:3000';

export const api: AxiosInstance = axios.create({
  baseURL: Platform.OS === 'ios' ? IOS_BASE_URL : ANDROID_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});
