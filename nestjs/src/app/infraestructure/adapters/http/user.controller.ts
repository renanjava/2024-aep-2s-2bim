import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/app/application/users/services/user.service';
import { CreateUserDto } from 'src/app/interfaces/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/interfaces/dto/update-user.dto';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';

@Controller({ path: 'users', version: '1' })
export class UserController {
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
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
