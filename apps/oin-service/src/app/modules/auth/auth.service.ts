/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:15:00
 * @LastEditTime: 2023-10-13 17:09:21
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/auth/auth.service.ts
 */
// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@server/app/entitys/user.entity';
import { UserService } from '@server/app/modules/user/user.service';
import { isEmail } from 'class-validator';
import { isChinesePhoneNumber } from '@oin/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserEntity | null> {
    // 根据用户名和密码查询用户，验证用户信息是否正确
    // 如果验证通过，返回用户对象；否则，返回null
    /**
     * 1. 走守卫进行校验获取用户身份。
     */
    let type: 'username' | 'email' | 'phone' = 'username';
    if (isEmail(username)) {
      type = 'email';
    } else if (isChinesePhoneNumber(username)) {
      type = 'phone';
    }
    return await this.multipleLogin(username, password, type);
  }

  async validateUserById(user_id: string): Promise<UserEntity | null> {
    return await this.userService.findOne({ user_id });
  }

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const u = await this.userService.findOne({
      username: user.username,
      password: user.password,
    });
    const payload = { sub: u.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * 多方式获取用户身份
   */
  async multipleLogin(
    account: string,
    password: string,
    type: 'username' | 'email' | 'phone'
  ): Promise<UserEntity> {
    return await this.userService.findOne({
      [type]: account,
      password: password,
    });
  }

  /**
   * 创建 token
   */
  async generateToken(user: UserEntity):  Promise<{ access_token: string }> {
    const payload = { sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
