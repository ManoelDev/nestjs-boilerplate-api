/* eslint-disable no-console */
import { Either, right } from '@/shared/either';
import { Injectable } from '@nestjs/common';

interface Input {
  recipientId: string;
  content: string;
}

type Output = Either<null, null>;

@Injectable()
export class SendSMSNotificationUseCase {
  constructor() {}

  async execute({ recipientId, content }: Input): Promise<Output> {
    // send sms logic here
    console.log(`SMS sent to ${recipientId}: ${content}`);
    return right(null);
  }
}
