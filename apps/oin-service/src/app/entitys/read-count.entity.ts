/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-24 11:03:50
 * @LastEditTime: 2023-10-24 11:03:53
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('oin_read_count')
export class ReadCountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number; // 计数

  @ManyToOne(() => ArticleEntity, (article) => article.readCounts)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;
}
