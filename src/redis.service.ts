import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor(private readonly configService: ConfigService) {
    const redisHost = this.configService.get<string>('REDIS_HOST');
    const redisPort = this.configService.get<number>('REDIS_PORT');

    this.redis = new Redis({
      host: redisHost,
      port: redisPort,
    });

    this.redis.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.redis.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  get client() {
    return this.redis;
  }
}
