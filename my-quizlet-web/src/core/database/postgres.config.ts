import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Prefer a full DATABASE_URL / POSTGRES_URL, otherwise build from parts or fallback to local dev
const defaultUrl =
  'postgres://quizlet_admin:phuc2112003@localhost:5432/quizlet_db';
const databaseUrl =
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? defaultUrl;

export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  // Use `url` so TypeORM accepts a full connection string instead of trying to resolve it as a host
  url: databaseUrl,
  synchronize: process.env.NODE_ENV !== 'production',
  extra: {
    max: parseInt(process.env.DATABASE_POOL_SIZE || '50', 10), // Max pooled connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
};
