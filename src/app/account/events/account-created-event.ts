import { DomainEvent } from '@/shared/events/domain-event';
import { Injectable } from '@nestjs/common';

import { Account } from '../entities/account';

@Injectable()
export class AccountCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public account: Account;

  constructor(account: Account) {
    this.account = account;
    this.ocurredAt = new Date();
  }

  getAggregateId() {
    return this.account.id.toString();
  }
}
