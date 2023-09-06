import { UserModule } from './modules/user/user.module';
/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-05 18:22:16
 * @LastEditTime: 2023-09-06 17:52:46
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库主机
      port: 3306, // 数据库端口
      username: process.env.DB_USERNAME, // 数据库用户名
      password: process.env.DB_PASSWORD, // 数据库密码
      database: process.env.DB_DATABASE, // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体类所在的位置
      synchronize: true, // 在每次应用程序启动时自动创建数据库表（开发环境中使用）
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
