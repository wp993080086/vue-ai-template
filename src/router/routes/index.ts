/** @description 路由表汇总：meta 中的 title / requiresAuth 供守卫与菜单复用 */
import type { RouteRecordRaw } from 'vue-router'
import { baseRoutes } from './base'
import { adminRoutes } from './admin'

/** @description 全量路由表 */
export const routes: RouteRecordRaw[] = [...baseRoutes, ...adminRoutes]

/** @description 供布局侧边栏使用的菜单项（取自路由表，避免两处维护） */
export const menuRoutes = (adminRoutes[0]?.children ?? []).filter((route) => route.meta?.title)

/** @description 路由 meta.keepAlive 声明的默认缓存页面 name 列表 */
export const keepAliveRoutes = menuRoutes.filter((route) => route.meta?.keepAlive).map((route) => String(route.name))
