/** @description 示例 composable：复用逻辑以 useXxx 命名，放 hooks 目录 */
import { ref } from 'vue'

export function useToggle(initial = false) {
	const state = ref(initial)

	function toggle() {
		state.value = !state.value
	}

	return { state, toggle }
}
