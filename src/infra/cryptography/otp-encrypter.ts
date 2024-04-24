import { OTPCompare } from '@/app/account/cryptography/otp-compare';
import { OTPGenerator } from '@/app/account/cryptography/otp-generator';
import { OTPUri } from '@/app/account/cryptography/otp-get-uri';
import { authenticator } from 'otplib';

export class OTPEncrypter implements OTPCompare, OTPGenerator, OTPUri {
  private otp = authenticator;

  compare(plain: string, hash: string) {
    return this.otp.check(hash, plain);
  }

  generate() {
    this.otp.options = { window: 1 };
    return this.otp.generateSecret();
  }

  getUri(account: string, appName: string, secret: string) {
    return this.otp.keyuri(account, appName, secret);
  }
}
