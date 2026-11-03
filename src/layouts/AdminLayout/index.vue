<script setup lang="ts">
/** 后台布局：桌面端固定侧边栏 + 顶栏；移动端侧边栏改为抽屉 */
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { keepAliveRoutes } from '@/router'
import AppIcon from '@/components/AppIcon.vue'
import AppSider from '@/layouts/AppSider/index.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const app = useAppStore()
const isMobile = useIsMobile()

const drawerOpen = ref(false)
const collapsed = ref(false)

/** 缓存的页面 name：路由 meta 声明的默认值 + store 运行时动态追加，去重 */
const cachedNames = computed(() => [...new Set([...keepAliveRoutes, ...app.cachedNames])])

/** 移动端点击菜单后自动收起抽屉 */
watch(
	() => route.fullPath,
	() => (drawerOpen.value = false)
)

function handleLogout() {
	user.logout()
	router.push('/login')
}
</script>

<template>
	<div class="layout">
		<!-- 桌面端：常驻侧边栏 -->
		<div v-if="!isMobile" class="layout__sider">
			<AppSider :collapsed="collapsed" />
		</div>

		<!-- 移动端：抽屉式侧边栏 -->
		<template v-else>
			<div v-show="drawerOpen" class="layout__mask" @click="drawerOpen = false" />
			<div class="layout__drawer" :class="{ 'layout__drawer--open': drawerOpen }">
				<AppSider :collapsed="false" @navigate="drawerOpen = false" />
			</div>
		</template>

		<div class="layout__main">
			<header class="header">
				<div class="header__left">
					<button
						class="header__icon-btn"
						type="button"
						:title="isMobile ? '菜单' : '折叠侧边栏'"
						@click="isMobile ? (drawerOpen = !drawerOpen) : (collapsed = !collapsed)"
					>
						<AppIcon name="menu" />
					</button>
					<h1 class="header__title">{{ route.meta.title }}</h1>
				</div>

				<div class="header__right">
					<ThemeToggle />
					<span class="header__user">{{ user.userInfo?.name || '未登录' }}</span>
					<button class="header__icon-btn" type="button" title="退出登录" @click="handleLogout">
						<AppIcon name="logout" />
					</button>
				</div>
			</header>

			<main class="layout__content">
				<router-view v-slot="{ Component }">
					<transition :name="app.anim" mode="out-in">
						<keep-alive :include="cachedNames">
							<component :is="Component" />
						</keep-alive>
					</transition>
				</router-view>
			</main>
		</div>
	</div>
</template>

<style src="./style.scss" lang="scss" scoped></style>
