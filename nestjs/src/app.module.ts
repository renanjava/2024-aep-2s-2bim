import { Module } from '@nestjs/common';
import { UserModule } from './app/application/users/modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/aep-teste2',
    ),
    UserModule,
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
  providers: [],
})
export class AppModule {}
