<script setup lang="ts">
/** 后台布局：桌面端固定侧边栏 + 顶栏；移动端侧边栏改为抽屉 */
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useUserStore } from '@/stores/user'
import AppIcon from '@/components/AppIcon.vue'
import AppSider from '@/components/AppSider.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const isMobile = useIsMobile()

const drawerOpen = ref(false)
const collapsed = ref(false)

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
				<router-view />
			</main>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.layout {
	display: flex;
	width: 100%;
	height: 100%;
	overflow: hidden;

	.layout__sider {
		height: 100%;
	}

	.layout__mask {
		position: fixed;
		inset: 0;
		z-index: $z-mask;
		background-color: rgb(0 0 0 / 45%);
	}

	.layout__drawer {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: $z-drawer;
		transform: translateX(-100%);
		transition: transform 0.25s ease;
	}

	.layout__drawer--open {
		transform: translateX(0);
	}

	.layout__main {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
		height: 100%;
	}

	.layout__content {
		flex: 1;
		padding: 20px;
		overflow-y: auto;

		@include mobile {
			padding: 12px;
		}
	}
}

.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-shrink: 0;
	height: 56px;
	padding: 0 16px;
	border-bottom: 1px solid var(--color-border);
	background-color: var(--color-bg-elevated);

	.header__left,
	.header__right {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
	}

	.header__title {
		@include omit;
		font-size: 16px;
		font-weight: 600;
	}

	.header__user {
		@include omit;
		max-width: 140px;
		color: var(--color-text-secondary);
		font-size: 14px;

		@include mobile {
			display: none;
		}
	}

	.header__icon-btn {
		@include flex_center;
		width: 34px;
		height: 34px;
		border: none;
		border-radius: 6px;
		background-color: transparent;
		color: var(--color-text-secondary);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.header__icon-btn:hover {
		background-color: var(--color-bg-muted);
		color: var(--color-text);
	}
}
</style>
