/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Service
 * OpenAPI spec version: 1.0.0
 */
import { customInstance } from './orval-request'
export type PostAuthLogin200 = { [key: string]: any }

export type PostAuthLoginBody = {
	username: string
	password: string
}

export type PutApiUsersUpdateMembershipLevel23200 = { [key: string]: any }

export type PutApiUsersUpdateMembershipLevel23Body = {
	level: number
}

export type GetApiMembership200 = { [key: string]: any }

export type PostApiMembership200 = { [key: string]: any }

export type PostApiMembershipBody = {
	level_name: string
	description: string
	level_id: number
}

export type GetUsersId403 = {
	statusCode: number
	message: string
}

export type GetUsersId200DataRole = {
	role_id: number
	role_name: string
}

export type GetUsersId200Data = {
	user_id: number
	username: string
	email: string
	created_at: string
	updated_at: string
	membershipLevel: null
	role: GetUsersId200DataRole
}

export type GetUsersId200 = {
	statusCode: number
	message: string
	data: GetUsersId200Data
}

export type GetUsers200 = { [key: string]: any }

export type PostUsers200 = { [key: string]: any }

export type PostUsersBody = {
	username: string
	password: string
	email: string
}

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
	config: any,
	args: infer P,
) => any
	? P
	: never

/**
 * @summary 创建用户
 */
export const postUsers = (
	postUsersBody: PostUsersBody,
	options?: SecondParameter<typeof customInstance>,
) => {
	return customInstance<PostUsers200>(
		{
			url: `/users`,
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			data: postUsersBody,
		},
		options,
	)
}

/**
 * @summary 获取全部用户
 */
export const getUsers = (options?: SecondParameter<typeof customInstance>) => {
	return customInstance<GetUsers200>({ url: `/users`, method: 'get' }, options)
}

/**
 * @summary 获取单个用户
 */
export const getUsersId = (id: string, options?: SecondParameter<typeof customInstance>) => {
	return customInstance<GetUsersId200>({ url: `/users/${id}`, method: 'get' }, options)
}

/**
 * @summary 新建会员等级
 */
export const postApiMembership = (
	postApiMembershipBody: PostApiMembershipBody,
	options?: SecondParameter<typeof customInstance>,
) => {
	return customInstance<PostApiMembership200>(
		{
			url: `/api/membership`,
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			data: postApiMembershipBody,
		},
		options,
	)
}

/**
 * @summary 查找全部登记会员
 */
export const getApiMembership = (options?: SecondParameter<typeof customInstance>) => {
	return customInstance<GetApiMembership200>({ url: `/api/membership`, method: 'get' }, options)
}

/**
 * @summary 更新会员等级
 */
export const putApiUsersUpdateMembershipLevel23 = (
	putApiUsersUpdateMembershipLevel23Body: PutApiUsersUpdateMembershipLevel23Body,
	options?: SecondParameter<typeof customInstance>,
) => {
	return customInstance<PutApiUsersUpdateMembershipLevel23200>(
		{
			url: `/api/users/updateMembershipLevel/23`,
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			data: putApiUsersUpdateMembershipLevel23Body,
		},
		options,
	)
}

/**
 * @summary 登录
 */
export const postAuthLogin = (
	postAuthLoginBody: PostAuthLoginBody,
	options?: SecondParameter<typeof customInstance>,
) => {
	return customInstance<PostAuthLogin200>(
		{
			url: `/auth/login`,
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			data: postAuthLoginBody,
		},
		options,
	)
}

export type PostUsersResult = NonNullable<Awaited<ReturnType<typeof postUsers>>>
export type GetUsersResult = NonNullable<Awaited<ReturnType<typeof getUsers>>>
export type GetUsersIdResult = NonNullable<Awaited<ReturnType<typeof getUsersId>>>
export type PostApiMembershipResult = NonNullable<Awaited<ReturnType<typeof postApiMembership>>>
export type GetApiMembershipResult = NonNullable<Awaited<ReturnType<typeof getApiMembership>>>
export type PutApiUsersUpdateMembershipLevel23Result = NonNullable<
	Awaited<ReturnType<typeof putApiUsersUpdateMembershipLevel23>>
>
export type PostAuthLoginResult = NonNullable<Awaited<ReturnType<typeof postAuthLogin>>>
