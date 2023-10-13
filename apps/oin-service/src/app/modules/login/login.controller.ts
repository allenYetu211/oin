/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:42:26
 * @LastEditTime: 2023-10-13 17:15:20
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/login/login.controller.ts
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@server/app/guard/local-auth.guard';
import { AuthService } from '@server/app/modules/auth/auth.service';
import { UserEntity } from '@server/app/entitys/user.entity';
import { logger } from '@server/app/common/utils/logger';

@Controller('auth')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  /**
   *  账号密码登录
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: UserEntity): Promise<{ access_token: string }> {
    return await this.authService.login(user);
  }

  /**
   * 多重登录
   * 手机号、邮箱、用户名登录
   */
  @UseGuards(LocalAuthGuard)
  @Post('multiple_login')
  async multipleLogin(
    // 使用 守卫，需要传入 body 需要时 username ，以及 password 。 todo 更改方法在确认。
    @Req() req,
  ) {
    logger.info(`用户登录： ${JSON.stringify(req.user)}`)
    return this.authService.generateToken(req.user)
  }
}
