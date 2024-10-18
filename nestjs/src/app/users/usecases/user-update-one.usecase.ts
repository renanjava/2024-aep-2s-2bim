import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserUpdateOneUseCase {
  constructor(
    @Inject('IUserRepository') private iUserRepository: IUserRepository,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    return await this.iUserRepository.updateById(id, updateUserDto);
  }
}
