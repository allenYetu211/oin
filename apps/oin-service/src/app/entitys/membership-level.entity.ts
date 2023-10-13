/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-11 23:55:12
 * @LastEditTime: 2023-09-11 23:55:18
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/entitys/membership-level.entity.ts
 */
// membership-level.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('membership_levels')
export class MembershipLevelEntity {
	@PrimaryGeneratedColumn()
	level_id: number; // 会员等级唯一标识符

	@Column({ length: 50 })
	level_name: string; // 会员等级名称

	@Column({ length: 255 })
	description: string; // 会员等级描述
}
