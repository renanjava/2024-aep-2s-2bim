import { Inject, Injectable } from '@nestjs/common';
import { UserDocument } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from 'src/common/interfaces/repositories/user-repository.interface';

@Injectable()
export class UserDeleteOneUseCase {
  constructor(
    @Inject('IUserRepository')
    private iUserRepository: IUserRepository<UserDocument, UpdateUserDto>,
  ) {}

  async execute(id: string) {
    return await this.iUserRepository.deleteById(id);
  }
}
