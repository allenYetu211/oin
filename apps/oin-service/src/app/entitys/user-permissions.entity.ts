/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-11 23:54:38
 * @LastEditTime: 2023-09-11 23:54:49
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/entitys/user-permissions.entity.ts
 */
// user-permissions.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('oin_user_permissions')
export class UserPermissionsEntity {
	@PrimaryGeneratedColumn()
	permission_id: number // 权限唯一标识符

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity // 用户（外键参考用户表）

	@Column({ length: 50 })
	permission_type: string // 权限类型
}
