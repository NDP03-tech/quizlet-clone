import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

import { Public } from './decorators/public.decorator';
import { LoginDto } from '../users/application/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  me(@Req() req) {
    return req.user;
  }
}
