import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Password } from 'src/common/utils/password';
import { IUserPayload } from '../jwt-payload/user-payload.interface';
import { UserService } from 'src/app/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from '../dto/login-auth.dto';

@Injectable()
export class AuthLoginUseCase {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findOneByEmail(loginAuthDto.email);
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
