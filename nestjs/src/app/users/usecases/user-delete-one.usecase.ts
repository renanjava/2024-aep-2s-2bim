import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserDeleteOneUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute(id: string) {
    return await this.userRepository.deleteById(id);
  }
}
