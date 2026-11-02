/** @description 主题状态：mode 为用户选择，isDark 为最终生效值（auto 时跟随系统） */
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { APP } from '@/config/constants'

const media = window.matchMedia('(prefers-color-scheme: dark)')

export const useThemeStore = defineStore('theme', () => {
	const mode = ref<TThemeMode>((localStorage.getItem(APP.themeKey) as TThemeMode) || 'auto')
	const systemDark = ref(media.matches)

	/** 系统主题变化时同步（仅 auto 模式会真正影响结果） */
	media.addEventListener('change', (e) => {
		systemDark.value = e.matches
	})

	const isDark = computed(() => (mode.value === 'auto' ? systemDark.value : mode.value === 'dark'))

	/** @description 把生效主题写到 html[data-theme]，供 CSS 变量切换 */
	function apply() {
		document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
	}

	watch(
		[mode, isDark],
		() => {
			localStorage.setItem(APP.themeKey, mode.value)
			apply()
		},
		{ immediate: true }
	)

	function setMode(value: TThemeMode) {
		mode.value = value
	}

	return { mode, isDark, setMode }
})
