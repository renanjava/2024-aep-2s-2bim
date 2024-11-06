import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { IUserRequest } from '../auth/jwt-payload/user-request.interface';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private nativeLogger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request | IUserRequest>();
    const response = httpContext.getResponse<Response>();

    const { url, method } = request;
    const { statusCode } = response;
    const beforeController = Date.now();

    this.nativeLogger.log(`${method} ${url}`);
    return next.handle().pipe(
      tap(() => {
        if ('user' in request)
          this.nativeLogger.log(
            `Rota acessada pelo usuário ${request.user.sub}`,
          );
        const requestTime = Date.now() - beforeController;
        this.nativeLogger.log(
          `Response: statusCode ${statusCode} - requestTime ${requestTime}ms`,
        );
      }),
    );
  }
}
