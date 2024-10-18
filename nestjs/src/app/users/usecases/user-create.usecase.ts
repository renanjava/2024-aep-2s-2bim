import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../entities/user.entity';
import { IRepository } from 'src/common/generics/generic-repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject('IUserRepository')
    private iUserRepository: IRepository<UserDocument, UpdateUserDto>,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    await this.iUserRepository.create(createUserDto as UserDocument);
  }
}
