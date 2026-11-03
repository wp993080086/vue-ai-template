/** @description 请求拦截器：按后端约定调整 */
import type { InternalAxiosRequestConfig } from 'axios'
import { ENV } from '@/config/env'
import { APP } from '@/config/constants'

/** @description 后端统一响应结构，按实际接口约定调整 */
export interface IResponse<T = TAny> {
	code: number
	message: string
	data: T
}

/** @description 请求拦截：注入 baseUrl、公共请求头、token */
export function requestInterceptor(config: InternalAxiosRequestConfig) {
	const token = localStorage.getItem(APP.tokenKey)
	config.baseURL = ENV.baseUrl
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
}
