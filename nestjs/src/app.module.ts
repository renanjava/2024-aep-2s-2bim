import { ConsoleLogger, Module } from '@nestjs/common';
import { UserModule } from './app/application/users/modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './common/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { GlobalLoggerInterceptor } from './common/interceptors/global-logger.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/aep-teste2',
    ),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`,
          ttl: 3600,
        });
        return { store };
      },
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggerInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
