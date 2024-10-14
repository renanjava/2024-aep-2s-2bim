import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { IUserRequest } from 'src/app/interfaces/jwt-payload/user-request.interface';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private nativeLogger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = context.switchToHttp();
    const request = contextoHttp.getRequest<Request | IUserRequest>();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request)
          this.nativeLogger.log(
            `Rota acessada pelo usuário ${request.user.sub}`,
          );
      }),
    );
  }
}
