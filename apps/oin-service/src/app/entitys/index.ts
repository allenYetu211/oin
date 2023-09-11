/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-11 22:44:17
 * @LastEditTime: 2023-09-11 23:57:25
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/entitys/index.ts
 */
import { UserEntity } from './user.entity';
import { MembershipLevelEntity } from './membership-level.entity';
import { SocialMediaIntegrationEntity } from './social-media-integration.entity';
import { UserLogsEntity } from './user-logs.entity';
import { UserPermissionsEntity } from './user-permissions.entity';

export const entitys = [
  UserEntity,
  MembershipLevelEntity,
  SocialMediaIntegrationEntity,
  UserLogsEntity,
  UserPermissionsEntity,
];
