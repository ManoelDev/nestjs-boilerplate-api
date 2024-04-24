import { AuthenticateAccountUseCase } from '@/app/account/use-cases/authenticate-account.use-case';
import { RegisterAccountUseCase } from '@/app/account/use-cases/register-account.use-case';
import { Module } from '@nestjs/common';

import { CryptographyModule } from '../cryptography/cryptography.module';
import { DataBaseModule } from '../database/database.module';
import { AuthenticationController } from './auth/controllers/authenticate.controller';
import { CreateAccountController } from './auth/controllers/create-account.controller';

@Module({
  imports: [DataBaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticationController],
  providers: [AuthenticateAccountUseCase, RegisterAccountUseCase],
})
export class HttpModule {}
