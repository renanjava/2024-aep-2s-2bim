import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserFindOneUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute(id: string) {
    return await this.userRepository.findById(id);
  }
}
