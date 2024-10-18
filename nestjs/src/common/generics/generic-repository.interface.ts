export interface IRepository<T, E> {
  create(t: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  updateById(id: string, e: E): Promise<T | undefined>;
  deleteById(id: string): Promise<void>;
  findOneByEmail(email: string): Promise<T>;
}
