/** @description 登录态 store：模板内置 mock 登录，接入真实接口时替换 login 实现 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { APP } from '@/config/constants'
import { login as loginApi } from '@/apis/api/user'
import type { ILoginParams, IUserInfo } from '@/apis/api/user'

export const useUserStore = defineStore('user', () => {
	const token = ref(localStorage.getItem(APP.tokenKey) || '')
	const userInfo = ref<IUserInfo | null>(null)

	const isLogin = computed(() => Boolean(token.value))

	function setToken(value: string) {
		token.value = value
		localStorage.setItem(APP.tokenKey, value)
	}

	/** @description 登录：模板默认走 mock，改为 loginApi(params) 即接入真实接口 */
	async function login(params: ILoginParams) {
		void loginApi
		if (!params.username || !params.password) {
			throw new Error('请输入账号和密码')
		}
		setToken(`mock-token-${Date.now()}`)
		userInfo.value = { id: 1, name: params.username, avatar: '' }
	}

	function logout() {
		token.value = ''
		userInfo.value = null
		localStorage.removeItem(APP.tokenKey)
	}

	return { token, userInfo, isLogin, login, logout }
})
