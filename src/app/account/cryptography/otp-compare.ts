export abstract class OTPCompare {
  abstract compare(plain: string, secret: string): boolean;
}
