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

@UseGuards(AuthGuard)
@Controller({ path: 'users', version: '2' })
export class UserControllerDois {
  constructor(private readonly userService: UserService) {}

  @Post()
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
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
