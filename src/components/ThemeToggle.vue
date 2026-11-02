<script setup lang="ts">
/** 主题切换：循环切换 跟随系统 → 浅色 → 深色 */
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import AppIcon from './AppIcon.vue'

const theme = useThemeStore()

const modes: TThemeMode[] = ['auto', 'light', 'dark']
const label = computed(() => ({ auto: '跟随系统', light: '浅色', dark: '深色' })[theme.mode])

function toggle() {
	theme.setMode(modes[(modes.indexOf(theme.mode) + 1) % modes.length])
}
</script>

<template>
	<button class="theme-toggle" type="button" :title="`当前：${label}`" @click="toggle">
		<AppIcon :name="theme.isDark ? 'moon' : 'sun'" />
		<span class="theme-toggle__label">{{ label }}</span>
	</button>
</template>

<style lang="scss" scoped>
.theme-toggle {
	@include flex_center;
	gap: 6px;
	padding: 6px 10px;
	border: 1px solid var(--color-border);
	border-radius: 6px;
	background-color: var(--color-bg-elevated);
	color: var(--color-text-secondary);
	transition:
		color 0.2s ease,
		border-color 0.2s ease;

	.theme-toggle__label {
		font-size: 13px;

		@include mobile {
			display: none;
		}
	}
}

.theme-toggle:hover {
	border-color: var(--color-primary);
	color: var(--color-primary);
}
</style>
