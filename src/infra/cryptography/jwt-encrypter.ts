import { Encrypter } from '@/app/account/cryptography/encrypter';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}
  encrypt(value: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(value);
  }
}
