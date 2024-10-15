import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserUpdateOneUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateById(id, updateUserDto);
  }
}
