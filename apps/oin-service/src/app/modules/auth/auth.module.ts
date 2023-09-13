/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:14:47
 * @LastEditTime: 2023-09-13 15:20:12
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/auth/auth.module.ts
 */
import { Module } from '@nestjs/common';
import { UserModule } from '~server/app/modules/user/user.module';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

/*
https://docs.nestjs.com/modules
*/

console.log(
  'imports: process.env.SERVICE_SECRET_KEY',
  process.env.SERVICE_SECRET_KEY
);

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SERVICE_SECRET_KEY || 'secret_key', // 这个应该是一个安全的密钥，用于JWT签名
      signOptions: { expiresIn: '1h' }, // 设置JWT的过期时间
    }),
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
