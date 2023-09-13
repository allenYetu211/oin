/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-12 15:22:19
 * @LastEditTime: 2023-09-12 17:35:35
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/role/role.service.ts
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleEntity } from '~server/app/entitys/user-role.entity';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly roleRepository: Repository<UserRoleEntity>
  ) {}

  async onModuleInit() {
    await this.createDefaultRoles();
  }

  private async createDefaultRoles() {
    const defaultRoles = [
      { role_name: '普通用户', role_id: 1 },
      { role_name: '管理员', role_id: 2 },
      { role_name: '所有者', role_id: 3 },
    ];

    for (const role of defaultRoles) {
      const existingRole = await this.roleRepository.findOne({
        where: { role_id: role.role_id },
      });

      if (!existingRole) {
        const newRole = this.roleRepository.create(role);
        await this.roleRepository.save(newRole);
      }
    }
  }

  /**
   * findone
   */
  public async findOne(role_id: number) {
    return this.roleRepository.findOne({ where: { role_id } });
  }
}
