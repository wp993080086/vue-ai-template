<script setup lang="ts">
/** 顶栏图标：内置少量线性图标，避免为模板引入图标库 */
defineProps<{ name: 'menu' | 'sun' | 'moon' | 'logout' }>()
</script>

<template>
	<svg
		class="app-icon"
		viewBox="0 0 24 24"
		width="20"
		height="20"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<template v-if="name === 'menu'">
			<path d="M3 6h18M3 12h18M3 18h18" />
		</template>
		<template v-else-if="name === 'sun'">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
		</template>
		<template v-else-if="name === 'moon'">
			<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
		</template>
		<template v-else>
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
		</template>
	</svg>
</template>

<style lang="scss" scoped>
.app-icon {
	display: block;
}
</style>
