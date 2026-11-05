<script setup lang="ts">
/** 侧边栏：菜单项由路由表推导；窄屏时以抽屉形式展示 */
import { menuRoutes } from '@/router'
import AppIcon from '@/components/AppIcon/index.vue'

defineProps<{ collapsed: boolean }>()
const emit = defineEmits<{ navigate: [] }>()
</script>

<template>
	<aside class="sider" :class="{ 'sider--collapsed': collapsed }">
		<div class="sider__logo">
			<span class="sider__logo-mark">V</span>
			<span v-show="!collapsed" class="sider__logo-text">Admin</span>
		</div>

		<nav class="sider__nav">
			<router-link v-for="item in menuRoutes" :key="item.path" class="sider__item" :to="`/${item.path}`" @click="emit('navigate')">
				<AppIcon :name="(item.meta?.icon as 'menu') || 'menu'" />
				<span v-show="!collapsed" class="sider__item-text">{{ item.meta?.title }}</span>
			</router-link>
		</nav>
	</aside>
</template>

<style src="./style.scss" lang="scss" scoped></style>
