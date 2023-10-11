/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 18:00:36
 * @LastEditTime: 2023-10-11 18:01:06
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/entitys/user.entity.ts
 */
// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MembershipLevelEntity } from './membership-level.entity';
import { UserRoleEntity } from './user-role.entity';
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsNotEmpty
} from 'class-validator';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number; // 用户唯一标识符

  
  @Column({ length: 50, unique: true, nullable: true })
  username: string; // 用户名

  // @IsEmail()
  // @Column({ length: 100, unique: true, nullable: true })
  // email: string; // 电子邮件地址

  // @Column({ length: 20, unique: true, nullable: true })
  // phone: string; // 收集

  // @Column({ length: 100, unique: true, nullable: true })
  // google: string; // google

  // @Column({ length: 100, unique: true, nullable: true })
  // github: string; // google

  // @IsNotEmpty()
  // @Column()
  // password: string; // 密码（加密存储）

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date; // 用户创建时间

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date; // 用户信息更新时间

  @ManyToOne(() => MembershipLevelEntity)
  @JoinColumn({ name: 'membership_level_id' })
  membershipLevel: MembershipLevelEntity; // 用户会员等级

  @ManyToOne(() => UserRoleEntity)
  @JoinColumn({ name: 'role' })
  role: UserRoleEntity; // 用户会员等级
}

class EmailEntity {
  @IsEmail()
  @Column({ length: 100, unique: true, nullable: true })
  email: string; // 电子邮件地址

  @IsNotEmpty()
  @Column()
  password: string; // 密码（加密存储）
}


class PhtonEntity {
  @Column({ length: 20, unique: true, nullable: true })
  phone: string; // phone | 验证码登录
}


class GoogleEntity {
  @Column({ length: 100, unique: true, nullable: true })
  google: string; // google
}


class GithubEntity {
  @Column({ length: 100, unique: true, nullable: true })
  github: string; // github
}

