/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { UserRoleEntity } from '@server/app/entitys/user-role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserRoleEntity])],
	controllers: [],
	providers: [RoleService],
	exports: [RoleService],
})
export class RoleModule {}
