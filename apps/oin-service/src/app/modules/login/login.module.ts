/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:42:20
 * @LastEditTime: 2023-09-13 11:47:00
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/login/login.module.ts
 */

import { Module } from '@nestjs/common';
import { AuthModule } from '@server/app/modules/auth/auth.module';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
	imports: [AuthModule],
	controllers: [LoginController],
	providers: [LoginService],
})
export class LoginModule {}
