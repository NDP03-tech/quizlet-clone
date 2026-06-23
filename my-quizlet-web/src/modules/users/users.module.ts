import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { RegisterUserUseCase } from './application/use-case/register-user.use-case';
import { LoginUseCase } from './application/use-case/login.use-case';
import { ActivateUserUseCase } from './application/use-case/activate-user.use-case';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/user-orm.entity';
import { TypeOrmUserRepository } from './infrastructure/persistence/typeorm/typeorm-user.repository';
import { BcryptHasher } from './infrastructure/hash/bcrypt-hasher';
import { PASSWORD_HASHER, USER_REPOSITORY } from './shared/constants/tokens';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    RegisterUserUseCase,
    LoginUseCase,
    ActivateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptHasher,
    },
  ],
  exports: [RegisterUserUseCase, LoginUseCase, ActivateUserUseCase],
})
export class UsersModule {}
