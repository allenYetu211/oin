// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@server/app/entitys/user.entity';
import { UserService } from '@server/app/modules/user/user.service';

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
    return await this.userService.findOne({ username, password });
  }

  async validateUserById(user_id: number): Promise<UserEntity | null> {
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
}
