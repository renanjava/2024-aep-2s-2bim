import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserControllerDois } from './controllers/user-dois.controller';
import { UserCreateUseCase } from './usecases/user-create.usecase';
import { UserFindAllUseCase } from './usecases/user-find-all.usecase';
import { UserFindOneUseCase } from './usecases/user-find-one.usecase';
import { UserDeleteOneUseCase } from './usecases/user-delete-one.usecase';
import { UserUpdateOneUseCase } from './usecases/user-update-one.usecase';
import { UserFindOneByEmailUseCase } from './usecases/user-find-one-by-email.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController, UserControllerDois],
  providers: [
    UserCreateUseCase,
    UserFindAllUseCase,
    UserFindOneUseCase,
    UserDeleteOneUseCase,
    UserUpdateOneUseCase,
    UserFindOneByEmailUseCase,
    UserRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserRepository,
    },
  ],
  exports: [
    UserCreateUseCase,
    UserFindAllUseCase,
    UserFindOneUseCase,
    UserDeleteOneUseCase,
    UserUpdateOneUseCase,
    UserFindOneByEmailUseCase,
  ],
})
export class UserModule {}
