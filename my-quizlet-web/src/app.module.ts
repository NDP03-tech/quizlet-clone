import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { ProgressModule } from './modules/progress/progress.module';
import { StudySetsModule } from './modules/study-sets/study-sets.module';
import { TestsModule } from './modules/tests/tests.module';
import { UsersModule } from './modules/users/users.module';

import { postgresConfig } from './core/database/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      ...postgresConfig,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProgressModule,
    StudySetsModule,
    TestsModule,
    UsersModule,
  ],
})
export class AppModule {}
