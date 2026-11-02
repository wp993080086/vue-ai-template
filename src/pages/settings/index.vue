<script setup lang="ts">
/** 系统设置：演示「主题切换 + 表单控件」的组织方式 */
import { ENV } from '@/config/env'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

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

<style lang="scss" scoped>
.settings {
	display: flex;
	flex-direction: column;
	gap: 16px;

	.settings__block {
		padding: 16px;
	}

	.settings__title {
		font-size: 15px;
		font-weight: 600;
	}

	.settings__desc {
		margin-top: 6px;
		color: var(--color-text-muted);
		font-size: 13px;
	}

	.settings__options {
		display: grid;
		gap: 12px;
		margin-top: 16px;
		grid-template-columns: repeat(3, minmax(0, 1fr));

		@include mobile {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.settings__option {
		display: flex;
		gap: 10px;
		padding: 12px;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		cursor: pointer;
		transition: border-color 0.2s ease;

		input {
			margin-top: 3px;
			accent-color: var(--color-primary);
		}
	}

	.settings__option--active {
		border-color: var(--color-primary);
	}

	.settings__option-body {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.settings__option-label {
		font-size: 14px;
	}

	.settings__option-desc {
		color: var(--color-text-muted);
		font-size: 12px;
	}

	.settings__info {
		margin-top: 12px;
		font-size: 14px;

		li {
			display: flex;
			justify-content: space-between;
			gap: 16px;
			padding: 10px 0;
			border-bottom: 1px solid var(--color-border);

			&:last-child {
				border-bottom: none;
			}

			span:first-child {
				color: var(--color-text-secondary);
			}

			span:last-child {
				@include omit;
				max-width: 60%;
				text-align: right;
			}
		}
	}
}
</style>
