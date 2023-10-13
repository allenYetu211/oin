/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:23:11
 * @LastEditTime: 2023-09-13 17:52:38
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/auth/jwt.strategy.ts
 */
// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SERVICE_SECRET_KEY || 'secret_key',
		});
	}

	async validate(payload: any) {
		/** 通过 jwt 解析的 user_id 查询相关的用户信息 */
		const user = await this.authService.validateUserById(payload.sub);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
