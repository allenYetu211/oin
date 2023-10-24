/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-24 11:05:04
 * @LastEditTime: 2023-10-24 14:07:59
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ArticleEntity } from '@server/app/entitys/article.entity'
import { logger } from '@server/app/common/utils/logger'

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(ArticleEntity)
		private readonly articleRepository: Repository<ArticleEntity>,
	) {}

	async getArticle(article_id: number) {
		return this.articleRepository.findOne({
			where: {
				aricle_id: article_id,
			},
		})
	}

	async createArticle(createArticleDto: ArticleEntity) {
			const article = this.articleRepository.create(createArticleDto)
			return this.articleRepository.save(article)
	}
}
