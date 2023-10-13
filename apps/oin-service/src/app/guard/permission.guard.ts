/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 16:13:18
 * @LastEditTime: 2023-09-13 18:00:08
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/guard/permission.guard.ts
 */
// permission.guard.ts

import {
	Injectable,
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
// import { UserService } from './user.service'; // 导入用户服务

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector, // private readonly userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		/**jwt 解析用户数据 userid 查询的用户信息存放在 request 上，获取 role */
		const { role_id }: { role_id: number } = request.user.role

		if (!role_id) {
			return false
		}

		const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler())

		if (!requiredPermissions || !requiredPermissions[0]) {
			throw new HttpException('Permissions not defined', HttpStatus.INTERNAL_SERVER_ERROR)
		}

		const permissionRole = Number(requiredPermissions[0])

		if (isNaN(permissionRole)) {
			throw new HttpException('Invalid permission role', HttpStatus.INTERNAL_SERVER_ERROR)
		}

		const hasPermission = role_id >= permissionRole

		return hasPermission
	}
}
