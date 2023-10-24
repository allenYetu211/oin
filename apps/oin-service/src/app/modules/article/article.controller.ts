/*
https://docs.nestjs.com/controllers#controllers
*/
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleEntity } from '@server/app/entitys/article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  getArticle(@Param('id') id: number) {
    return this.articleService.getArticle(id);
  }

  @Post()
  createArticle(@Body() createArticleDto: ArticleEntity) {
    return this.articleService.createArticle(createArticleDto);
  }
}
