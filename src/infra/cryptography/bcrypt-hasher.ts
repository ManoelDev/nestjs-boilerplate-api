import { HashCompare } from '@/app/account/cryptography/hash-compare';
import { HashGenerator } from '@/app/account/cryptography/hash-generator';
import { compare, hash } from 'bcryptjs';

export class BcryptHash implements HashGenerator, HashCompare {
  private SALT = 8;
  generate(plain: string): Promise<string> {
    return hash(plain, this.SALT);
  }
  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
