/** @description 请求/响应拦截器：按后端约定调整 */
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
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

/** @description 响应拦截：统一处理业务码，非成功码抛错 */
export function responseInterceptor(response: AxiosResponse<IResponse>) {
	const body = response.data
	if (body.code !== 0) {
		throw new Error(body.message || '请求失败')
	}
	return body.data
}

/** @description 响应异常拦截：统一错误提示，401 清除登录态并跳转登录页 */
export function responseErrorInterceptor(error: TAny, router: { push: (to: string) => void }) {
	if (error.response?.status === 401) {
		localStorage.removeItem(APP.tokenKey)
		router.push('/login')
	}
	return Promise.reject(error)
}

/** @description 注册全部拦截器 */
export function setupInterceptors(instance: AxiosInstance, router: { push: (to: string) => void }) {
	instance.interceptors.request.use(requestInterceptor)
	instance.interceptors.response.use(responseInterceptor, (error) => responseErrorInterceptor(error, router))
}
