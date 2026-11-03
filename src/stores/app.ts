/** @description 应用偏好：路由过渡动画名 + keep-alive 运行时缓存名单 */
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { APP } from '@/config/constants'

const ANIMS: TAnimName[] = ['none', 'fade', 'slide', 'zoom']

export const useAppStore = defineStore('app', () => {
	/** @description 路由过渡动画名，非法值回退为 fade */
	const anim = ref<TAnimName>(
		ANIMS.includes(localStorage.getItem(APP.animKey) as TAnimName) ? (localStorage.getItem(APP.animKey) as TAnimName) : 'fade'
	)

	watch(anim, () => localStorage.setItem(APP.animKey, anim.value))

	/** @description 运行时额外加入缓存的页面 name（配合路由 meta.keepAlive 使用） */
	const cachedNames = ref<string[]>([])

	/** @description 缓存名单：meta 声明的默认值 + 运行时动态追加，去重 */
	function addCache(name?: string) {
		if (name && !cachedNames.value.includes(name)) cachedNames.value.push(name)
	}

	/** @description 移除缓存：同时从运行时名单剔除并销毁已缓存的组件实例 */
	function removeCache(name: string) {
		cachedNames.value = cachedNames.value.filter((item) => item !== name)
	}

	function setAnim(value: TAnimName) {
		anim.value = value
	}

	return { anim, cachedNames, addCache, removeCache, setAnim }
})

/** @description 动画可选项，供设置页渲染 */
export const animOptions: { value: TAnimName; label: string }[] = [
	{ value: 'none', label: '无' },
	{ value: 'fade', label: '淡入淡出' },
	{ value: 'slide', label: '左右滑动' },
	{ value: 'zoom', label: '缩放' }
]
