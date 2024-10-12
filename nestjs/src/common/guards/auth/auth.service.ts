import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/app/application/users/services/user.service';
import { Password } from 'src/common/utils/password';

@Injectable()
export class AuthService {
  constructor(private userService: UserService){}
  async login(authDto: AuthDto) {
    const user = await this.userService.findOneByEmail(authDto.email);
    const userAutenticado = await Password.verify(
      authDto.password, 
      user.password
    )

    if(!userAutenticado)
      throw new UnauthorizedException('Email ou senha incorretos');

    console.log('autenticado');
    
  }
}
