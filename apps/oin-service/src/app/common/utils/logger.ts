/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-13 10:14:21
 * @LastEditTime: 2023-09-13 11:03:06
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/common/utils/logger.ts
 */
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

enum LoggerLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

/**
 * 封装logger请求，日志中添加IP，报错时候添加错误信息
 */
class CreateLoggers {
  private winstonLogger;
  constructor() {
    this.winstonLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY/MM/DD HH:mm:ss',
        }),
        winston.format.simple(),
        winston.format.printf(({ level, label, message, timestamp }) => {
          // 最终输入的日志格式
          return `${timestamp} [${label}] ${level}: ${message}`;
        })
      ),
      transports: [
        // 文件存储名称，时间划分
        new DailyRotateFile({
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true, // 将日志打包成zip
          maxFiles: '90d', // 最多保持90天的数据
          frequency: '1h', // 每小时创建新的日志文件
          dirname: './logs', // 存放日志的目录
        }),
        new winston.transports.Console({
          level: 'info',
        }),
      ],
    });
  }

  public renderLog(method: LoggerLevel) {
    return (...args: any) => {
      const [first, ...other] = args;
      const isLabel = typeof first === 'object' && first.label;
      const message = isLabel ? other : args;

      const opt = {
        level: LoggerLevel[method],
        // 允许自定义label，便于后续检索
        label: isLabel ? first.label : 'LOG',
        message: this.renderMessage(message).join(' '),
      };

      return this.winstonLogger[method](opt);
    };
  }

  private renderMessage(message: any[]) {
    return message.map((msg) =>
      typeof msg === 'string' ? msg : JSON.stringify(msg)
    );
  }
}

const createLogger = new CreateLoggers();

// winston中有大量内置方法， 这里只是将其中部分在项目中会使用到的抽离出来。
export const logger = {
  debug: createLogger.renderLog(LoggerLevel.Debug),
  error: createLogger.renderLog(LoggerLevel.Error),
  info: createLogger.renderLog(LoggerLevel.Info),
  warn: createLogger.renderLog(LoggerLevel.Warn),
};
