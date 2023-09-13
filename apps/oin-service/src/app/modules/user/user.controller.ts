/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 17:52:58
 * @LastEditTime: 2023-09-13 10:53:29
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/user/user.controller.ts
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserEntity } from '~server/app/entitys/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: UserEntity): Promise<UserEntity> {
    console.log('user', user);
    return this.userService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: UserEntity
  ): Promise<UserEntity> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  /**
   * 更新用户等级 TODO :
   */
  @Put('/updateMembershipLevel/:id')
  updateMembershipLevel(
    @Body() body: { level: number },
    @Param('id') user_id: number
  ): Promise<UserEntity> {
    return this.userService.updateMembershipLevel(user_id, body.level);
  }
}
