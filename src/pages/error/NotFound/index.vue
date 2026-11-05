<script setup lang="ts">
/** 404 页面 */
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
	<div class="not-found">
		<p class="not-found__code">404</p>
		<p class="not-found__text">抱歉，你访问的页面不存在</p>
		<button class="not-found__btn" type="button" @click="router.push('/')">返回首页</button>
	</div>
</template>

<style lang="scss" scoped>
.not-found {
	@include flex_center;
	flex-direction: column;
	gap: 12px;
	width: 100%;
	height: 100%;
	background-color: var(--color-bg);

	.not-found__code {
		color: var(--color-primary);
		font-size: 64px;
		font-weight: 700;
	}

	.not-found__text {
		color: var(--color-text-secondary);
	}

	.not-found__btn {
		margin-top: 8px;
		padding: 8px 20px;
		border: none;
		border-radius: 8px;
		background-color: var(--color-primary);
		color: #fff;
	}

	.not-found__btn:hover {
		background-color: var(--color-primary-hover);
	}
}
</style>
