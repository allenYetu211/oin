import { PhoneVerificationController } from './phone-verification.controller'
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { PhoneVerificationService } from './phone-verification.service'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PhoneVerificationEntity } from '@server/app/entitys/phone-verification.entity'

@Module({
	imports: [TypeOrmModule.forFeature([PhoneVerificationEntity])],
	controllers: [PhoneVerificationController],
	providers: [PhoneVerificationService],
	exports: [PhoneVerificationService],
})
export class PhoneVerificationModule {}
