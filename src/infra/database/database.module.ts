import { AccountsRepository } from '@/app/account/repositories/accounts.repository';
import { NotificationsRepository } from '@/app/notification/repositories/notifications.repository';
import { Module } from '@nestjs/common';

import { CacheModule } from '../cache/cache.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAccountsRepository } from './prisma/repositories/prisma-account.repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications.repository';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    { provide: AccountsRepository, useClass: PrismaAccountsRepository },
    PrismaAccountsRepository,
    { provide: NotificationsRepository, useClass: PrismaNotificationsRepository },
  ],
  exports: [PrismaService, AccountsRepository, NotificationsRepository, PrismaAccountsRepository],
})
export class DataBaseModule {}
