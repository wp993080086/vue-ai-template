import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				// 全局注入公共 scss（变量 + mixin），所有组件自动可用，无需手动 @use
				additionalData: `@use "@/styles/common.scss" as *;`
			}
		}
	},
	server: {
		port: 5173,
		open: true
	}
})
