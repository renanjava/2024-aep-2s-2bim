export interface IRepository<T> {
  create(t: T): Promise<T>;
  findAll(): Promise<T[]>;
}
