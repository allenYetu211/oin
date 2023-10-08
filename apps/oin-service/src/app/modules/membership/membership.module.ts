/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-12 11:01:11
 * @LastEditTime: 2023-09-12 11:01:26
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/membership/membership.module.ts
 */
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipLevelEntity } from '@server/app/entitys/membership-level.entity';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipLevelEntity])],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
