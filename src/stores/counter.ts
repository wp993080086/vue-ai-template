/** @description 示例 store：组合式写法，替换为业务状态 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
	const count = ref(0)

	function increment() {
		count.value++
	}

	return { count, increment }
})
