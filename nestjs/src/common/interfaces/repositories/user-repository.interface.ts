import { IRepository } from './base-repository.interface';

export interface IUserRepository<T, E> extends IRepository<T> {
  findOneByEmail(email: string): Promise<T>;
  findById(id: string): Promise<T | null>;
  updateById(id: string, e: E): Promise<T | undefined>;
  deleteById(id: string): Promise<void>;
}
