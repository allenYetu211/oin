/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-14 10:18:58
 * @LastEditTime: 2023-10-13 16:33:30
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/filters/global-exception.filter.ts
 */
// global-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { ResponseErrorDTO } from '@server/app/dto/common.dto'
import { logger } from '@server/app/common/utils/logger'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()

		let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
		let message = 'Server Interior Error'

		if (exception instanceof HttpException) {
			statusCode = exception.getStatus()
			message = exception.message
		}

		logger.error(`${statusCode} : ${message}`)
		const errorResponse = new ResponseErrorDTO(statusCode, message)

		response.status(statusCode).json(errorResponse)
	}
}
