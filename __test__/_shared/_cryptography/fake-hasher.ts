import { HashCompare } from '@/app/account/cryptography/hash-compare';
import { HashGenerator } from '@/app/account/cryptography/hash-generator';

export class FakeHasher implements HashGenerator, HashCompare {
  async generate(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
