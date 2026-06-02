import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient!: Redis;

  onModuleInit() {
    // Nhận đường link kết nối từ Docker Compose
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    this.redisClient = new Redis(redisUrl);
  }

  // Hàm Get Cache tiện ích
  async get(key: string): Promise<any> {
    const data = await this.redisClient.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  // Hàm Set Cache kèm thời gian hết hạn (TTL tính bằng giây)
  async set(key: string, value: any, ttlInSeconds: number): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
  }

  // Hàm xóa Cache khi dữ liệu bị thay đổi (để tránh lệch dữ liệu)
  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  onModuleDestroy() {
    // Ngắt kết nối an toàn khi tắt Server
    this.redisClient.quit();
  }
}
