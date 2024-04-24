import { Either, left, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';

import { Encrypter } from '../cryptography/encrypter';
import { HashCompare } from '../cryptography/hash-compare';
import { OTPCompare } from '../cryptography/otp-compare';
import { AccountsRepository } from '../repositories/accounts.repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface Input {
  email: string;
  password: string;
  otpCode?: string;
}

type Output = Either<WrongCredentialsError, { access_token: string }>;

@Injectable()
export class AuthenticateAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
    private otpCompare: OTPCompare,
  ) {}

  async execute({ email, password, otpCode }: Input): Promise<Output> {
    const account = await this.accountsRepository.findByEmail(email);
    if (!account) return left(new WrongCredentialsError());

    const passwordMatch = await this.hashCompare.compare(password, account.password);
    if (!passwordMatch) return left(new WrongCredentialsError());
    if (account.twoFactorEnabled && !otpCode) return left(new WrongCredentialsError());

    if (account.twoFactorEnabled) {
      if (account.twoFactorEnabled && !otpCode) return left(new WrongCredentialsError());
      const otpValid = this.otpCompare.compare(account.twoFactorSecret!, otpCode!);
      if (!otpValid) throw new WrongCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({ sub: account.id });

    return right({ access_token: accessToken });
  }
}
