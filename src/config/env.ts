/** @description 环境配置：基于 Vite 原生 .env 文件，按 mode 自动加载 */
interface IEnv {
	/** @description 环境标识：local / production */
	mode: string
	/** @description 应用标题 */
	title: string
	/** @description 接口基础地址 */
	baseUrl: string
}

export const ENV: IEnv = {
	mode: import.meta.env.MODE,
	title: import.meta.env.VITE_TITLE,
	baseUrl: import.meta.env.VITE_BASE_URL
}
