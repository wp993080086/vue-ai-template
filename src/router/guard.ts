/** @description 全局路由守卫：登录校验 + 页面标题 */
import type { Router } from 'vue-router'
import { APP } from '@/config/constants'
import { setPageTitle } from './index'

export function setupRouterGuard(router: Router) {
	router.beforeEach((to) => {
		const token = localStorage.getItem(APP.tokenKey)
		const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

		if (requiresAuth && !token) {
			return { path: '/login', query: { redirect: to.fullPath } }
		}
		if (to.path === '/login' && token) {
			return { path: '/' }
		}
	})

	router.afterEach((to) => {
		setPageTitle(to.meta.title as string | undefined)
	})
}
