import { Module } from '@nestjs/common';
import { UserModule } from './app/application/users/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/aep-2024-2sem-2bim'),
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
