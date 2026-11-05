<script setup lang="ts">
/** 主题切换：按当前实际外观翻转，避免「跟随系统」时首次点击外观无变化 */
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import AppIcon from '@/components/AppIcon/index.vue'

const theme = useThemeStore()

const label = computed(() => ({ auto: '跟随系统', light: '浅色', dark: '深色' })[theme.mode])

/** @description 当前实际为深色则切浅色，反之切深色，保证一次点击必定翻转外观 */
function toggle() {
	theme.setMode(theme.isDark ? 'light' : 'dark')
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
