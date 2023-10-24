/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-24 11:02:53
 * @LastEditTime: 2023-10-24 14:15:44
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReadCountEntity } from './read-count.entity';
import { CommentEntity } from './comment.entity';
import { IsNotEmpty } from 'class-validator';


@Entity('oin_article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  aricle_id: number;

  @Column()
  @IsNotEmpty()
  title: string; // 标题

  @Column()
  @IsNotEmpty()
  description: string; // 简介

  @Column()
  @IsNotEmpty()
  content: string; // 内容

  @Column({default: '', nullable: true})
  cover_image: string; // 背景图地址

  @Column({ default: 0, nullable: true})
  likes: number; // 点赞数

  @Column({ default: 0, nullable: true})
  readCounts: number; // 阅读量

  // @OneToMany(() => ReadCountEntity, (readCount) => readCount.article)
  // readCounts: ReadCountEntity[]; // 阅读量

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[]; // 评论
}
