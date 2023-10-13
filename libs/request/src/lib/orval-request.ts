// custom-instance.ts

import Axios, {
	AxiosRequestConfig,
	AxiosError,
	InternalAxiosRequestConfig,
	AxiosInstance,
	AxiosResponse,
	Method,
} from 'axios';

import { getAuthOinState } from '@oin/store';
import { BASE_URL } from './config';

export interface ResponseData {
	data: { [key: string]: any };
	statusCode: number;
	msg: string;
}

export const AXIOS_INSTANCE = Axios.create({ baseURL: BASE_URL }); // use your own URL here or environment variable

AXIOS_INSTANCE.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	// const token = localStorage.getItem('oin-token') || '';
	const token = getAuthOinState('oin-token');
	const { headers } = config;

	if (!!token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return Promise.resolve(config);
});

AXIOS_INSTANCE.interceptors.response.use(
	(response: AxiosResponse<any, any>) => {
		console.log('response', response);
		if (response.status === 400) {
			return Promise.reject(response.data.message);
		}

		if (response.status === 403) {
			// todo 清理所有的记录内容
			window.location.href = '/login';
		}

		const { data } = response;
		if (data.statusCode > 201) {
			return Promise.reject(data.message);
		}

		return onResponseData(response);
	},
	(error: AxiosError) => {
		console.log('Axions Error  >>>>>> Error::::', error);
	},
);

// _______________________________________________________________________________________
// handl response data
export const onResponseData = (response: AxiosResponse<ResponseData>): Promise<any> => {
	if (!response) {
		return Promise.reject('response is null');
	}
	console.log('response>>>>', response);
	const { data } = response;

	return Promise.resolve(data);
};

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
	config: AxiosRequestConfig,
	options?: AxiosRequestConfig,
): Promise<T> => {
	const source = Axios.CancelToken.source();
	const promise = AXIOS_INSTANCE({
		...config,
		...options,
		cancelToken: source.token,
	}).then(({ data }) => data);

	// @ts-ignore
	promise.cancel = () => {
		source.cancel('Query was cancelled');
	};

	return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
