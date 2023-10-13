/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:42:26
 * @LastEditTime: 2023-10-12 18:46:26
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/login/login.controller.ts
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@server/app/guard/local-auth.guard';
import { AuthService } from '@server/app/modules/auth/auth.service';
import { UserEntity } from '@server/app/entitys/user.entity';
import { isEmail, isPhoneNumber } from 'class-validator';
import {isChinesePhoneNumber} from  '@oin/utils'

@Controller('auth')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  /**
   *  账号密码登录
   */
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Body() user: UserEntity): Promise<{ access_token: string }> {
  //   return await this.authService.login(user);
  // }

  /**
   * 多重登录
   * 手机号、邮箱、用户名登录
   */
  @UseGuards(LocalAuthGuard)
  @Post('multiple_login')
  async multipleLogin(
    @Body() multiples: { multiple: string; password: string }
  ) {
    const { multiple, password } = multiples;
    // 判断 multiple类型，选择不同的登录方式
    let type: 'username' | 'email' | 'phone' = 'username';
    if (isEmail(multiple)) {
      type = 'email'
    } else if (isChinesePhoneNumber(multiple)) {
      type = 'phone'
    }

    return await this.authService.multipleLogin(multiple, password, type);
  }
}
