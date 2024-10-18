import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject('IUserRepository') private iUserRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    await this.iUserRepository.create(createUserDto as User);
  }
}
