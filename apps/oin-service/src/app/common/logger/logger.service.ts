/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-12 18:27:41
 * @LastEditTime: 2023-09-12 18:35:54
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/common/logger/logger.service.ts
 */
import { Injectable } from '@nestjs/common';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true, // 将日志打包成zip
          maxFiles: '90d', // 最多保持90天的数据
          frequency: '1h', // 每小时创建新的日志文件
          dirname: './logs', // 存放日志的目录
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
