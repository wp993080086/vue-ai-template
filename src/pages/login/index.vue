<script setup lang="ts">
/** 登录页：模板内置 mock 登录，任意非空账号密码即可进入 */
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ENV } from '@/config/env'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const username = ref('admin')
const password = ref('123456')
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
	error.value = ''
	loading.value = true
	try {
		await user.login({ username: username.value, password: password.value })
		router.push((route.query.redirect as string) || '/')
	} catch (err) {
		error.value = err instanceof Error ? err.message : '登录失败'
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div class="login">
		<form class="login__card" @submit.prevent="handleSubmit">
			<h1 class="login__title">{{ ENV.title }}</h1>
			<p class="login__subtitle">后台管理系统模板</p>

			<label class="login__field">
				<span class="login__label">账号</span>
				<input v-model="username" class="login__input" type="text" placeholder="请输入账号" autocomplete="username" />
			</label>

			<label class="login__field">
				<span class="login__label">密码</span>
				<input v-model="password" class="login__input" type="password" placeholder="请输入密码" autocomplete="current-password" />
			</label>

			<p v-if="error" class="login__error">{{ error }}</p>

			<button class="login__submit" type="submit" :disabled="loading">
				{{ loading ? '登录中...' : '登 录' }}
			</button>

			<p class="login__tip">模板演示：任意非空账号密码均可登录</p>
		</form>
	</div>
</template>

<style lang="scss" scoped>
.login {
	@include flex_center;
	width: 100%;
	height: 100%;
	padding: 16px;
	background-color: var(--color-bg);

	.login__card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
		max-width: 380px;
		padding: 32px 28px;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background-color: var(--color-bg-elevated);
		box-shadow: var(--shadow-md);
	}

	.login__title {
		font-size: 22px;
		font-weight: 600;
	}

	.login__subtitle {
		margin-top: -10px;
		color: var(--color-text-muted);
		font-size: 13px;
	}

	.login__field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.login__label {
		color: var(--color-text-secondary);
		font-size: 13px;
	}

	.login__input {
		height: 40px;
		padding: 0 12px;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background-color: var(--color-bg);
		outline: none;
		transition: border-color 0.2s ease;
	}

	.login__input:focus {
		border-color: var(--color-primary);
	}

	.login__error {
		color: var(--color-danger);
		font-size: 13px;
	}

	.login__submit {
		height: 42px;
		border: none;
		border-radius: 8px;
		background-color: var(--color-primary);
		color: #fff;
		font-size: 15px;
		transition: background-color 0.2s ease;
	}

	.login__submit:hover:not(:disabled) {
		background-color: var(--color-primary-hover);
	}

	.login__submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.login__tip {
		color: var(--color-text-muted);
		font-size: 12px;
		text-align: center;
	}
}
</style>
