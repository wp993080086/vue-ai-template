/// <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, TAny>
	export default component
}

interface ImportMetaEnv {
	/** @description 应用标题 */
	readonly VITE_TITLE: string
	/** @description 接口基础地址 */
	readonly VITE_BASE_URL: string
}
interface ImportMeta {
	readonly env: ImportMetaEnv
}
