import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

import { EnvironmentService } from '../../environment/environment.service';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envService: EnvironmentService) {
    super({
      port: envService.get('REDIS_PORT'),
      host: envService.get('REDIS_HOST'),
      db: envService.get('REDIS_DB'),
    });
  }

  onModuleDestroy() {
    return this.disconnect();
  }
}
