import { Controller, Get, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login() {
    /**
     * Demo only
     */

    return this.authService.login({
      id: '1',
      email: 'admin@test.com',
      role: 'ADMIN',
    });
  }

  @Get('me')
  me(@Req() req) {
    return req.user;
  }
}
