import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from 'src/common/interfaces/repositories/user-repository.interface';
import { UserDocument } from '../entities/user.entity';

@Injectable()
export class UserUpdateOneUseCase {
  constructor(
    @Inject('IUserRepository')
    private iUserRepository: IUserRepository<UserDocument, UpdateUserDto>,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    return await this.iUserRepository.updateById(id, updateUserDto);
  }
}
