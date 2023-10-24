/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-24 11:03:35
 * @LastEditTime: 2023-10-24 11:03:40
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('oin_comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string; // 评论文本

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;
}
