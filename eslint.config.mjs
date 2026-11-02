// 提供一组预定义的全局变量（如 window、document 等) 用来指定代码所运行的环境
import globals from 'globals'
// 针对 JavaScript 的 ESLint 配置和规则。保持 JavaScript 代码的一致性和质量
import pluginJs from '@eslint/js'
// 提供了对 TypeScript 的支持
import tseslint from 'typescript-eslint'
// 提供了 Vue 特有 ESLint 规则
import pluginVue from 'eslint-plugin-vue'
// 将 Prettier 的格式化规则整合到 ESLint 中,让 Prettier 的错误直接显示在 IDE 红线上,自动关闭所有与格式相关的 ESLint 规则
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @description ESLint 负责逻辑质量 */
/** @type {import('eslint').Linter.Config[]} */
export default [
	// 忽略文件
	{
		ignores: ['dist/', 'node_modules/', 'public/', '.vscode/', '**/*min.js', '**/*min.d.ts', '*.md', '*.scss', '*.woff', '*.ttf']
	},
	// 指定了哪些文件类型将应用这些规则
	{ files: ['**/*.{js,ts,vue}'] },
	// 配置了浏览器环境下的全局变量
	{ languageOptions: { globals: globals.browser } },
	/**
	 * @description 基础配置
	 */
	// 插件和规则
	pluginJs.configs.recommended,
	// 引入 `typescript-eslint` 插件的推荐规则
	...tseslint.configs.recommended,
	// 引入`eslint-plugin-vue` 插件的推荐规则
	...pluginVue.configs['flat/recommended'],
	/**
	 * @description 集成 prettier 配置;
	 * @description 会合并根目录下的 .prettierrc.js 文件;
	 * @description 这行必须放在最后！它会关闭上面（基础配置）所有可能与 Prettier 冲突的 ESLint 规则;
	 * @see https://prettier.io/docs/en/options
	 */
	eslintPluginPrettierRecommended,
	// 配置 Vue 文件的 TypeScript 解析器
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				// Vue 文件中的 TypeScript 代码使用 TypeScript 解析器
				parser: tseslint.parser,
				// 指定 tsconfig.json 文件路径，让 ESLint 能正确读取类型定义
				project: './tsconfig.json',
				// 添加 .vue 扩展名支持
				extraFileExtensions: ['.vue']
			}
		}
	},
	/**
	 * @description 自定义规则;
	 * @description 只保留逻辑类规则，所有格式类规则应该交给 prettier 插件处理;
	 */
	{
		rules: {
			/**
			 * @description 代码质量与最佳实践 (建议/错误)
			 */
			'no-var': 'error', // 禁用 var，用 let 和 const 代替
			eqeqeq: 'error', // 必须使用全等 (===)
			'no-eq-null': 'error', // 禁止对 null 使用 == 或 != 运算符
			'default-case': 'error', // switch 语句最后必须有 default
			'prefer-const': 'warn', // 首选 const（若变量未被重新赋值）
			/**
			 * @description 逻辑开关与环境适配 (关闭检查/允许特定行为)
			 */
			'no-undef': 'off', // TypeScript 已有类型检查，关闭 ESLint 的 no-undef 避免全局类型报错
			'no-console': 'off', // 允许使用 console
			'no-unused-vars': 'off', // 由下方 TS 规则接管
			'no-use-before-define': 'off',
			'no-unreachable': 'off',
			'no-case-declarations': 'off',
			'no-constant-condition': 'off',
			'no-useless-escape': 'off',
			'no-control-regex': 'off',
			'no-sparse-arrays': 'off',
			'no-prototype-builtins': 'off',
			'no-async-promise-executor': 'off',
			/**
			 * @description TypeScript 专用规则
			 */
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@typescript-eslint/no-wrapper-object-types': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-this-alias': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-duplicate-enum-values': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/triple-slash-reference': 'off',
			'@typescript-eslint/consistent-type-imports': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/only-throw-error': 'off',
			'@typescript-eslint/prefer-promise-reject-errors': 'off',
			'@typescript-eslint/unbound-method': 'off',
			'@typescript-eslint/no-duplicate-type-constituents': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/await-thenable': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/restrict-plus-operands': 'off',
			'@typescript-eslint/no-base-to-string': 'off',
			'@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
			/**
			 * @description Vue 专用规则
			 */
			'vue/multi-word-component-names': 'off', // 允许多词组件名（如 index.vue）
			'vue/no-mutating-props': 'off',
			'vue/no-v-model-argument': 'off',
			'vue/no-v-for-template-key': 'off',
			'vue/no-v-text-v-html-on-component': 'off',
			'vue/no-reserved-component-names': 'off',
			'vue/no-useless-template-attributes': 'off',
			'vue/valid-v-for': 'off',
			'vue/require-v-for-key': 'off',
			'vue/no-unused-vars': 'off',
			'vue/no-parsing-error': 'off',
			'vue/no-template-key': 'off',
			'vue/no-deprecated-v-on-native-modifier': 'off',
			'vue/require-default-prop': 'off',
			'vue/require-prop-types': 'off',
			'vue/no-setup-props-destructure': 'off',
			'vue/no-ref-as-operand': 'off',
			'vue/no-deprecated-destroyed-lifecycle': 'off',
			'vue/no-deprecated-dollar-listeners-api': 'off',
			'vue/no-deprecated-dollar-scopedslots-api': 'off',
			'vue/no-deprecated-events-api': 'off',
			'vue/no-deprecated-filter': 'off',
			'vue/no-deprecated-inline-template': 'off',
			'vue/no-deprecated-v-bind-sync': 'off',
			'vue/no-deprecated-v-is': 'off',
			'vue/no-deprecated-vue-config-keycodes': 'off',
			'vue/valid-attribute-name': 'off',
			'vue/valid-model-definition': 'off',
			'vue/valid-template-root': 'off',
			'vue/comment-directive': 'off',
			'vue/jsx-uses-vars': 'off',
			'vue/no-side-effects-in-computed-properties': 'off',
			'vue/no-async-in-computed-properties': 'off',
			'vue/return-in-computed-property': 'off',
			'vue/no-textarea-mustache': 'off',
			'vue/no-unused-components': 'off',
			'vue/no-v-for-template-key-on-child': 'off',
			'vue/no-v-if-v-for': 'off',
			'vue/no-multiple-template-root': 'off',
			'vue/attribute-hyphenation': 'off',
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'vue/html-self-closing': 'off',
			'vue/html-indent': 'off',
			'vue/html-closing-bracket-newline': 'off',
			'vue/html-closing-bracket-spacing': 'off',
			'vue/html-end-tags': 'off',
			'vue/html-quotes': 'off'
		}
	}
]
