/** @description 统一请求封装：axios 实例 + 拦截器注册，业务接口放 src/apis/api/ */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { APP } from '@/config/constants'
import { requestInterceptor } from './request-interceptor'
import { responseInterceptor, responseErrorInterceptor } from './response-interceptor'

/** @description 路由跳转能力由 main.ts 注入，避免请求层直接依赖路由实例 */
type TRouterLike = { push: (to: string) => void }

let routerRef: TRouterLike = { push: () => {} }

export const http = axios.create({
	timeout: APP.timeout,
	headers: { 'Content-Type': 'application/json' }
})

/** @description 注册请求与响应拦截器 */
export function setupInterceptors(instance: AxiosInstance, router: TRouterLike) {
	instance.interceptors.request.use(requestInterceptor)
	instance.interceptors.response.use(responseInterceptor, (error) => responseErrorInterceptor(error, router))
}

/** @description 注入 router，供 401 等场景做跳转 */
export function injectRouter(router: TRouterLike) {
	routerRef = router
	setupInterceptors(http, router)
}

/** @description 发起请求，返回 Promise 化的业务数据 */
export function request<T = TAny>(config: AxiosRequestConfig): Promise<T> {
	return http.request(config) as unknown as Promise<T>
}

export { routerRef }
