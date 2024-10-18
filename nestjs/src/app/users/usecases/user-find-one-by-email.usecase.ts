import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserFindOneByEmailUseCase {
  constructor(
    @Inject('IUserRepository') private iUserRepository: IUserRepository,
  ) {}

  async execute(email: string) {
    return await this.iUserRepository.findOneByEmail(email);
  }
}
