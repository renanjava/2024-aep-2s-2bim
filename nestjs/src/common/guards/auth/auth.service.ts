import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/app/application/users/services/user.service';
import { Password } from 'src/common/utils/password';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from 'src/app/interfaces/jwt-payload/user-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ){}
  async login(authDto: AuthDto) {
    const user = await this.userService.findOneByEmail(authDto.email);
    const userAutenticado = await Password.verify(
      authDto.password, 
      user.password
    )

    if(!userAutenticado)
      throw new UnauthorizedException('Email ou senha incorretos');

    const payload: IUserPayload = {
      sub: user.id,
      nomeUsuario: user.username,
    }
    return {
      token_acesso: await this.jwtService.signAsync(payload),
    }
  }
}
