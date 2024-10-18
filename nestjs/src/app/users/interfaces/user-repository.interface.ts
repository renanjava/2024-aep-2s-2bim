import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  updateById(id: string, updateUserDto: UpdateUserDto);
  deleteById(id: string): Promise<void>;
  findOneByEmail(email: string): Promise<UserDocument>;
}
