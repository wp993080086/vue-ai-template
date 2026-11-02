import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// 单测独立配置：不加载全局 scss 注入，避免测试环境解析样式变量
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	test: {
		environment: 'happy-dom',
		globals: true,
		include: ['src/**/*.{test,spec}.{ts,js}'],
		// 模板初始无测试文件，避免空跑报错
		passWithNoTests: true
	}
})
