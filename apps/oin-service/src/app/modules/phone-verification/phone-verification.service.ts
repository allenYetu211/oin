/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, LessThan, MoreThan } from 'typeorm'
import { PhoneVerificationEntity } from '@server/app/entitys/phone-verification.entity'
import { Cron } from '@nestjs/schedule'
import { logger } from '@server/app/common/utils/logger'
import { HttpException, HttpStatus } from '@nestjs/common'

@Injectable()
export class PhoneVerificationService {
	constructor(
		@InjectRepository(PhoneVerificationEntity)
		private readonly phoneVerificationRepository: Repository<PhoneVerificationEntity>,
	) {}

	// @Cron('0 * * * * *') // 每分钟执行一次
	@Cron('0 */10 * * * *') // 每 10 分钟执行一次
	async cleanExpiredVerifications() {
		const currentTime = new Date()
		await this.phoneVerificationRepository.delete({
			expiresAt: LessThan(currentTime),
		})
	}

	async generateAndSaveVerificationCode(phone: string): Promise<string> {
		const activeVerification = await this.findActiveVerificationCode(phone)
		// todo  同一时间段，查询发送次数。
		if (activeVerification) {
			throw new HttpException('verification code not expired', HttpStatus.CONFLICT)
			// TODO  重新发送短信 ，并计算次数
		} else {
			const code = Math.floor(1000 + Math.random() * 9000).toString()
			const expiresAt = new Date()
			expiresAt.setMinutes(expiresAt.getMinutes() + 5) // 设置到期时间为5分钟后

			const verification = new PhoneVerificationEntity()
			verification.phone = phone
			verification.code = code
			verification.expiresAt = expiresAt

			await this.phoneVerificationRepository.save(verification)

			logger.info(`phone: ${phone} | code: ${code}`)

			return 'Code Sent Successfully!'
		}
	}

	/**
	 *  查询数据库中的验证码是否过期
	 */
	async findActiveVerificationCode(phone: string): Promise<PhoneVerificationEntity | null> {
		const currentTime = new Date()

		const verification = await this.phoneVerificationRepository.findOne({
			where: {
				phone,
				expiresAt: MoreThan(currentTime), // 确保验证码尚未过期
			},
		})

		console.log('findActiveVerificationCode verification', verification)

		return verification
	}

	/**
	 *  确定验证码是否与手机号绑定，并且是有效的
	 */
	async verifyRegistration(phone: string, code: string): Promise<boolean> {
		const verification = await this.phoneVerificationRepository.findOne({
			where: {
				phone,
				code,
				// MoreThan 数据库中的事件是否超出当前出入的时间
				expiresAt: MoreThan(new Date()), // 确保验证码尚未过期
			},
		})

		if (verification) {
			// 验证成功，删除已验证的验证码
			await this.phoneVerificationRepository.remove(verification)
			return true
		}

		return false
	}
}
