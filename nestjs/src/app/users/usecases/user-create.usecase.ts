import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../entities/user.entity';
import { IUserRepository } from 'src/common/interfaces/repositories/user-repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject('IUserRepository')
    private iUserRepository: IUserRepository<UserDocument, UpdateUserDto>,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    await this.iUserRepository.create(createUserDto as UserDocument);
  }
}
