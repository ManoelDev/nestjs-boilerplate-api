import { OTPGenerator } from '@/app/account/cryptography/otp-generator';
import { OTPUri } from '@/app/account/cryptography/otp-get-uri';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { Body, Controller, Post, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { z } from 'zod';

import { CurrentUser } from '../current-user.decorator';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UserPayload } from '../jwt.strategy';
import { passwordSchema } from './create-account.controller';

enum Step {
  setup = 'setup',
  enable = 'enable',
  disable = 'disable',
}

const firstStepSchema = z.object({ step: z.literal(Step.setup), password: passwordSchema });
const secondStepSchema = z.object({ step: z.literal(Step.enable), code: z.string().min(6).max(6) });
const thirdStepSchema = z.object({ step: z.literal(Step.disable), code: z.string().min(6).max(6) });

const schemaConditions = z.discriminatedUnion('step', [firstStepSchema, secondStepSchema, thirdStepSchema]);
export const OTPSetupBodySchema = z.intersection(schemaConditions, z.object({ step: z.nativeEnum(Step) }));

type twoFactorBodySchema = z.infer<typeof OTPSetupBodySchema>;

@Controller('/account/two-factor')
@UseGuards(JwtAuthGuard)
export class TwoFactorController {
  constructor(
    private prisma: PrismaService,
    private otpGenerator: OTPGenerator,
    private otpUri: OTPUri,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(OTPSetupBodySchema))
  async handle(@Body() body: twoFactorBodySchema, @CurrentUser() user: UserPayload) {
    const account = await this.prisma.user.findUnique({ where: { id: user.sub } });
    if (!account) throw new UnauthorizedException('Invalid credentials.');

    if (body.step === Step.setup) {
      if (body.password) {
        const passwordMatch = await compare(body.password, account.password);
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials.');
      }

      const secret = this.otpGenerator.generate();
      const uri = this.otpUri.getUri(account.email, 'APP NAME', secret);
      await this.prisma.user.update({ where: { id: account.id }, data: { twoFactorSecret: secret } });
      return { uri };
    }

    if (body.step === Step.enable) {
      await this.prisma.user.update({ where: { id: account.id }, data: { twoFactorEnabled: true } });
      return { message: 'Two-factor authentication enabled.' };
    }

    if (body.step === Step.disable) {
      await this.prisma.user.update({ where: { id: account.id }, data: { twoFactorEnabled: false } });
      return { message: 'Two-factor authentication disabled.' };
    }

    return {};
  }
}
