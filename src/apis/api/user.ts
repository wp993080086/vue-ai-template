/** @description 业务接口示例：演示如何基于 request 封装模块化 API */
import { request } from '../request'

/** @description 用户信息 */
export interface IUserInfo {
	id: number
	name: string
	avatar: string
}

/** @description 登录入参 */
export interface ILoginParams {
	username: string
	password: string
}

/** @description 登录返回（含 token） */
export interface ILoginResult {
	token: string
	userInfo: IUserInfo
}

/** @description 获取用户信息 */
export function getUserInfo(id: number) {
	return request<IUserInfo>({ url: '/user/info', method: 'GET', params: { id } })
}

/** @description 登录 */
export function login(params: ILoginParams) {
	return request<ILoginResult>({ url: '/user/login', method: 'POST', data: params })
}
