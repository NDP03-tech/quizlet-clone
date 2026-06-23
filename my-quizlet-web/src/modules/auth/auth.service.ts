import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUseCase } from '../users/application/use-case/login.use-case';
import { LoginDto } from '../users/application/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.loginUseCase.execute(dto);
    const payload: JwtPayload = {
      id: user.id,
      username: user.email,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string) {
    try {
      return await this.loginUseCase.execute({ email, password });
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
