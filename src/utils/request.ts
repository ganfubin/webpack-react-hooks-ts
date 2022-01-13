import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import qs from 'qs'
import runtime from '../runtime';
import {getErrorMsgByCode} from "./getErrorMsgByCode";

const baseURL = ''
export const SUCCESS = 0;
export const UNAUTHORIZED = 401;

export const request = <T = any>(options: AxiosRequestConfig): Promise<AxiosResponse<standard.PartialResponse<T>>> => {
  options.headers = {
    ...options.headers,
    Authorization: '',
  }

  const config: AxiosRequestConfig = {
    baseURL,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    ...options,
  }

  return Axios(config);
}

export const unauthorizedHandler = (axiosError?: AxiosError): void => {
  if (axiosError?.response?.status === UNAUTHORIZED) {
    window.location.href = `${runtime.baseName}/login` ;
  }
}

export const standardErrorHandler = (axiosError?: AxiosError, axiosRes?: AxiosResponse<standard.PartialResponse<any>>): Error | undefined => {
  if (axiosError) return new Error(getErrorMsgByCode(axiosError.response?.status));
  if (axiosRes && axiosRes.data.code !== SUCCESS) return new Error(axiosRes.data.msg ?? '未知错误');

  return undefined;
}