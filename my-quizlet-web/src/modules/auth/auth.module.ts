import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';

import { ConfigService } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,

    PassportModule,

    JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        // Prefer explicit env/config value. In development, fall back to a safe default.
        const jwtSecret =
          configService.get<string>('JWT_SECRET') ?? process.env.JWT_SECRET;
        const env = process.env.NODE_ENV ?? 'development';

        if (!jwtSecret && env === 'production') {
          // In production we require a secret to be explicitly set
          throw new Error('JWT_SECRET is not configured');
        }

        const secret = jwtSecret ?? 'dev-secret-please-change';
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN') ?? '15m';

        return {
          secret,
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
    }),

    UsersModule,
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],

  exports: [AuthService, JwtModule],
})
export class AuthModule {}
