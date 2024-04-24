import { AccountCreatedEvent } from '@/app/account/events/account-created-event';
import { AccountsRepository } from '@/app/account/repositories/accounts.repository';
import { DomainEvents } from '@/shared/events/domain-events';
import { EventHandler } from '@/shared/events/event-handler';
import { Injectable } from '@nestjs/common';

import { SendMailNotificationUseCase } from '../use-cases/send-mail-notification.use-case';

@Injectable()
export class OnAccountCreated implements EventHandler {
  constructor(
    private accountsRepository: AccountsRepository,
    private sendMailNotification: SendMailNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.SendMailNotification.bind(this), AccountCreatedEvent.name);
  }

  private async SendMailNotification({ account }: AccountCreatedEvent) {
    await this.sendMailNotification.execute({
      recipientId: account.id.toString(),
      name: account.name,
      email: account.email,
      subject: 'Account created',
      message: `Hi ${account.name}, your account was created successfully!`,
    });
  }
}
