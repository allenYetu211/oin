/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-12 11:01:27
 * @LastEditTime: 2023-09-12 15:39:15
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/membership/membership.service.ts
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MembershipLevelEntity } from '@server/app/entitys/membership-level.entity'

@Injectable()
export class MembershipService implements OnModuleInit {
	constructor(
		@InjectRepository(MembershipLevelEntity)
		private readonly membershipLevelRepository: Repository<MembershipLevelEntity>,
	) {}

	async onModuleInit() {
		await this.createDefaultMembershipLevel()
	}

	private async createDefaultMembershipLevel() {
		const defaultMembership = [
			{ level_name: '普通会员', description: '普通会员', level_id: 1 },
			{ level_name: '黄金会员', description: '黄金会员', level_id: 2 },
			{ level_name: '钻石会员', description: '钻石会员', level_id: 3 },
		]

		for (const membership of defaultMembership) {
			const existingRole = await this.membershipLevelRepository.findOne({
				where: { level_id: membership.level_id },
			})

			if (!existingRole) {
				const newRole = this.membershipLevelRepository.create(membership)
				await this.membershipLevelRepository.save(newRole)
			}
		}
	}

	/**
	 * 查找会员等级
	 * @param option
	 * @returns
	 */
	public async findMembershipLevel(level_id: number): Promise<MembershipLevelEntity> {
		return this.membershipLevelRepository.findOne({ where: { level_id } })
	}

	/**
	 * 查找所有等级
	 * @returns
	 */
	async findAll(): Promise<MembershipLevelEntity[]> {
		return await this.membershipLevelRepository.find()
	}

	/**
	 * 创建新的等级
	 * @param membershipLevel
	 * @returns
	 */
	async create(membershipLevel: MembershipLevelEntity): Promise<MembershipLevelEntity> {
		return await this.membershipLevelRepository.save(membershipLevel)
	}
}
