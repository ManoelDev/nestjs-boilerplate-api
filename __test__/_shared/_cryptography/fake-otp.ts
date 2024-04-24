import { OTPCompare } from '@/app/account/cryptography/otp-compare';
import { OTPGenerator } from '@/app/account/cryptography/otp-generator';
import { OTPUri } from '@/app/account/cryptography/otp-get-uri';

export class FakeOTP implements OTPCompare, OTPGenerator, OTPUri {
  compare(plain: string, secret: string): boolean {
    return plain === secret;
  }
  generate(): string {
    return '123456';
  }
  getUri(recipient: string, appName: string, secret: string): string {
    return `otpauth://totp/${appName}:${recipient}?secret=${secret}&issuer=${appName}`;
  }
}
