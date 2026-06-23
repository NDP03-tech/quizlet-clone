import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from './user-orm.entity';
import { IUserRepository } from '../../../domain/interfaces/user-repository.interface';
import { User } from '../../../domain/entity/user.entity';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Role } from '../../../domain/enums/role.enum';
import { UserStatus } from '../../../domain/enums/user-status.enum';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });
    if (!entity) {
      return null;
    }
    return this.toDomain(entity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      return null;
    }
    return this.toDomain(entity);
  }

  async findByfirstName(firstName: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { firstName } });
    if (!entity) {
      return null;
    }
    return this.toDomain(entity);
  }

  async findBylastName(lastName: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { lastName } });
    if (!entity) {
      return null;
    }
    return this.toDomain(entity);
  }

  async save(user: User): Promise<void> {
    const entity = this.repository.create({
      id: user.id,
      email: user.email,
      password: user.passwordValue,
      role: user.role,
      status: user.status,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    await this.repository.save(entity);
  }

  private toDomain(entity: UserOrmEntity): User {
    return User.restore({
      id: UserId.create(entity.id),
      email: Email.create(entity.email),
      password: Password.createFromHash(entity.password),
      role: entity.role as Role,
      status: entity.status as UserStatus,
      firstName: entity.firstName,
      lastName: entity.lastName,
    });
  }
}
