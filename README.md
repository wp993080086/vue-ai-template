# vue-ai-template

> 基于 Vue 3 + TypeScript + Vite 的后台管理系统空白项目模板，内置深色模式与移动端适配，开箱即用。

<p>
  <img src="https://img.shields.io/badge/Vue-3.5.44-42b883?logo=vuedotjs&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.3.5-646cff?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vue%20Router-5.4.0-42b883?logo=vuedotjs&logoColor=white" alt="Vue Router" />
  <img src="https://img.shields.io/badge/Pinia-4.1.0-ffd859?logo=vuedotjs&logoColor=black" alt="Pinia" />
  <img src="https://img.shields.io/badge/Node-%E2%89%A522.23.4-339933?logo=nodedotjs&logoColor=white" alt="Node" />
</p>

## 特性

- **后台骨架** — 登录页、侧边栏 + 顶栏布局、路由守卫、404 页，克隆即可开工
- **深色模式** — `跟随系统 / 浅色 / 深色` 三态切换，CSS 变量驱动，首屏无闪烁
- **移动端适配** — 侧边栏自动转为抽屉，表格自动转为卡片列表，纯 CSS 断点实现
- **开箱即用** — 已内置 Pinia、Vue Router、axios 请求封装、多环境变量、路径别名、全局 SCSS mixin
- **工程化完备** — ESLint（扁平配置）+ Prettier + TypeScript + Vitest 全覆盖
- **提交即校验** — husky + lint-staged 自动修复代码，commitlint 规范提交信息
- **AI 友好** — 内置 `AGENTS.md` 行为规范与 `.agents/rules` 技术规范
- **无 UI 库依赖** — 不预装组件库与原子化 CSS，样式方案由你决定

## 技术栈

| 项         | 版本                   |
| ---------- | ---------------------- |
| Vue        | `3.5.44`（组合式 API） |
| TypeScript | `5.9.3`                |
| Vite       | `8.3.5`                |
| Vue Router | `5.4.0`                |
| Pinia      | `4.1.0`                |
| axios      | `1.21.0`               |
| Vitest     | `5.0.5`                |
| ESLint     | `10.14.0`（扁平配置）  |
| Node       | ≥ 22.23.4              |

> TypeScript 固定在 5.9.3：`typescript-eslint@8` 的 peer 要求为 `>=4.8.4 <6.1.0`，升级到 6/7 会导致 lint 工具链无法安装。

## 快速开始

```bash
# 安装依赖
npm install
```

```bash
# 启动开发服务（默认 http://localhost:5173）
npm run dev
```

```bash
# 生产构建（先跑 vue-tsc 类型检查，再打包到 dist/）
npm run build

# 本地预览构建产物
npm run preview
```

演示账号：任意非空账号密码均可登录（模板内置 mock 登录）。

## 用前必改清单

作为模板复用时，**先改这几处**（否则会带着 `vue-ai-template` 的名字上线）：

| 文件                                                              | 改什么                           |
| ----------------------------------------------------------------- | -------------------------------- |
| `package.json` → `name`                                           | 项目名                           |
| `.env.local` / `.env.production` → `VITE_TITLE` / `VITE_BASE_URL` | 应用标题与各环境接口地址         |
| `src/config/constants.ts` → `APP.tokenKey` / `APP.themeKey`       | 本地存储 key 前缀                |
| `src/stores/user.ts` → `login`                                    | 把 mock 登录换成真实接口调用     |
| `src/apis/api/user.ts`                                            | 按后端约定调整接口路径与数据结构 |
| `src/apis/interceptors.ts`                                        | 按后端约定调整响应结构与业务码   |

## 目录结构

> 以下为主要结构，非穷举清单。

```text
├── src/
│   ├── App.vue               应用根组件（仅承载路由出口）
│   ├── main.ts               应用入口（注册 Pinia / Router / 请求层 / 全局样式）
│   ├── layouts/
│   │   └── AdminLayout.vue   后台布局（侧边栏 + 顶栏 + 移动端抽屉）
│   ├── pages/
│   │   ├── login/            登录页
│   │   ├── dashboard/        仪表盘（示例页）
│   │   ├── users/            用户管理（表格 / 移动端卡片示例）
│   │   ├── settings/         系统设置（主题切换示例）
│   │   └── error/404.vue     404 页
│   ├── router/
│   │   ├── index.ts          路由表（含菜单 meta）
│   │   └── guard.ts          全局守卫（登录校验 + 页面标题）
│   ├── components/           AppSider / ThemeToggle / AppIcon
│   ├── stores/               Pinia store（theme / user / counter 示例）
│   ├── hooks/                复用逻辑（useMediaQuery / useToggle 示例）
│   ├── utils/                纯函数工具（date.ts 示例 + 单测）
│   ├── apis/                 请求层（request.ts + interceptors.ts + api/）
│   ├── config/               环境配置（env.ts）与常量（constants.ts）
│   ├── styles/               variables（主题变量）/ reset / common（mixin）/ base
│   └── types/                全局 TS 类型声明
├── .env.local                本地环境变量（示例，已入库）
├── .env.production           正式环境变量（示例，已入库）
├── .nvmrc                    Node 版本（nvm use 自动对齐）
├── .husky/pre-commit         提交钩子（lint-staged）
├── .husky/commit-msg         提交信息钩子（commitlint）
├── commitlint.config.mjs     提交信息规范（Conventional Commits）
├── eslint.config.mjs         ESLint 扁平配置
├── vitest.config.ts          单测配置
├── vite.config.ts            Vite 配置（@ 别名 + 全局 scss 注入）
└── tsconfig.json             TypeScript 配置
```

