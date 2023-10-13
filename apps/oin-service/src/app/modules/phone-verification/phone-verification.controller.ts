/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-10-12 14:28:35
 * @LastEditTime: 2023-10-12 14:41:42
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/phone-verification/phone-verification.controller.ts
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { PhoneVerificationService } from './phone-verification.service';

@Controller('verification')
export class PhoneVerificationController {
	constructor(private readonly phoneVerificationService: PhoneVerificationService) {}

	/**
	 * 获取手机验证码。
	 * todo：增加图片验证创建生成
	 */
	@Post('/phone')
	public async obtainPhoneVerificationCode(@Body() { phone }: { phone: string }) {
		return this.phoneVerificationService.generateAndSaveVerificationCode(phone);
	}
}
