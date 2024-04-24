/* eslint-disable no-console */
import { Either, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';

interface Input {
  recipientId: string;
  name?: string | null;
  email: string;
  subject: string;
  message: string;
}

type Output = Either<null, null>;

@Injectable()
export class SendMailNotificationUseCase {
  constructor() {}

  async execute({ recipientId, email, message, subject, name }: Input): Promise<Output> {
    // send mail logic here
    console.log(`
      Account: ${name} (${recipientId})
      Sending mail to ${email}:
      Subject: ${subject}
      Message: ${message}
    `);
    return right(null);
  }
}
