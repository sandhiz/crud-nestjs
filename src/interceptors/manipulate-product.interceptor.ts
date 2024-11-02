import {Injectable,NestInterceptor,ExecutionContext,CallHandler} from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ManipulateProductInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
  
      if (request.body) {
        request.body.createDate = new Date();
        request.body.isActive = request.body.isActive !== undefined
          ? request.body.isActive
          : false; 
      }
  
      return next.handle().pipe(
        map(data => {
          response.setHeader('headername', 'manipulasiheader');
          return data;
        }),
      );
    }
  }
  