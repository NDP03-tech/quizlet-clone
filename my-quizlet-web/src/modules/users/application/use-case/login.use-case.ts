import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { IPasswordHasher } from '../../domain/interfaces/password-hasher.interface';
import { LoginDto } from '../dto/login.dto';
import {
  PASSWORD_HASHER,
  USER_REPOSITORY,
} from '../../shared/constants/tokens';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  public async execute(
    dto: LoginDto,
  ): Promise<{ id: string; email: string; role: string }> {
    // 1. Kiểm tra tài khoản tồn tại
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );
    }

    // 2. Gọi hàm so sánh mật khẩu đóng gói sẵn bên trong thực thể User Domain
    const isPasswordValid = await user.comparePassword(
      dto.password,
      this.passwordHasher,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );
    }

    // 3. Trả về thông tin thô cơ bản (để Controller bọc JWT bên ngoài)
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
