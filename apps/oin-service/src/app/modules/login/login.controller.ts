/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:42:26
 * @LastEditTime: 2023-09-13 17:28:55
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/login/login.controller.ts
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '~server/app/guard/local-auth.guard';
import { AuthService } from '~server/app/modules/auth/auth.service';
import { UserEntity } from '~server/app/entitys/user.entity';

@Controller('auth')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: UserEntity): Promise<{ access_token: string }> {
    return await this.authService.login(user);
  }
}
