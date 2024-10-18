import { Controller, Post, Body } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthLoginUseCase } from './usecases/auth-login.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly authLoginUseCase: AuthLoginUseCase) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authLoginUseCase.execute(loginAuthDto);
  }
}
