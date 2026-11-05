/** @description 路由实例：路由表见 ./routes，守卫见 ./guard */
import { createRouter, createWebHistory } from 'vue-router'
import { ENV } from '@/config/env'
import { routes } from './routes'
import { setupRouterGuard } from './guard'

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior: () => ({ top: 0 })
})

setupRouterGuard(router)

export default router

export { menuRoutes, keepAliveRoutes, routes } from './routes'

/** @description 同步页面标题 */
export function setPageTitle(title?: string) {
	document.title = title ? `${title} - ${ENV.title}` : ENV.title
}
