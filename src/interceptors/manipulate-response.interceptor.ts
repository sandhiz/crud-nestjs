import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ManipulateResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, route } = request;
    const path = route?.path.split('/')[1];

 
    const methodActionMap = {
      POST: 'menambahkan',
      GET: 'mengambil data',
      PUT: 'memperbarui',
      DELETE: 'menghapus',
    };

    const action = methodActionMap[method] || 'melakukan aksi';
    const message = `Berhasil ${action} ${path}`;

    return next.handle().pipe(
      map(data => ({
        status: 'success',
        message,
        data,
      })),
    );
  }
}
