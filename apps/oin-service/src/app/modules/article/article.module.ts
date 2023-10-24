/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-24 11:04:56
 * @LastEditTime: 2023-10-24 11:22:35
 */
import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { ArticleEntity } from '@server/app/entitys/article.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
/*
https://docs.nestjs.com/modules
*/


@Module({
	imports: [TypeOrmModule.forFeature([ArticleEntity])],
	controllers: [ArticleController],
	providers: [ArticleService],
})
export class ArticleModule {}

