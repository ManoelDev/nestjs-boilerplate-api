import { Either, left, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';

import { OTPCompare } from '../cryptography/otp-compare';
import { AccountsRepository } from '../repositories/accounts.repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface Input {
  accountId: string;
  otpCode: string;
}

type Output = Either<WrongCredentialsError, { enable: boolean }>;

@Injectable()
export class TwoFactorAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private otpCompare: OTPCompare,
  ) {}

  async execute({ accountId, otpCode }: Input): Promise<Output> {
    const account = await this.accountsRepository.findById(accountId);
    if (!account) return left(new WrongCredentialsError());

    const isValid = this.otpCompare.compare(account.twoFactorSecret!, otpCode);
    if (!isValid) return left(new WrongCredentialsError());

    account.twoFactorEnabled = true;

    return right({ enable: false });
  }
}
