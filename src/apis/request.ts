/** @description 统一请求封装：axios 实例 + 拦截器注册，业务接口放 src/apis/api/ */
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { APP } from '@/config/constants'
import { setupInterceptors } from './interceptors'

/** @description 路由跳转能力由 main.ts 注入，避免请求层直接依赖路由实例 */
type TRouterLike = { push: (to: string) => void }

let routerRef: TRouterLike = { push: () => {} }

export const http = axios.create({
	timeout: APP.timeout,
	headers: { 'Content-Type': 'application/json' }
})

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
