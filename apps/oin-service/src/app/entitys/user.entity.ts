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

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number; // 用户唯一标识符

  @Column({ length: 50, unique: true })
  username: string; // 用户名

  @Column({ length: 100, unique: true })
  email: string; // 电子邮件地址

  @Column()
  password: string; // 密码（加密存储）

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
