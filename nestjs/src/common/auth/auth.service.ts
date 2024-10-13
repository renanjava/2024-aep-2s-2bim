import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/app/application/users/services/user.service';
import { Password } from 'src/common/utils/password';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from 'src/app/interfaces/jwt-payload/user-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ){}
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findOneByEmail(loginAuthDto.email);
    const userAutenticado = await Password.verify(
      loginAuthDto.password, 
      user.password
    )

    if(!userAutenticado)
      throw new UnauthorizedException('Email ou senha incorretos');

    const payload: IUserPayload = {
      sub: user.id,
      username: user.username,
    }
    return {
      token_acess: await this.jwtService.signAsync(payload, { secret: this.configService.get<string>('JWT_SECRET')}),
    }
  }
}
