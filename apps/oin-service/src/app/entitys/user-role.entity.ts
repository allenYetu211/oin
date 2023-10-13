/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-12 14:57:19
 * @LastEditTime: 2023-09-12 15:06:42
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/entitys/user-role.entity.ts
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('user_role')
export class UserRoleEntity {
	@PrimaryGeneratedColumn()
	role_id: number;

	@Column({ length: 50 })
	role_name: string;
}
