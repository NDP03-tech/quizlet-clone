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
  password: Password; // Đã có sẵn rất tốt
};

export class User {
  private constructor(private props: UserProps) {}

  // Factory cho user mới
  public static create(id: UserId, email: Email, password: Password): User {
    return new User({
      id,
      email,
      password,
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

  // 🛠️ SỬA CHỖ 1: Thêm Getter cho password để tầng Infrastructure (Mapper) có thể lấy chuỗi mật khẩu ghi vào DB
  get passwordValue(): string {
    return this.props.password.getValue();
  }

  // Domain Behavior

  // 🛠️ SỬA CHỖ 2: Thêm hàm kiểm tra mật khẩu ngay tại Entity User
  // Chúng ta truyền "hasher" qua tham số đúng theo nguyên lý đã phân tích để giữ Domain luôn sạch
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
