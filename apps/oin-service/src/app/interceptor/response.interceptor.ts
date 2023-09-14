/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-09-14 10:06:41
 * @LastEditTime: 2023-09-14 10:13:18
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /oin/apps/oin-service/src/app/interceptor/response.interceptor.ts
 */
/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ResponseSucceedDTO } from '~server/app/dto/common.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('ResponseInterceptor Before...', context);
    // return next.handle().pipe(tap(() => console.log(`After...`)));

    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        const message = 'succeed';
        return new ResponseSucceedDTO(statusCode, message, data);
      })
    );
  }
}
