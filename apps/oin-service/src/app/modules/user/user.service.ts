/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-06 17:53:15
 * @LastEditTime: 2023-09-12 00:48:53
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/modules/user/user.service.ts
 */
/*
https://docs.nestjs.com/providers#services
*/
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { UserEntity } from '../../entitys/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.user_id',
        'user.username',
        'user.email',
        'user.created_at',
      ])
      .getRawMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.findUser({
      user_id: id,
    });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    try {
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

  async update(id: number, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return await this.findUser({ user_id: id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findUser(userInfo: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: userInfo,
    });
  }
}
