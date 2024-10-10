import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { Token } from 'src/common/guards/auth/token';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly token: Token,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.create(createUserDto as User);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateById(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.deleteById(id);
  }

  public async login(loginUser: LoginUserDto): Promise<string> {
    const foundUser: User | null = await this.validateUsername(
      loginUser.username,
    );

    if (!foundUser) {
      throw new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
    }
    /*
    const userIsValid: boolean | null = await Password.verify(
      loginUser.password,
      foundUser.password,
    );

    if (!userIsValid) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }
  */
    return this.token.generateToken(foundUser);
  }

  async validateUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
}
