import { Module } from '@nestjs/common';
import { UserModule } from './app/application/users/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
