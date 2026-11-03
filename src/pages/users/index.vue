<script setup lang="ts">
/** 用户管理：演示「表格 → 移动端卡片」的自适应布局 */
import { computed, ref } from 'vue'

/** 组件名与路由 name 保持一致，供 keep-alive include 匹配 */
defineOptions({ name: 'Users' })

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

<style src="./style.scss" lang="scss" scoped></style>
