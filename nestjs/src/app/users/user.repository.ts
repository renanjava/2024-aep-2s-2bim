import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './interfaces/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.userModel.find().select(['-password']);
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).select(['-password']);
  }

  public async updateById(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.updateOne({ _id: id }, updateUserDto);
    return this.findById(id);
  }

  public async deleteById(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }

  public async findOneByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(
        `Usuário com o email ${email} não encontrado`,
      );
    }
    return user;
  }
}
