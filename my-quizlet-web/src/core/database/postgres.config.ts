import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host:
    process.env.POSTGRES_HOST ||
    'postgres://quizlet_admin:phuc2112003@localhost:5432/quizlet_db',
  synchronize: process.env.NODE_ENV !== 'production',
  extra: {
    max: parseInt(process.env.DATABASE_POOL_SIZE || '50', 10), // Mở sẵn tối đa 50 kết nối xếp hàng trong RAM
    idleTimeoutMillis: 30000, // Tự động ngắt các kết nối rảnh sau 30 giây để tiết kiệm tài nguyên
    connectionTimeoutMillis: 2000, // Nếu DB quá tải, đợi 2 giây không được thì báo lỗi luôn, không bắt User treo màn hình
  },
};
