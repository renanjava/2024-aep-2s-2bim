import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from 'src/app/infraestructure/adapters/http/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/app/domain/users/user.entity';
import { UserRepository } from 'src/app/domain/users/user.repository';
import { UserControllerDois } from 'src/app/infraestructure/adapters/http/user-dois.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController, UserControllerDois],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
