import { User } from '../entity/user.entity';
import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';
export abstract class UserRepository {
  abstract findById(id: UserId): Promise<User | null>;

  abstract findByEmail(email: Email): Promise<User | null>;

  abstract save(user: User): Promise<void>;
}
