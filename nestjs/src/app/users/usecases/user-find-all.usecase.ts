import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserFindAllUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
