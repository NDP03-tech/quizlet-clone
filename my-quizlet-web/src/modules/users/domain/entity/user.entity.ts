import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';
import { Password } from '../value-objects/password.vo';
import { IPasswordHasher } from '../interfaces/password-hasher.interface'; // Import interface máy băm của bạn vào đây

import { Role } from '../enums/role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { InvalidUserStatusException } from '../exceptions/invalid-user-status.exception';

export type UserProps = {
  id: UserId;
  email: Email;
  role: Role;
  status: UserStatus;
  firstName: string;
  lastName: string;
  password: Password;
};

export class User {
  private constructor(private props: UserProps) {}

  public static create(
    id: UserId,
    email: Email,
    password: Password,
    firstName: string,
    lastName: string,
  ): User {
    return new User({
      id,
      email,
      password,
      firstName,
      lastName,
      role: Role.USER,
      status: UserStatus.PENDING,
    });
  }

  // Rehydrate từ DB
  public static restore(props: UserProps): User {
    return new User(props);
  }

  // Getters

  get id(): string {
    return this.props.id.getValue();
  }

  get email(): string {
    return this.props.email.getValue();
  }

  get role(): Role {
    return this.props.role;
  }

  get status(): UserStatus {
    return this.props.status;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get passwordValue(): string {
    return this.props.password.getValue();
  }

  public async comparePassword(
    plainText: string,
    hasher: IPasswordHasher,
  ): Promise<boolean> {
    return this.props.password.compare(plainText, hasher);
  }

  public activate(): void {
    if (this.props.status !== UserStatus.PENDING) {
      throw new InvalidUserStatusException(
        'Only PENDING user can be activated',
      );
    }

    this.props.status = UserStatus.ACTIVE;
  }

  public deactivate(): void {
    if (this.props.status === UserStatus.INACTIVE) {
      throw new InvalidUserStatusException('User already inactive');
    }

    this.props.status = UserStatus.INACTIVE;
  }

  public assignAdminRole(): void {
    if (this.props.role === Role.ADMIN) {
      return;
    }

    this.props.role = Role.ADMIN;
  }

  public isActive(): boolean {
    return this.props.status === UserStatus.ACTIVE;
  }

  public isAdmin(): boolean {
    return this.props.role === Role.ADMIN;
  }
}
