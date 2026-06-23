import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { USER_REPOSITORY } from '../../shared/constants/tokens';

@Injectable()
export class ActivateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(userId: string): Promise<void> {
    // 1. Tìm kiếm User tồn tại
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng này');
    }

    // 2. Kích hoạt trạng thái (Logic nghiệp vụ check PENDING nằm trọn trong Domain này)
    user.activate();

    // 3. Cập nhật lại vào cơ sở dữ liệu
    await this.userRepository.save(user);
  }
}
