import { User } from '../entity/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findByfirstName(firstName: string): Promise<User | null>;
  findBylastName(lastName: string): Promise<User | null>;
}
