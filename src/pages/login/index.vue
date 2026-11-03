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

<style src="./style.scss" lang="scss" scoped></style>
