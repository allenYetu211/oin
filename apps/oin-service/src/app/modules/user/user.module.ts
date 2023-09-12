/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 17:52:48
 * @LastEditTime: 2023-09-12 18:42:03
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/user/user.module.ts
 */
/*
https://docs.nestjs.com/modules
*/
import { UserService } from './user.service';
import { MembershipModule } from '../membership/membership.module';
import { RoleModule } from '../role/role.module';
import { LoggerModule } from '../../common/logger/logger.module';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from '../../entitys/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MembershipModule,
    RoleModule,
    LoggerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
