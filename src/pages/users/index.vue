<script setup lang="ts">
/** 用户管理：演示「表格 → 移动端卡片」的自适应布局 */
import { computed, ref } from 'vue'

interface IUserRow {
	id: number
	name: string
	email: string
	role: string
	status: '启用' | '禁用'
}

const keyword = ref('')

const users = ref<IUserRow[]>([
	{ id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '启用' },
	{ id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: '启用' },
	{ id: 3, name: '王五', email: 'wangwu@example.com', role: '访客', status: '禁用' },
	{ id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑', status: '启用' }
])

const filtered = computed(() => {
	const kw = keyword.value.trim().toLowerCase()
	if (!kw) return users.value
	return users.value.filter((item) => item.name.toLowerCase().includes(kw) || item.email.toLowerCase().includes(kw))
})
</script>

<template>
	<div class="card users">
		<div class="users__toolbar">
			<h2 class="users__title">用户管理</h2>
			<input v-model="keyword" class="users__search" type="search" placeholder="搜索姓名或邮箱" />
		</div>

		<!-- 桌面端：表格 -->
		<table class="users__table">
			<thead>
				<tr>
					<th>ID</th>
					<th>姓名</th>
					<th>邮箱</th>
					<th>角色</th>
					<th>状态</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in filtered" :key="item.id">
					<td>{{ item.id }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.email }}</td>
					<td>{{ item.role }}</td>
					<td>{{ item.status }}</td>
				</tr>
			</tbody>
		</table>

		<!-- 移动端：卡片列表 -->
		<ul class="users__list">
			<li v-for="item in filtered" :key="item.id" class="users__card">
				<div class="users__card-head">
					<span class="users__card-name">{{ item.name }}</span>
					<span class="users__card-role">{{ item.role }}</span>
				</div>
				<p class="users__card-email">{{ item.email }}</p>
				<p class="users__card-status">状态：{{ item.status }}</p>
			</li>
		</ul>

		<p v-if="!filtered.length" class="users__empty">没有匹配的用户</p>
	</div>
</template>

<style lang="scss" scoped>
.users {
	padding: 16px;

	.users__toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 16px;
	}

	.users__title {
		font-size: 15px;
		font-weight: 600;
	}

	.users__search {
		width: 220px;
		height: 34px;
		padding: 0 10px;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background-color: var(--color-bg);
		outline: none;

		@include mobile {
			width: 100%;
		}
	}

	.users__search:focus {
		border-color: var(--color-primary);
	}

	.users__table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;

		th,
		td {
			padding: 10px 12px;
			border-bottom: 1px solid var(--color-border);
			text-align: left;
		}

		th {
			color: var(--color-text-secondary);
			font-weight: 500;
		}

		@include mobile {
			display: none;
		}
	}

	.users__list {
		display: none;

		@include mobile {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}

	.users__card {
		padding: 12px;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background-color: var(--color-bg);
	}

	.users__card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.users__card-name {
		font-weight: 600;
	}

	.users__card-role {
		color: var(--color-text-muted);
		font-size: 12px;
	}

	.users__card-email {
		margin-top: 6px;
		color: var(--color-text-secondary);
		font-size: 13px;
	}

	.users__card-status {
		margin-top: 4px;
		font-size: 13px;
	}

	.users__empty {
		padding: 24px 0;
		color: var(--color-text-muted);
		font-size: 14px;
		text-align: center;
	}
}
</style>
