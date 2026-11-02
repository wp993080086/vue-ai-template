/** @description 响应式断点判断：用于布局在移动端 / 桌面端之间切换 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** @description 移动端最大宽度（与 styles/common.scss 的 $breakpoint-md 保持一致） */
const MOBILE_MAX_WIDTH = 767

export function useMediaQuery(query: string) {
	const media = window.matchMedia(query)
	const matches = ref(media.matches)

	const update = (e: MediaQueryListEvent) => {
		matches.value = e.matches
	}

	onMounted(() => media.addEventListener('change', update))
	onBeforeUnmount(() => media.removeEventListener('change', update))

	return matches
}

/** @description 是否为移动端视口 */
export function useIsMobile() {
	return useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
}
