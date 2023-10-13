/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 17:52:48
 * @LastEditTime: 2023-09-13 10:55:52
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/user/user.module.ts
 */
/*
https://docs.nestjs.com/modules
*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { MembershipModule } from '@server/app/modules/membership/membership.module';
import { RoleModule } from '@server/app/modules/role/role.module';
import { PhoneVerificationModule } from '@server/app/modules/phone-verification/phone-verification.module';

import { UserEntity } from '@server/app/entitys/user.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		MembershipModule,
		RoleModule,
		PhoneVerificationModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
