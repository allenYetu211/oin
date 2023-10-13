/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-12 14:10:02
 * @LastEditTime: 2023-10-12 14:10:11
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/entitys/phone-verification.entity.ts
 */
// phone-verification.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class PhoneVerificationEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	phone: string

	@Column()
	code: string

	@Column({ type: 'timestamp' })
	expiresAt: Date
}
