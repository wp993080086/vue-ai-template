# 项目技术规范

与根目录 `AGENTS.md` 并行生效，补充本模板的技术约定。

## 目录职责

| 目录              | 职责                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `src/pages/`      | 页面，路由表见 `src/router/routes/`，单个页面独占同名目录                                                              |
| `src/layouts/`    | 布局组件，后台主框架在 `AdminLayout/index.vue`，布局专属子组件（如 `AppSider`）也放这里                                |
| `src/components/` | 跨布局复用的通用组件（如 `AppIcon`、`ThemeToggle`），按需 `import`                                                     |
| `src/stores/`     | Pinia store，组合式写法 `defineStore('name', () => {...})`                                                             |
| `src/hooks/`      | 复用逻辑，命名 `useXxx`                                                                                                |
| `src/utils/`      | 纯函数工具，便于单测                                                                                                   |
| `src/apis/`       | 请求层，`request.ts` 统一封装，请求/响应拦截器分列 `request-interceptor.ts`、`response-interceptor.ts`                 |
| `src/config/`     | 环境配置（`env.ts`）与常量（`constants.ts`）                                                                           |
| `src/styles/`     | `variables.scss`（主题 CSS 变量）、`reset.scss`、`common.scss`（mixin）、`base.scss`、`animation.scss`（路由过渡动画） |
| `src/types/`      | 全局 TS 类型声明                                                                                                       |

## 编码约定

- 页面/组件一律 `<script setup lang="ts">`，组合式 API。
- 请求统一走 `src/apis/request.ts`，禁止在页面内直接调用 `axios`；业务接口放 `src/apis/api/`。
- 路径别名 `@` → `src`。
- 样式语义 class + scoped SCSS；`common.scss` 已全局注入，可直接用 `flex_center` / `omit` / `mobile` / `desktop` mixin，无需手动 `@use`。
- **SCSS 嵌套禁止使用 `&` 拼接选择器**（如 `&__sider`、`&--open`、`&:hover`），一律写完整类名。外层父块保留，子块以完整类名嵌套在其内部：

  ```scss
  .layout {
  	display: flex;

  	.layout__sider {
  		height: 100%;
  	}

  	.layout__drawer--open {
  		transform: translateX(0);
  	}

  	.layout__item:hover {
  		color: var(--color-primary);
  	}
  }
  ```

- **单文件样式超过 50 行必须抽离**到同级 `style.scss`，组件内用 `<style src="./style.scss" lang="scss" scoped></style>` 引入（`scoped` 仍生效，切勿删掉该属性）。
- **组件一律独占同名目录**，入口文件固定为 `index.vue`。如 `AdminLayout/index.vue`、`AppSider/index.vue`、`pages/users/index.vue`。新增无目录的组件时同步建目录，避免出现裸 `.vue` 文件。
- **布局专属子组件归 `layouts/`，通用组件归 `components/`**。判断标准：只服务某个布局、强依赖布局上下文的（如侧边栏 `AppSider`）放 `layouts/`；跨布局复用的（如 `AppIcon`、`ThemeToggle`）放 `components/`。
- **颜色一律使用 `src/styles/variables.scss` 中的 CSS 变量**（如 `var(--color-text)`），禁止硬编码色值，否则深色模式会失效。
- 新增环境变量时同步 `src/types/env.d.ts` 与 `src/config/env.ts`。
- 新增路由时在 `meta` 中补 `title`；后台菜单直接读取路由表，无需两处维护。
- 路由表拆分在 `src/router/routes/`（`base.ts` 公共路由 + `admin.ts` 后台路由 + `index.ts` 汇总），`src/router/index.ts` 只负责创建实例与装配守卫。

## 主题与移动端

- 主题通过 `html[data-theme='light' | 'dark']` 切换，状态在 `src/stores/theme.ts`。
- 首屏防闪烁脚本内联在 `index.html`，其存储 key 必须与 `src/config/constants.ts` 的 `APP.themeKey` 一致。
- 移动端断点常量有两处，修改时必须同步：`src/styles/common.scss` 的 `$breakpoint-md` 与 `src/hooks/useMediaQuery.ts` 的 `MOBILE_MAX_WIDTH`。

## 过渡动画与页面缓存

- 路由过渡动画样式统一放 `src/styles/animation.scss`，新增动画须在 `src/stores/app.ts` 的 `animOptions` 中登记，两处名称保持一致。
- 需要缓存的页面在路由 `meta` 中声明 `keepAlive: true`；运行时增删缓存走 `src/stores/app.ts` 的 `addCache` / `removeCache`。
- 被 `keep-alive` 缓存的页面必须声明 `name`，且与路由 `name` 一致，否则 `include` 无法匹配。

## 提交规范

- 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)：`<type>: <subject>`（英文冒号 + 一个空格），type 取 `feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `build` / `ci` / `chore` / `revert`。
- `commit-msg` 钩子校验格式，`pre-commit` 钩子跑 lint-staged。

## 质量门禁

提交/合并前本地须通过：

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
