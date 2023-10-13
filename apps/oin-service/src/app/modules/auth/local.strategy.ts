/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:22:34
 * @LastEditTime: 2023-10-12 18:47:38
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/auth/local.strategy.ts
 */
// src/auth/local.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('validate', username)
    console.log('validate', password)

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
