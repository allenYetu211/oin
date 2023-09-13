/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 17:52:58
 * @LastEditTime: 2023-09-13 18:04:28
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
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginAuthGuard } from '~server/app/guard/login-auth.guard';
import { UserEntity } from '~server/app/entitys/user.entity';
import { PermissionGuard } from '~server/app/guard/permission.guard';
import { Permissions } from '~server/app/decorator/permission.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Permissions('1')
  @UseGuards(LoginAuthGuard, PermissionGuard)
  findAll(@Request() req): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Permissions('2')
  @UseGuards(LoginAuthGuard, PermissionGuard)
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne({ user_id: id });
  }

  @Post()
  create(@Body() user: UserEntity): Promise<UserEntity> {
    console.log('user', user);
    return this.userService.create(user);
  }

  @Put(':id')
  @UseGuards(LoginAuthGuard)
  update(
    @Param('id') id: number,
    @Body() user: UserEntity
  ): Promise<UserEntity> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @Permissions('2')
  @UseGuards(LoginAuthGuard, PermissionGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  /**
   * 更新用户等级 TODO :
   */
  @Put('/updateMembershipLevel/:id')
  @Permissions('3')
  @UseGuards(LoginAuthGuard, PermissionGuard)
  updateMembershipLevel(
    @Body() body: { level: number },
    @Param('id') user_id: number
  ): Promise<UserEntity> {
    return this.userService.updateMembershipLevel(user_id, body.level);
  }
}
