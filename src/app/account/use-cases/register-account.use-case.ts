import { Either, left, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';

import { HashGenerator } from '../cryptography/hash-generator';
import { Account } from '../entities/account';
import { AccountsRepository } from '../repositories/accounts.repository';
import { AccountAlreadyExists } from './errors/account-already-existis';

interface Input {
  name: string;
  email: string;
  password: string;
}

type Output = Either<AccountAlreadyExists, { account: Account }>;

@Injectable()
export class RegisterAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({ name, email, password }: Input): Promise<Output> {
    const accountWithSameEmail = await this.accountsRepository.findByEmail(email);

    if (accountWithSameEmail) return left(new AccountAlreadyExists(email));

    const passwordHash = await this.hashGenerator.generate(password);

    const account = Account.create({
      name,
      email,
      password: passwordHash,
      twoFactorSecret: null,
      twoFactorEnabled: false,
      updatedAt: null,
    });

    await this.accountsRepository.create(account);

    return right({ account });
  }
}
