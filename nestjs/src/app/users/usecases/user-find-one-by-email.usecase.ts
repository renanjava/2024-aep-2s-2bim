import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../common/generics/generic-repository.interface';
import { UserDocument } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserFindOneByEmailUseCase {
  constructor(
    @Inject('IUserRepository')
    private iUserRepository: IRepository<UserDocument, UpdateUserDto>,
  ) {}

  async execute(email: string) {
    return await this.iUserRepository.findOneByEmail(email);
  }
}