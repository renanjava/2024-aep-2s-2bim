import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserCreateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto) {
    await this.userRepository.create(createUserDto as User);
  }
}
