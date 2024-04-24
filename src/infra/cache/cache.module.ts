import { Module } from '@nestjs/common';

import { EnvironmentModule } from '../environment/environment.module';
import { CacheRepository } from './cache.repository';
import { RedisCacheRepository } from './redis/redis-cache-repository';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [EnvironmentModule],
  providers: [
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
