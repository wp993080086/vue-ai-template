<script setup lang="ts">
/** 仪表盘：演示数据卡片 + 简单列表，均为模板静态示例数据 */
const stats = [
	{ label: '用户总数', value: '1,286', trend: '+12%' },
	{ label: '今日访问', value: '3,942', trend: '+5%' },
	{ label: '订单数', value: '528', trend: '-2%' },
	{ label: '转化率', value: '4.8%', trend: '+0.6%' }
]

const activities = [
	{ time: '09:24', text: '用户 admin 登录了系统' },
	{ time: '10:02', text: '新增用户「张三」' },
	{ time: '11:35', text: '系统设置已更新' },
	{ time: '14:18', text: '导出报表「2026-11 用户清单」' }
]
</script>

<template>
	<div class="dashboard">
		<section class="dashboard__stats">
			<article v-for="item in stats" :key="item.label" class="card dashboard__stat">
				<p class="dashboard__stat-label">{{ item.label }}</p>
				<p class="dashboard__stat-value">{{ item.value }}</p>
				<p class="dashboard__stat-trend">{{ item.trend }}</p>
			</article>
		</section>

		<section class="card dashboard__panel">
			<h2 class="dashboard__panel-title">最近动态</h2>
			<ul>
				<li v-for="item in activities" :key="item.time" class="dashboard__activity">
					<span class="dashboard__activity-time">{{ item.time }}</span>
					<span>{{ item.text }}</span>
				</li>
			</ul>
		</section>
	</div>
</template>

<style lang="scss" scoped>
.dashboard {
	display: flex;
	flex-direction: column;
	gap: 16px;

	.dashboard__stats {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(4, minmax(0, 1fr));

		@include mobile {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 12px;
		}
	}

	.dashboard__stat {
		padding: 16px;
	}

	.dashboard__stat-label {
		color: var(--color-text-secondary);
		font-size: 13px;
	}

	.dashboard__stat-value {
		margin-top: 8px;
		font-size: 24px;
		font-weight: 600;
	}

	.dashboard__stat-trend {
		margin-top: 4px;
		color: var(--color-success);
		font-size: 12px;
	}

	.dashboard__panel {
		padding: 16px;
	}

	.dashboard__panel-title {
		margin-bottom: 12px;
		font-size: 15px;
		font-weight: 600;
	}

	.dashboard__activity {
		display: flex;
		gap: 12px;
		padding: 10px 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 14px;
	}

	.dashboard__activity:last-child {
		border-bottom: none;
	}

	.dashboard__activity-time {
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
	}
}
</style>
