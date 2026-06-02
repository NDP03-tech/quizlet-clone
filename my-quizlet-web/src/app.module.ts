import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './core/database/postgres.config';
import { RedisService } from './core/redis/redis.service';
import { AuthModule } from './modules/auth/auth.module';
import { StudySetsModule } from './modules/study-sets/study-sets.module';
import { ProgressModule } from './modules/progress/progress.module';
import { TestsModule } from './modules/tests/tests.module';

@Global() // 1. Biến RedisService thành Global (Toàn cục)
@Module({
  imports: [
    // 2. Nạp file cấu hình môi trường (.env) toàn hệ thống
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 3. Kích hoạt kết nối database PostgreSQL (Sử dụng config có Connection Pool)
    TypeOrmModule.forRoot(postgresConfig),

    // 4. Các module nghiệp vụ của bạn
    AuthModule,
    StudySetsModule,
    ProgressModule,
    TestsModule,
  ],
  controllers: [],
  providers: [RedisService], // 5. Khai báo RedisService làm Provider
  exports: [RedisService], // 6. Export ra để tất cả các module khác tự động được xài
})
export class AppModule {}
