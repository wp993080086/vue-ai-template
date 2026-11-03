<script setup lang="ts">
/** 系统设置：演示「主题切换 + 表单控件」的组织方式 */
import { ENV } from '@/config/env'
import { animOptions, useAppStore } from '@/stores/app'
import { useThemeStore } from '@/stores/theme'

/** 组件名与路由 name 保持一致，供 keep-alive include 匹配 */
defineOptions({ name: 'Settings' })

const theme = useThemeStore()
const app = useAppStore()

const options: { value: TThemeMode; label: string; desc: string }[] = [
	{ value: 'auto', label: '跟随系统', desc: '跟随操作系统的深浅色设置自动切换' },
	{ value: 'light', label: '浅色', desc: '始终使用浅色主题' },
	{ value: 'dark', label: '深色', desc: '始终使用深色主题' }
]
</script>

<template>
	<div class="settings">
		<section class="card settings__block">
			<h2 class="settings__title">外观</h2>
			<p class="settings__desc">主题选择会保存在本地，刷新后依然生效。</p>

			<div class="settings__options">
				<label v-for="item in options" :key="item.value" class="settings__option" :class="{ 'settings__option--active': theme.mode === item.value }">
					<input v-model="theme.mode" type="radio" :value="item.value" name="theme" />
					<span class="settings__option-body">
						<span class="settings__option-label">{{ item.label }}</span>
						<span class="settings__option-desc">{{ item.desc }}</span>
					</span>
				</label>
			</div>
		</section>

		<section class="card settings__block">
			<h2 class="settings__title">页面切换动画</h2>
			<p class="settings__desc">选择路由切换时的过渡效果，选择结果会保存在本地。</p>

			<div class="settings__options settings__options--compact">
				<label
					v-for="item in animOptions"
					:key="item.value"
					class="settings__option"
					:class="{ 'settings__option--active': app.anim === item.value }"
				>
					<input v-model="app.anim" type="radio" :value="item.value" name="anim" />
					<span class="settings__option-body">
						<span class="settings__option-label">{{ item.label }}</span>
					</span>
				</label>
			</div>
		</section>

		<section class="card settings__block">
			<h2 class="settings__title">系统信息</h2>
			<ul class="settings__info">
				<li>
					<span>应用名称</span><span>{{ ENV.title }}</span>
				</li>
				<li>
					<span>运行环境</span><span>{{ ENV.mode }}</span>
				</li>
				<li>
					<span>接口地址</span><span>{{ ENV.baseUrl }}</span>
				</li>
			</ul>
		</section>
	</div>
</template>

<style src="./style.scss" lang="scss" scoped></style>
