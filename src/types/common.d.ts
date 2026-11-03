/** @description 任意类型*/
declare type TAny = any

/** @description 对象字典*/
declare type TDict<T = TAny> = { [key: string]: T }

/** @description 任意函数*/
declare type TFunc<T = TAny> = (...args: T[]) => T

/** @description 主题模式：跟随系统 / 浅色 / 深色 */
declare type TThemeMode = 'auto' | 'light' | 'dark'

/** @description 路由过渡动画名，对应 animation.scss 中的类名前缀 */
declare type TAnimName = 'none' | 'fade' | 'slide' | 'zoom'
