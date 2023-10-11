/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-07-17 14:23:22
 * @LastEditTime: 2023-10-11 10:50:16
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/libs/request/src/lib/request.ts
 */
import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  Method,
} from 'axios';
// import { useSettingStore } from '~/stores';
import * as qs from 'qs';
import { BASE_URL } from './config';
import { getAuthOinState } from '@oin/store';

/** post types */
declare const postTypes: ['json', 'formData', 'file'];
export type PostType = typeof postTypes[number];

/** put types */
declare const putTypes: ['json', 'formData', 'file'];
export type PutType = typeof putTypes[number];

/** delete types */
declare const deleteTypes: ['json', 'formData'];
export type DeleteType = typeof deleteTypes[number];

export const defaultRequestConfig: Partial<InternalAxiosRequestConfig> = {
  baseURL: BASE_URL, //  todo add the base url
  timeout: 1000 * 60,
  withCredentials: false,
};

export interface ResponseData {
  data: { [key: string]: any };
  statusCode: number;
  msg: string;
}

class RequestHttp {
  public axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create(defaultRequestConfig);
    this.injectInstance();
  }

  public injectInstance() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // const token = localStorage.getItem('oin-token') || '';
        const token = getAuthOinState('oin-token');
        const { headers } = config;

        if (!!token) {
          headers.Authorization = `Bearer ${token}`;
        }

        console.log('headers', headers)
        return Promise.resolve(config);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any, any>) => {
        if (response.status === 400) {
          return Promise.reject(response.data.message);
        }

        if (response.status === 403) {
          // todo 清理所有的记录内容
          window.location.href = '/login';
        }

        const { data } = response;
        console.log('data.statusCode  > 201', data.statusCode > 201);
        if (data.statusCode > 201) {
          return Promise.reject(data.message);
        }

        return onResponseData(response);
      },
      (error: AxiosError) => {
        console.log('Axions Error  >>>>>> Error::::', error);
      }
    );
  }

  private base(
    url: string,
    method: Method,
    option?: AxiosRequestConfig,
    type: PostType = 'json'
  ) {
    const newOptions = Object.assign({}, option, {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (type === 'formData') {
      newOptions.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      newOptions.transformRequest = [
        (data: any) => {
          return qs.stringify(data, { indices: false });
        },
      ];
    } else if (type === 'file') {
      newOptions.headers = { 'Content-Type': 'multipart/form-data' };
    }

    const result = {
      ...newOptions,
      params: objEmptyValueFilter(newOptions.params),
    };

    return result;
  }

  // 以 get 方法请求数据
  public get(
    url: string,
    params?: any,
    option?: AxiosRequestConfig
  ): Promise<ResponseData> {
    return this.axiosInstance.request(
      this.base(url, 'get', { params, ...option })
    );
  }

  // 以 post 方法请求数据
  public post(
    url: string,
    data?: any,
    option?: AxiosRequestConfig,
    type: PostType = 'json'
  ): Promise<ResponseData> {
    return this.axiosInstance.request(
      this.base(url, 'post', { data, ...option }, type)
    );
  }

  public put(
    url: string,
    data?: any,
    option?: AxiosRequestConfig,
    type: PutType = 'json'
  ): Promise<ResponseData> {
    return this.axiosInstance.request(
      this.base(url, 'put', { data, ...option }, type)
    );
  }

  public delete(
    url: string,
    data?: any,
    option?: AxiosRequestConfig,
    type: DeleteType = 'formData'
  ): Promise<ResponseData> {
    return this.axiosInstance.request(
      this.base(url, 'delete', { data, ...option }, type)
    );
  }
}

export const request = new RequestHttp();

// _______________________________________________________________________________________
// handl response data
export const onResponseData = (
  response: AxiosResponse<ResponseData>
): Promise<any> => {
  if (!response) {
    return Promise.reject('response is null');
  }

  const { data } = response;

  return Promise.resolve(data);
};

// remove the empty value
export const objEmptyValueFilter = (obj: Record<string, any>) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return obj;
  }

  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
      result[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
    }
  }
  return result;
};
