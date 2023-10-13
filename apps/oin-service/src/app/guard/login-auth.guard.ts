/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 11:39:37
 * @LastEditTime: 2023-09-13 14:57:08
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/guard/login-auth.guard.ts
 */
/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LoginAuthGuard extends AuthGuard('jwt') {}
