import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/app/interfaces/dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find().select(['-password', '-email']);
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select(['-password', '-email']);
  }

  public async updateById(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.updateOne({ _id: id }, updateUserDto);
    return this.findById(id);
  }

  public async deleteById(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }

  public async findOneByEmail(email: string): Promise<UserDocument>{
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`Usuário com o email ${email} não encontrado`);
    }
    return user;
  }
}
