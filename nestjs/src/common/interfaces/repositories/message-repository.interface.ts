import { IRepository } from './base-repository.interface';

export interface IMessageRepository<T, E> extends IRepository<T> {
  findAllByUserId(userId: string): Promise<T[]>;
  findById(userId: string, messageId: string): Promise<T | null>;
  updateById(userId: string, messageId: string, e: E): Promise<T | undefined>;
  deleteById(userId: string, messageId: string): Promise<void>;
}
