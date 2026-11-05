/** @description 后台路由：需登录，统一挂在 AdminLayout 下 */
import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/layouts/AdminLayout/index.vue'),
		redirect: '/dashboard',
		meta: { requiresAuth: true },
		children: [
			{
				path: 'dashboard',
				name: 'dashboard',
				component: () => import('@/pages/dashboard/index.vue'),
				meta: { title: '仪表盘', icon: 'dashboard', keepAlive: true }
			},
			{
				path: 'users',
				name: 'users',
				component: () => import('@/pages/users/index.vue'),
				meta: { title: '用户管理', icon: 'users', keepAlive: true }
			},
			{
				path: 'settings',
				name: 'settings',
				component: () => import('@/pages/settings/index.vue'),
				meta: { title: '系统设置', icon: 'settings' }
			}
		]
	}
]
