import { AuthenticateAccountUseCase } from '@/app/account/use-cases/authenticate-account.use-case';
import { WrongCredentialsError } from '@/app/account/use-cases/errors/wrong-credentials-error';
import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { passwordSchema } from './create-account.controller';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  otpCode: z.string().optional(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticationController {
  constructor(private authenticationAccount: AuthenticateAccountUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema): Promise<{ access_token: string }> {
    const { email, password, otpCode } = body;

    const result = await this.authenticationAccount.execute({ email, password, otpCode });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { access_token } = result.value;
    return { access_token };
  }
}
