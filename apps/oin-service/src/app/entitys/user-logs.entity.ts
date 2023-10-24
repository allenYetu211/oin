// user-logs.entity.ts
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('oin_user_logs')
export class UserLogsEntity {
	@PrimaryGeneratedColumn()
	log_id: number // 日志唯一标识符

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity // 用户（外键参考用户表）

	@Column({ length: 50 })
	log_type: string // 日志类型

	@CreateDateColumn({ type: 'timestamp' })
	log_timestamp: Date // 日志时间戳

	@Column('text')
	log_message: string // 日志消息
}
