import { Account } from '@/app/account/entities/account';
import { AccountsRepository } from '@/app/account/repositories/accounts.repository';
import { Injectable } from '@nestjs/common';

import { PrismaAccountMapper } from '../mappers/prisma-account.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(
    private prismaService: PrismaService,
    // private cache: CacheRepository,
  ) {}

  async findById(id: string) {
    // const cacheHit = await this.cache.get(`account:${id}`);

    // if (cacheHit) {
    //   const cacheData = JSON.parse(cacheHit);
    //   return PrismaAccountMapper.toDomain(cacheData);
    // }

    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) return null;
    const account = PrismaAccountMapper.toDomain(user);

    // this.cache.set(`account:${account.id.toString()}`, JSON.stringify(account));
    return account;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) return null;
    return PrismaAccountMapper.toDomain(user);
  }

  async create(account: Account) {
    await this.prismaService.user.create({ data: PrismaAccountMapper.toPersistence(account) });
  }

  async save(account: Account) {
    await this.prismaService.user.update({
      where: { id: account.id.toString() },
      data: PrismaAccountMapper.toPersistence(account),
    });

    // this.cache.delete(`account:${account.id.toString()}:*`);
  }

  async delete(id: string) {
    await this.prismaService.user.delete({ where: { id } });
  }
}
