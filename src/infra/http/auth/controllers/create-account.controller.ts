import { AccountAlreadyExists } from '@/app/account/use-cases/errors/account-already-existis';
import { RegisterAccountUseCase } from '@/app/account/use-cases/register-account.use-case';
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

export const passwordSchema = z
  .string()
  .min(8, 'The password must be at least 8 characters long.')
  .and(z.string().regex(/[A-Z]/, 'The password should contain at least 1 uppercase character.'))
  .and(z.string().regex(/[a-z]/, 'The password must contain at least one lowercase letter.'))
  .and(z.string().regex(/\d/, 'The password must contain at least one numeric digit.'))
  .and(z.string().regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'The password must contain at least one special character.'));

const createAccountSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
  })
  .strict();

type CreateAccountSchema = z.infer<typeof createAccountSchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerAccount: RegisterAccountUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccountSchema) {
    const { email, password } = body;

    const result = await this.registerAccount.execute({ name: '', email, password });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case AccountAlreadyExists:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
