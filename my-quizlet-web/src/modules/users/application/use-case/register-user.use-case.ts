import { Injectable, ConflictException, Inject } from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { IPasswordHasher } from '../../domain/interfaces/password-hasher.interface';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { User } from '../../domain/entity/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import {
  PASSWORD_HASHER,
  USER_REPOSITORY,
} from '../../shared/constants/tokens';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  public async execute(dto: RegisterUserDto): Promise<void> {
    // 1. Kiểm tra trùng lặp email
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email này đã được đăng ký hệ thống');
    }

    // 2. Đưa vào Domain Value Objects tự kiểm tra định dạng & regex hợp lệ
    const domainEmail = Email.create(dto.email);
    const plainPassword = Password.createFromPlain(dto.password);

    // 3. Tiến hành băm mật khẩu
    const hashedPassword = await plainPassword.toHash(this.passwordHasher);

    // 4. Khởi tạo thực thể User mới nguyên bản (mặc định ROLE.USER, PENDING)
    const newUser = User.create(
      UserId.generate(),
      domainEmail,
      hashedPassword,
      dto.firstName,
      dto.lastName,
    );

    // 5. Ra lệnh lưu xuống Database
    await this.userRepository.save(newUser);
  }
}
