/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 17:53:15
 * @LastEditTime: 2023-10-12 18:08:01
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/user/user.service.ts
 */
/*
https://docs.nestjs.com/providers#services
*/
import { Injectable, ConflictException, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, QueryFailedError, FindOptionsWhere } from 'typeorm'
import { UserEntity } from '@server/app/entitys/user.entity'
import { MembershipService } from '@server/app/modules/membership/membership.service'
import { RoleService } from '@server/app/modules/role/role.service'
import { PhoneVerificationService } from '@server/app/modules/phone-verification/phone-verification.service'
import { logger } from '@server/app/common/utils/logger'

@Injectable()
export class UserService implements OnModuleInit {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly membershipService: MembershipService,
		private readonly roleService: RoleService,
		private readonly phoneVerificationService: PhoneVerificationService,
	) {}

	async onModuleInit() {
		await this.createInitialDefaultUser()
	}

	private async createInitialDefaultUser() {
		try {
			const defaultUser: Partial<UserEntity> = {
				username: process.env.OIN_USERNAME || 'utauu',
				password: process.env.OIN_PASSWORD || 'utauu123',
			}

			const membershipLevel = await this.membershipService.findMembershipLevel(999)
			const role = await this.roleService.findOne(3)
			defaultUser.membershipLevel = membershipLevel
			defaultUser.role = role
			await this.userRepository.save(defaultUser)
		} catch (e) {}
	}

	async findAll(): Promise<UserEntity[]> {
		return await this.userRepository
			.createQueryBuilder('user')
			.select([
				'user.user_id',
				'user.username',
				'user.email',
				'user.created_at',
				'user.membershipLevel',
			])
			.getRawMany()
	}

	async findOne(
		option: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
	): Promise<UserEntity> {
		// async findOne(user_id: number): Promise<UserEntity> {
		return await this.userRepository.findOne({
			where: option,
			// where: { user_id },
			select: ['user_id', 'username', 'email', 'created_at', 'updated_at'],
			relations: ['membershipLevel', 'role'],
		})
	}

	/**
	 * 通过手机创建用户
	 */
	async createUserPhone(user: Partial<UserEntity>, authCode: string) {
		// 验证手机
	}

	/**
	 * 验证函数：
	 * 根据传入的内容分别做不同的判断处理
	 * 1. 账号密码创建用户创建用户
	 * 2. 通过 google 创建账号
	 * 3. 通过 github 创建账号
	 * 4. 通过 email 创建账号
	 * 5. 通过 phone 创建账号
	 */
	async create(
		user: Partial<UserEntity>,
		type: 'email' | 'google' | 'phone' | 'gitlab',
	): Promise<UserEntity> {
		const handlers = {
			email: async () => {
				return await this.findExistinguser({ email: user.email })
			},
			google: async () => {
				return await this.findExistinguser({ google: user.google })
			},
			phone: async () => {
				return await this.findExistinguser({ phone: user.phone })
			},
			gitlab: async () => {
				return await this.findExistinguser({ github: user.github })
			},
		}

		//
		if (handlers[type]) {
			try {
				//  如果不存在则跳出 if 内容，执行后续内容。
				await handlers[type]()
			} catch (e) {
				throw new ConflictException(`User with ${e} already exists`)
			}
		} else {
			throw new ConflictException(`Request type ${type} is not supported`)
		}

		try {
			console.log('membershipLevel')
			// 新建用户的会员的等级为 1
			const membershipLevel = await this.membershipService.findMembershipLevel(1)

			// 新建用户的角色的等级为 1
			const role = await this.roleService.findOne(1)
			user.membershipLevel = membershipLevel
			user.role = role
			return await this.userRepository.save(user)
		} catch (error) {
			logger.error(`create user error: ${error}`)
			if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
				throw new ConflictException(`Duplicate entry for ${error.message.split("'")[1]}`)
			}
			throw error
		}
	}

	async update(user_id: string, user: UserEntity): Promise<UserEntity> {
		await this.userRepository.update(user_id, user)
		return await this.findOne({ user_id })
	}

	async remove(user_id: string): Promise<void> {
		await this.userRepository.delete(user_id)
	}

	async updateMembershipLevel(user_id: string, level_id: number): Promise<UserEntity> {
		const membershipLevel = await this.membershipService.findMembershipLevel(level_id)
		await this.userRepository.update(user_id, { membershipLevel })
		return await this.userRepository.findOne({
			where: { user_id },
			select: ['user_id', 'username', 'email'],
			relations: ['membershipLevel'],
		})
	}

	/**
	 * 查找用户是否已经存在
	 */
	private async findExistinguser(user: any) {
		const existingUser = await this.userRepository.findOne({
			where: user,
		})

		if (existingUser) {
			return Promise.reject('user already')
		}
		return Promise.resolve()
	}
}
