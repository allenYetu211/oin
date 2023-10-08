/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-12 11:01:22
 * @LastEditTime: 2023-09-13 10:56:45
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/membership/membership.controller.ts
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipLevelEntity } from '@server/app/entitys/membership-level.entity';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  findAll(): Promise<MembershipLevelEntity[]> {
    return this.membershipService.findAll();
  }

  /**
   * 创建一个新的等级，在线上环境可能预先刷数据，不允许调用方法创建等级
   */
  @Post()
  create(
    @Body() membershipLevel: MembershipLevelEntity
  ): Promise<MembershipLevelEntity> {
    return this.membershipService.create(membershipLevel);
  }

}
