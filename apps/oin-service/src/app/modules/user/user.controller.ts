/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 17:52:58
 * @LastEditTime: 2023-10-12 17:00:56
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/user/user.controller.ts
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common'
import { LoginAuthGuard } from '@server/app/guard/login-auth.guard'
import { UserEntity } from '@server/app/entitys/user.entity'
import { PermissionGuard } from '@server/app/guard/permission.guard'
import { Permissions } from '@server/app/decorator/permission.decorator'
import { UserService } from './user.service'
import { PhoneVerificationService } from '@server/app/modules/phone-verification/phone-verification.service'
import { HttpException, HttpStatus } from '@nestjs/common'

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly phoneVerificationService: PhoneVerificationService,
	) {}

	/**
	 * 查询所有的用户
	 * 用户权限: 管理员2、所有者3
	 */
	@Get()
	@Permissions('1')
	@UseGuards(LoginAuthGuard, PermissionGuard)
	findAll(@Request() req): Promise<UserEntity[]> {
		return this.userService.findAll()
	}

	/**
	 * 查询单个用户
	 * 用户权限: 管理员2、所有者3
	 */
	@Get(':id')
	@Permissions('1')
	@UseGuards(LoginAuthGuard, PermissionGuard)
	findOne(@Param('id') id: string): Promise<UserEntity> {
		return this.userService.findOne({ user_id: id })
	}

	/**
	 * 账号密码创建用户创建用户
	 * 1.  'username' | 'email' | 'password' 是否为空
	 */
	@Post()
	create(@Body() user: Pick<UserEntity, 'username' | 'email' | 'password'>): Promise<UserEntity> {
		return this.userService.create(user, 'email')
	}

	/**
	 * 通过 google 创建账号
	 */
	@Post('/google')
	createGoolge(@Body() user: Pick<UserEntity, 'google'>): Promise<UserEntity> {
		return this.userService.create(user, 'google')
	}

	/**
	 * 通过 phone 创建账号
	 */
	@Post('/phone')
	async createPhone(
		@Body()
		{ phone, authCode }: Pick<UserEntity, 'phone'> & { authCode: string },
	): Promise<UserEntity> {
		//  先确认验证码是否正确
		const valid = await this.phoneVerificationService.verifyRegistration(phone, authCode)
		if (valid) {
			const testInfo = await this.userService.create({ phone }, 'phone')
			return testInfo
		} else {
			throw new HttpException('Invalid verification code', HttpStatus.BAD_REQUEST)
		}
	}

	/**
	 * 更新用户信息
	 */
	@Put(':id')
	@UseGuards(LoginAuthGuard)
	update(@Param('id') id: string, @Body() user: UserEntity): Promise<UserEntity> {
		return this.userService.update(id, user)
	}

	@Delete(':id')
	@Permissions('2')
	@UseGuards(LoginAuthGuard, PermissionGuard)
	remove(@Param('id') id: string): Promise<void> {
		return this.userService.remove(id)
	}

	/**
	 * 更新用户等级 TODO :
	 */
	@Put('/updateMembershipLevel/:id')
	@Permissions('3')
	@UseGuards(LoginAuthGuard, PermissionGuard)
	updateMembershipLevel(
		@Body() body: { level: number },
		@Param('id') user_id: string,
	): Promise<UserEntity> {
		return this.userService.updateMembershipLevel(user_id, body.level)
	}
}
