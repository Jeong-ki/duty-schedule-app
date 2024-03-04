import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const {BASE_URL, IOS_BASE_URL, ANDROID_BASE_URL} = Config;

export const api: AxiosInstance = axios.create({
  baseURL: !__DEV__
    ? BASE_URL // FIXME: 백엔드 배포 후 base url만 적용
    : Platform.OS === 'ios'
    ? IOS_BASE_URL
    : ANDROID_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});
