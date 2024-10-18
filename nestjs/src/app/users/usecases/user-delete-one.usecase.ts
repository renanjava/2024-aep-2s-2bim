import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserDeleteOneUseCase {
  constructor(
    @Inject('IUserRepository') private iUserRepository: IUserRepository,
  ) {}

  async execute(id: string) {
    return await this.iUserRepository.deleteById(id);
  }
}
