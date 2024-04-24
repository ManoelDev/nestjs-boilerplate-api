import { Either, left, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';

import { OTPGenerator } from '../cryptography/otp-generator';
import { OTPUri } from '../cryptography/otp-get-uri';
import { AccountsRepository } from '../repositories/accounts.repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface Input {
  accountId: string;
  password: string;
  otpCode: string;
}

type Output = Either<WrongCredentialsError, { otp: string }>;

@Injectable()
export class TwoFactorAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private otpUri: OTPUri,
    private optGEnerate: OTPGenerator,
  ) {}

  async execute({ accountId }: Input): Promise<Output> {
    const account = await this.accountsRepository.findById(accountId);
    if (!account) return left(new WrongCredentialsError());

    const secret = this.optGEnerate.generate();
    const uri = this.otpUri.getUri(account.email, 'APP-NAME', secret);

    account.twoFactorSecret = secret;
    await this.accountsRepository.save(account);

    return right({ otp: uri });
  }
}
