/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 17:53:15
 * @LastEditTime: 2023-09-12 18:32:46
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/user/user.service.ts
 */
/*
https://docs.nestjs.com/providers#services
*/
import { Injectable, ConflictException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { UserEntity } from '../../entitys/user.entity';
import { MembershipService } from '../membership/membership.service';
import { RoleService } from '../role/role.service';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly membershipService: MembershipService,
    private readonly roleService: RoleService,
    private readonly logger: LoggerService
  ) {}

  async onModuleInit() {
    await this.createInitialDefaultUser();
  }

  private async createInitialDefaultUser() {
    try {
      const defaultUser: Partial<UserEntity> = {
        username: process.env.OIN_USERNAME,
        password: process.env.OIN_PASSWORD,
        email: '',
      };
      const membershipLevel = await this.membershipService.findMembershipLevel(
        999
      );
      const role = await this.roleService.findOne(3);
      defaultUser.membershipLevel = membershipLevel;
      defaultUser.role = role;
      await this.userRepository.save(defaultUser);
    } catch (e) {}
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.user_id',
        'user.username',
        'user.email',
        'user.created_at',
        'user.membershipLevel',
      ])
      .getRawMany();
  }

  async findOne(user_id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { user_id },
      select: ['user_id', 'username', 'email', 'created_at', 'updated_at'],
      relations: ['membershipLevel'],
    });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      /**
       * 新建用户默认等级 为 1
       */
      const membershipLevel = await this.membershipService.findMembershipLevel(
        1
      );
      const role = await this.roleService.findOne(1);
      user.membershipLevel = membershipLevel;
      user.role = role;
      this.logger.log(JSON.stringify(user));
      return await this.userRepository.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        throw new ConflictException(
          `Duplicate entry for ${error.message.split("'")[1]}`
        );
      }
      throw error;
    }
  }

  async update(user_id: number, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(user_id, user);
    return await this.findOne(user_id);
  }

  async remove(user_id: number): Promise<void> {
    await this.userRepository.delete(user_id);
  }

  async updateMembershipLevel(
    user_id: number,
    level_id: number
  ): Promise<UserEntity> {
    const membershipLevel = await this.membershipService.findMembershipLevel(
      level_id
    );
    await this.userRepository.update(user_id, { membershipLevel });
    return await this.userRepository.findOne({
      where: { user_id },
      select: ['user_id', 'username', 'email'],
      relations: ['membershipLevel'],
    });
  }
}
