/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 16:14:21
 * @LastEditTime: 2023-09-13 16:14:26
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/decorator/permission.decorator.ts
 */
// permission.decorator.ts

import { SetMetadata } from '@nestjs/common'

export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions)
