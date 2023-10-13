// social-media-integration.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('social_media_integrations')
export class SocialMediaIntegrationEntity {
	@PrimaryGeneratedColumn()
	integration_id: number; // 集成唯一标识符

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity; // 用户（外键参考用户表）

	@Column()
	social_media_id: number; // 社交媒体账号唯一标识符

	@Column({ length: 255 })
	access_token: string; // 社交媒体访问令牌
}
