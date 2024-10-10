import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/app/interfaces/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/interfaces/dto/update-user.dto';
import { UserRepository } from 'src/app/domain/users/user.repository';
import { User } from 'src/app/domain/users/user.entity';

@Injectable()
export class UserService {
  constructor(protected readonly userRepository: UserRepository) {}

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
}
