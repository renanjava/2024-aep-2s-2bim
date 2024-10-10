import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserControllerDois } from './user-dois.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Token } from 'src/common/guards/auth/token';
import { JwtStrategy } from 'src/common/guards/auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60min' },
      }),
    }),
  ],
  controllers: [UserController, UserControllerDois],
  providers: [
    UserService,
    UserRepository,
    JwtService,
    ConfigService,
    Token,
    JwtStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
