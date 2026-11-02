/** @description 路由表：meta 中的 title / requiresAuth 供守卫与菜单复用 */
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ENV } from '@/config/env'
import { setupRouterGuard } from './guard'

export const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/pages/login/index.vue'),
		meta: { title: '登录' }
	},
	{
		path: '/',
		component: () => import('@/layouts/AdminLayout.vue'),
		redirect: '/dashboard',
		meta: { requiresAuth: true },
		children: [
			{
				path: 'dashboard',
				name: 'dashboard',
				component: () => import('@/pages/dashboard/index.vue'),
				meta: { title: '仪表盘', icon: 'dashboard' }
			},
			{
				path: 'users',
				name: 'users',
				component: () => import('@/pages/users/index.vue'),
				meta: { title: '用户管理', icon: 'users' }
			},
			{
				path: 'settings',
				name: 'settings',
				component: () => import('@/pages/settings/index.vue'),
				meta: { title: '系统设置', icon: 'settings' }
			}
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('@/pages/error/404.vue'),
		meta: { title: '页面不存在' }
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior: () => ({ top: 0 })
})

setupRouterGuard(router)

export default router

/** @description 供布局侧边栏使用的菜单项（取自路由表，避免两处维护） */
export const menuRoutes = (routes.find((route) => route.path === '/')?.children ?? []).filter((route) => route.meta?.title)

/** @description 同步页面标题 */
export function setPageTitle(title?: string) {
	document.title = title ? `${title} - ${ENV.title}` : ENV.title
}
