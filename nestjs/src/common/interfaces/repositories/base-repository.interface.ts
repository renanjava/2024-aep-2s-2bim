export interface IRepository<T> {
  create(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
}
