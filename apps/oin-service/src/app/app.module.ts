
/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @LastEditTime: 2023-10-24 11:16:34
 * @LastEditors: Please set LastEditors
 */
import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { entitys } from '@server/app/entitys'

/**
 * filter
 */
import { DuplicateExceptionFilter } from '@server/app/filters/duplicate-exception.filter'
import { GlobalExceptionFilter } from '@server/app/filters/global-exception.filter'

/**
 * modules
 */
import { MembershipModule } from '@server/app/modules/membership/membership.module'
import { RoleModule } from '@server/app/modules/role/role.module'
import { UserModule } from '@server/app/modules/user/user.module'
import { ArticleModule } from '@server/app/modules/article/article.module'
import { AuthModule } from '@server/app/modules/auth/auth.module'
import { LoginModule } from '@server/app/modules/login/login.module'
import { PhoneVerificationModule } from '@server/app/modules/phone-verification/phone-verification.module'
/**
 * interceptor
 */
import { ResponseInterceptor } from '@server/app/interceptor/response.interceptor'

import { ScheduleModule } from '@nestjs/schedule'

import dotenv from 'dotenv'
dotenv.config()

@Module({
	imports: [
		ArticleModule,
		PhoneVerificationModule,
		LoginModule,
		AuthModule,
		RoleModule,
		UserModule,
		MembershipModule,
		ScheduleModule.forRoot(), // 定时任务

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
	controllers: [
		// AppController
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: DuplicateExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
		// AppService,
	],
	exports: [],
})
export class AppModule {}
