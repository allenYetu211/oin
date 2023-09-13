/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-05 18:22:16
 * @LastEditTime: 2023-09-13 10:55:28
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/app.module.ts
 */
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entitys } from '~server/app/entitys';
import { DuplicateExceptionFilter } from '~server/app/filters/duplicate-exception.filter';

/**
 * modules
 */
import { UserModule } from '~server/app/modules/user/user.module';
import { MembershipModule } from '~server/app/modules/membership/membership.module';
import { RoleModule } from '~server/app/modules/role/role.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    RoleModule,
    UserModule,
    MembershipModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库主机
      port: 3306, // 数据库端口
      username: process.env.DB_USERNAME, // 数据库用户名
      password: process.env.DB_PASSWORD, // 数据库密码
      database: process.env.DB_DATABASE, // 数据库名称
      entities: entitys,
      synchronize: true, // 在每次应用程序启动时自动创建数据库表（开发环境中使用）
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DuplicateExceptionFilter,
    },
    AppService,
  ],
  exports: [],
})
export class AppModule {}
