import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { RegisterUserDto } from './application/dto/register-user.dto';
import { LoginDto } from './application/dto/login.dto';
import { RegisterUserUseCase } from './application/use-case/register-user.use-case';
import { LoginUseCase } from './application/use-case/login.use-case';
import { ActivateUserUseCase } from './application/use-case/activate-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly activateUserUseCase: ActivateUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    await this.registerUserUseCase.execute(dto);
    return { status: 'registered' };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Patch(':id/activate')
  async activate(@Param('id') id: string) {
    await this.activateUserUseCase.execute(id);
    return { status: 'activated' };
  }
}
