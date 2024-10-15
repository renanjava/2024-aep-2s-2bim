import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserFindOneByEmailUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute(email: string) {
    return await this.userRepository.findOneByEmail(email);
  }
}
