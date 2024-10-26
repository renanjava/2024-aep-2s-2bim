import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/common/interfaces/repositories/user-repository.interface';
import { UserDocument } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserFindOneUseCase {
  constructor(
    @Inject('IUserRepository')
    private iUserRepository: IUserRepository<UserDocument, UpdateUserDto>,
  ) {}

  async execute(id: string) {
    return await this.iUserRepository.findById(id);
  }
}
