import { AccountCreatedEvent } from '@/app/account/events/account-created-event';
import { DomainEvents } from '@/shared/events/domain-events';
import { EventHandler } from '@/shared/events/event-handler';
import { Injectable } from '@nestjs/common';

import { SendMailNotificationUseCase } from '../use-cases/send-mail-notification.use-case';

@Injectable()
export class OnAccountUpdate implements EventHandler {
  constructor(private sendMailNotificationUseCase: SendMailNotificationUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.SendMailNotification.bind(this), AccountCreatedEvent.name);
  }

  private async SendMailNotification({ account }: AccountCreatedEvent) {
    await this.sendMailNotificationUseCase.execute({
      recipientId: account.id.toString(),
      name: account.name,
      email: account.email,
      subject: 'Account updated',
      message: `Hi ${account.name}, your account was updated successfully!`,
    });
  }
}
