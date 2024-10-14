import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRequest } from 'src/common/auth/jwt-payload/user-request.interface';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';

@Controller({ path: 'users', version: '2' })
export class UserControllerDois {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(
    @Body() { password, ...createUserDto }: CreateUserDto,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    return await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    } as CreateUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  async findOne(@Req() request: IUserRequest) {
    return await this.userService.findOne(request.user.sub);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async update(
    @Req() request: IUserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(request.user.sub, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async remove(@Req() request: IUserRequest) {
    return await this.userService.remove(request.user.sub);
  }
}
