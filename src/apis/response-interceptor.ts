/** @description 响应拦截器：按后端约定调整 */
import type { AxiosResponse } from 'axios'
import { APP } from '@/config/constants'
import type { IResponse } from './request-interceptor'

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
