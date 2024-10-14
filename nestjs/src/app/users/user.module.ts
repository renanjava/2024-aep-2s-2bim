import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserControllerDois } from './controllers/user-dois.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController, UserControllerDois],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
