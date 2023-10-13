/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-12 00:24:10
 * @LastEditTime: 2023-09-14 10:18:18
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/filters/duplicate-exception.filter.ts
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError) // 捕获 QueryFailedError 异常
export class DuplicateExceptionFilter implements ExceptionFilter {
	catch(exception: QueryFailedError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		// 返回 HTTP 409 响应，表示冲突，并返回一个包含错误信息的 JSON 对象
		response.status(HttpStatus.CONFLICT).json({
			statusCode: HttpStatus.CONFLICT,
			message: 'Duplicate entry', // 错误信息为“Duplicate entry”（重复条目）
		})
	}
}
