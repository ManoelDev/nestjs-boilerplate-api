import { Account, AccountProps } from '@/app/account/entities/account';
import { faker } from '@faker-js/faker';

export function makeAccount(override: Partial<AccountProps> = {}) {
  const student = Account.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    twoFactorEnabled: false,
    twoFactorSecret: null,
    updatedAt: null,
    ...override,
  });

  return student;
}
