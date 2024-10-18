import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Password } from 'src/common/utils/password';
import { IUserPayload } from '../jwt-payload/user-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { UserFindOneByEmailUseCase } from 'src/app/users/usecases/user-find-one-by-email.usecase';

@Injectable()
export class AuthLoginUseCase {
  constructor(
    private userFindOneByEmailUseCase: UserFindOneByEmailUseCase,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(loginAuthDto: LoginAuthDto) {
    const user = await this.userFindOneByEmailUseCase.execute(
      loginAuthDto.email,
    );
    const userAutenticado = await Password.verify(
      loginAuthDto.password,
      user.password,
    );

    if (!userAutenticado)
      throw new UnauthorizedException('Email ou senha incorretos');

    const payload: IUserPayload = {
      sub: user.id,
      username: user.username,
    };
    return {
      token_acess: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }
}
