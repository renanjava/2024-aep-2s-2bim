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
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRequest } from 'src/common/auth/jwt-payload/user-request.interface';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';
import { UserCreateUseCase } from '../usecases/user-create.usecase';
import { UserUpdateOneUseCase } from '../usecases/user-update-one.usecase';
import { UserFindOneUseCase } from '../usecases/user-find-one.usecase';
import { UserDeleteOneUseCase } from '../usecases/user-delete-one.usecase';
import { UserFindAllUseCase } from '../usecases/user-find-all.usecase';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(
    private readonly userCreateUseCase: UserCreateUseCase,
    private readonly userFindAllUseCase: UserFindAllUseCase,
    private readonly userFindOneUseCase: UserFindOneUseCase,
    private readonly userUpdateOneUseCase: UserUpdateOneUseCase,
    private readonly userDeleteOneUseCase: UserDeleteOneUseCase,
  ) {}

  @Post('register')
  async create(
    @Body() { password, ...createUserDto }: CreateUserDto,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    return await this.userCreateUseCase.execute({
      ...createUserDto,
      password: hashedPassword,
    } as CreateUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  async findOne(@Req() request: IUserRequest) {
    return await this.userFindOneUseCase.execute(request.user.sub);
  }

  @Get('teste')
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    return await this.userFindAllUseCase.execute();
  }

  @Patch()
  @UseGuards(AuthGuard)
  async update(
    @Req() request: IUserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userUpdateOneUseCase.execute(
      request.user.sub,
      updateUserDto,
    );
  }

  @Delete()
  @UseGuards(AuthGuard)
  async remove(@Req() request: IUserRequest) {
    return await this.userDeleteOneUseCase.execute(request.user.sub);
  }
}
