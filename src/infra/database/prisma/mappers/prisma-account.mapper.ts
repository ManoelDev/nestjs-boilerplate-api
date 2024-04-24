import { Account } from '@/app/account/entities/account';
import { UniqueEntityID } from '@/shared/entity/unique-entity-id';
import { Prisma, User as PrismaAccount } from '@prisma/client';

export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        twoFactorEnabled: raw.twoFactorEnabled,
        twoFactorSecret: raw.twoFactorSecret,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(account: Account): Prisma.UserUncheckedCreateInput {
    return {
      id: account.id.toString(),
      name: account.name,
      email: account.email,
      password: account.password,
      twoFactorEnabled: account.twoFactorEnabled,
      twoFactorSecret: account.twoFactorSecret,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}
