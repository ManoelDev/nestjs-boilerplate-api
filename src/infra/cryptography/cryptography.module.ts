import { Encrypter } from '@/app/account/cryptography/encrypter';
import { HashCompare } from '@/app/account/cryptography/hash-compare';
import { HashGenerator } from '@/app/account/cryptography/hash-generator';
import { OTPCompare } from '@/app/account/cryptography/otp-compare';
import { OTPGenerator } from '@/app/account/cryptography/otp-generator';
import { OTPUri } from '@/app/account/cryptography/otp-get-uri';
import { Module } from '@nestjs/common';

import { BcryptHash } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';
import { OTPEncrypter } from './otp-encrypter';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashCompare, useClass: BcryptHash },
    { provide: HashGenerator, useClass: BcryptHash },

    { provide: OTPCompare, useClass: OTPEncrypter },
    { provide: OTPGenerator, useClass: OTPEncrypter },
    { provide: OTPUri, useClass: OTPEncrypter },
  ],
  exports: [Encrypter, HashCompare, HashGenerator, OTPCompare, OTPGenerator, OTPUri],
})
export class CryptographyModule {}