## 深色模式

三态切换：`跟随系统` / `浅色` / `深色`，用户选择持久化在 `localStorage`。

- 主题状态：`src/stores/theme.ts`，最终结果写入 `document.documentElement.dataset.theme`。
- 色值全部收口在 `src/styles/variables.scss`，通过 `:root` 与 `html[data-theme='dark']` 两套 CSS 变量切换。
- `index.html` 内联了首屏防闪烁脚本，在 Vue 挂载前同步设置 `data-theme`，避免深色下白屏闪烁。
- **写样式时请用 `var(--color-xxx)`，不要硬编码色值**，否则深色模式会失效。

切换入口有两处：顶栏的主题按钮（循环切换）和「系统设置」页的单选组。

## 移动端适配

断点为 `768px`，移动端优先、向上适配：

- 侧边栏：桌面端常驻可折叠；窄屏自动变为遮罩抽屉，点击菜单后自动收起。
- 表格：桌面端渲染 `<table>`，移动端切换为卡片列表（见 `src/pages/users/index.vue`）。
- 工具：`src/hooks/useMediaQuery.ts` 提供 `useIsMobile()`；SCSS 侧提供 `mobile` / `desktop` mixin。

> 断点常量有两处，修改时必须同步：`src/styles/common.scss` 的 `$breakpoint-md` 与 `src/hooks/useMediaQuery.ts` 的 `MOBILE_MAX_WIDTH`。

## 多环境配置

采用 Vite 原生 `.env` 方案，变量以 `VITE_` 前缀暴露给代码：

| 文件              | 生效场景                        | 说明             |
| ----------------- | ------------------------------- | ---------------- |
| `.env.local`      | 本地开发（`npm run dev`）       | 示例文件，已入库 |
| `.env.production` | 正式构建（`--mode production`） | 示例文件，已入库 |

- 在代码中通过 `import.meta.env.VITE_XXX` 读取，统一收口到 `src/config/env.ts`。
- 新增变量时，记得同步 `src/types/env.d.ts` 的 `ImportMetaEnv` 声明。
- 个人本地覆盖请用 `.env.<mode>.local` 命名（如 `.env.development.local`），已被 `.gitignore` 忽略。

## 单元测试

```bash
npm run test         # 单次运行
npm run test:watch   # 监听模式
```

- 基于 **Vitest + @vue/test-utils + happy-dom**，配置见 `vitest.config.ts`。
- 单测配置不注入全局 SCSS（组件内引用的 `var(--color-xxx)` 在测试环境为空值，不影响断言）。
- 测试文件与被测文件同目录，命名 `*.test.ts`。

## 约定

- **组合式 API**：页面/组件一律 `<script setup lang="ts">`，复用逻辑写 `useXxx` composable。
- **状态管理**：Pinia，store 放 `src/stores/`，组合式写法（`defineStore('name', () => {...})`）。
- **请求**：统一走 `src/apis/request.ts`，不要在页面里直接用 axios；业务接口放 `src/apis/api/`，请求/响应拦截逻辑集中在 `src/apis/interceptors.ts`。
- **样式**：语义 class + scoped SCSS；`vite.config.ts` 已全局注入 `src/styles/common.scss`，页面内可直接用 `flex_center` / `omit` / `mobile` / `desktop`，无需手动 `@use`。
- **颜色**：一律用 `src/styles/variables.scss` 的 CSS 变量。
- **路径别名**：`@` → `src`。
- **代码检查**：提交时 husky + lint-staged 自动跑 `eslint --fix` 与 `prettier`；提交信息由 commitlint 按 Conventional Commits 校验（如 `feat: 新增登录页`）。

## 脚本

| 脚本                   | 说明                        |
| ---------------------- | --------------------------- |
| `npm run dev`          | 启动开发服务                |
| `npm run build`        | 类型检查 + 生产构建         |
| `npm run build:local`  | 以 local 模式构建           |
| `npm run preview`      | 预览构建产物                |
| `npm run lint` / `fix` | ESLint 检查并自动修复       |
| `npm run format`       | Prettier 格式化             |
| `npm run typecheck`    | `vue-tsc --noEmit` 类型检查 |
| `npm run test`         | 单测单次运行                |
| `npm run test:watch`   | 单测监听模式                |

## 说明

- `.husky/_/` 为 husky 运行时垫片，由 husky 自动生成，已加入 `.gitignore`。
- 首次 `npm install` 若尚未 `git init`，`prepare` 会跳过 husky 安装（不报错）。
- 模板未内置 UI 组件库与原子化 CSS，可按需自行引入。

## 开源协议

本项目基于 [MIT License](LICENSE) 开源，可自由使用、修改与商用，仅需保留版权声明。

- 作者：[wp993080086](https://github.com/wp993080086)
