/** @description 公共路由：无需登录即可访问 */
import type { RouteRecordRaw } from 'vue-router'

export const baseRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/pages/login/index.vue'),
		meta: { title: '登录' }
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('@/pages/error/NotFound/index.vue'),
		meta: { title: '页面不存在' }
	}
]
